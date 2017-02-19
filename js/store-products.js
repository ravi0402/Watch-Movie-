(function() {
    var app = angular.module('store-products',[]);


// Custom element directive
    app.directive("productTitle", function() {
  return {
    restrict: 'E',
    templateUrl: "product-title.html" };
    });
})();
    