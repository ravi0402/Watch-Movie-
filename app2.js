
    var app = angular.module('store', ['store-products']);//main app ng-app
    



    app.controller('StoreController',[ '$http', function($http){
        
        var store = this;
        
        store.products = [ ];
        
        $(document).ready(function() {
            
            $( "input" ).keyup(function() {
                    var value = $( this ).val();
                 
            
            var dope = "naruto"
            
            $('button').click(function() {
                
                    $http.get("http://api.themoviedb.org/3/search/movie?api_key=2f6ab7c6dc3db52d34703aae308640ef&query=" + value ).success(function(data){

                        store.products = data;

                    });
        
            });
            }) .keyup();
            });
                          
    }]);
   
    
