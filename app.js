
    var app = angular.module('store', ['ngRoute','store-products']);//main app ng-app
    
	app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});
 
 
 

	
	
	app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'StoreController'
            })
			 .when('/search', {
                templateUrl : 'search_angular.html'
               
            })
			.when('/suggestion', {
                templateUrl : 'suggestion.html'
               
            })
			    .when('/SeeMore_One', {
                templateUrl : 'SeeMore_One.html'
               
            })
			.when('/SeeMore_Two', {
                templateUrl : 'SeeMore_Two.html'
              
            })
			.when('/SeeMore_Three', {
                templateUrl : 'SeeMore_Three.html'
                
            })
			.when('/SeeMore_Four', {
                templateUrl : 'SeeMore_Four.html'
                
            })
			.when('/SeeMore_Five', {
                templateUrl : 'SeeMore_Five.html',
               controller  : 'movieDetailsCtl'
            })
			.when('/SeeMore_Six', {
                templateUrl : 'SeeMore_Six.html',
               controller  : 'movieDetailsCtl'
            })
			.when('/large', {
                templateUrl : 'large.html',
              
            })
			

            // route for the about page
            .when('/movieDetail', {
                templateUrl : 'single.html',
                controller  : 'movieDetailsCtl'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            }).
			
			otherwise({
            redirectTo: '/'
          });
			
    });

    app.controller('StoreController', function($scope, $http,  $rootScope,$window){
    
    
    //start of initial results
    var store = $scope;
        
        store.products = [ ];
		store.toprated = [ ];
		store.upcoming = [ ];
		store.nowplaying = [ ];
		store.search_angular =[];
        $http.get('http://api.themoviedb.org/3/discover/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&sort_by=popularity.desc').success(function(data){
            
			
			  store.products = data;
            
        }
		
		// /discover/movie?sort_by=popularity.desc
		
		); //end of initial results
    
	
			
	   $http.get('http://api.themoviedb.org/3/discover/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&certification_country=US&certification=R&sort_by=vote_average.desc').success(function(data1){
           
		   
		     store.toprated = data1;
            
        }
		
		// /discover/movie?sort_by=popularity.desc
		
		); //end of initial results
    
		   
		   
		   
		   
       $http.get('http://api.themoviedb.org/3/discover/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&primary_release_year=2016&sort_by=vote_average.desc').success(function(data2){
        
		  store.upcoming = data2;
            
        }
		
		// /discover/movie?sort_by=popularity.desc
		
		); //end of initial results
    
		
		
		
		
       $http.get('http://api.themoviedb.org/3/discover/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22').success(function(data3){
            		
            store.nowplaying = data3;
            
        }
	//	/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
		// /discover/movie?sort_by=popularity.desc
		
		); //end of initial results
    
    $scope.quantity = 6;
    
    //start of when press enter or click search button 
    $scope.press = function (e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            $scope.search();
        }
    }; //end of press enter to search
    
    
    //start of search results
     $scope.search = function (searchStr) {
		 
		 
		 
		 $scope.showKeywords = false;
        $scope.keywordLength = searchStr.length;
        if (searchStr.length >= 3){
            var url = "https://api.themoviedb.org/3/search/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&search_type=ngram&query="+searchStr+"&sort_by=popularity.desc&&vote_count.gte=10";
            $http.get(url).success(function(data) {
                $scope.searchKeywords = data;
                $scope.showKeywords = true;
				 $scope.showCancel = true;
				 $scope.showNavbar = false;
				    $window.location.href = "#/suggestion";
				 
				console.log($scope.searchKeywords);
				console.log($scope.showKeywords);
				
				
			
            });
        }else{
            $scope.showKeywords = false;
			$scope.showCancel = true;
				 $scope.showNavbar = true;
        }
		 
		 
		 
		
    };//end of search results
	
	
	
	
	
	 $scope.searchMovieWithTitle = function(searchStr){
        
        //var url = "https://api.themoviedb.org/3/search/movie?api_key=313b34abec6dec2f1e578b3e70f5fd18&search_type=phrase&query="+searchStr+"&sort_by=popularity.desc";
        var url = "https://api.themoviedb.org/3/search/multi?api_key=2f6ab7c6dc3db52d34703aae308640ef&query="+searchStr+"&sort_by=popularity.desc";
        $http.get(url).success(
                function(data) {
                	$scope.search_angular = data;
      	            $window.location.href = "#/search";
                $rootScope.comingFromAnotherView = true;
                $scope.showKeywords = false;
                //console.log(response);
           
            });  
    };

	
    
    
	$scope.gotoMovieDetails = function(movieId){
                    console.log("reached here moviedetails");
                    $rootScope.movieId = movieId;
                    console.log($rootScope.movieId);
					
				    $scope.showKeywords = false;
					$scope.showCancel = false;
					$window.location.href = "#/movieDetail";
					
                };
	
	
	
	
		
	
	
	
	
	
    

});


app.controller('movieDetailsCtl', function($scope, $http, $rootScope) {
   
  
 console.log($rootScope.movieId);
    $http.get("https://api.themoviedb.org/3/movie/"+$rootScope.movieId+"?api_key=2f6ab7c6dc3db52d34703aae308640ef").success(function(response) {
        $scope.tmdbData = response;
    });
     $http.get("https://api.themoviedb.org/3/movie/"+$rootScope.movieId+"/images?api_key=2f6ab7c6dc3db52d34703aae308640ef").success(function(response) {
        $scope.tmdbImages = response;
		
		
		/*  var len = $scope.tmdbImages.length;
		  var mid = len/2;
		  
		  $scope.left = $scope.tmdbImages.slice(0,mid);
		   $scope.right = $scope.tmdbImages.slice(mid,length); 
		  */
    });
     $http.get("https://api.themoviedb.org/3/movie/"+$rootScope.movieId+"/credits?api_key=2f6ab7c6dc3db52d34703aae308640ef").success(function(response) {
        $scope.tmdbCredits = response;
    });
	
	 $http.get("https://api.themoviedb.org/3/movie/"+$rootScope.movieId+"/similar?api_key=2f6ab7c6dc3db52d34703aae308640ef").success(function(response) {
        $scope.tmdbSimilar = response;
    });
	
	 $http.get("https://api.themoviedb.org/3/movie/"+$rootScope.movieId+"/videos?api_key=2f6ab7c6dc3db52d34703aae308640ef").success(function(response) {
       
          
	   $scope.tmdbVideos = response.results;
		
		
		
			$scope.videoKey = $scope.tmdbVideos[0];
			$scope.videoKeyShow = $scope.videoKey.key;
			$scope.url = $scope.videoKeyShow;
			console.log($scope.url);
		
		$scope.getIframeSrc = function(src) {
      return 'https://www.youtube.com/embed/' + src;
    };
		
	
	
		
		
    });


	
	
	
	$scope.SaveImage = function(imageID){
                   
                    $scope.tmdbSaveImage = imageID;
                    
					
				console.log(  $scope.tmdbSaveImage);
					
					
                };
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});

app.controller('creditsCtl', function($scope, $http, $rootScope) {
   
  
 console.log($rootScope.movieId);
   
    


});

app.controller('imagesCtl', function($scope, $http, $rootScope) {
   
  
 console.log($rootScope.movieId);
   


});







    
