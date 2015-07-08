(function() {
    
    var heatmapController = function ($scope, $http) {
        
        $scope.selected = undefined;
    


    }; // end controller function defn
    
    heatmapController.$inject = ['$scope', '$http'];

    angular.module('app')
      .controller('heatmapController', heatmapController);
    
}()); // end anon function