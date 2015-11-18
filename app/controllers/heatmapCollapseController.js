(function() {
    
    var heatmapCollapseController = function ($scope, $http) {
        
         $scope.isCollapsed = false;
        

    }; // end controller function defn
    
    heatmapCollapseController.$inject = ['$scope', '$http'];

    angular.module('app')
      .controller('heatmapCollapseController', heatmapCollapseController);
    
}()); // end anon function