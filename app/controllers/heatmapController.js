(function() {
    
    var heatmapController = function ($scope, $http) {
        
        $scope.selected = undefined;
        
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Parent', 'size', 'color gradient'],
          ['Global',    null,                 0,                               10],
          ['America',   'Global',             1000,                               20],
          ['Europe',    'Global',             700,                               30],
          ['Asia',      'Global',             500,                               40],
          ['Australia', 'Global',             300,                               50],
          ['Africa',    'Global',             200,                               60]
        ]);

        tree = new google.visualization.TreeMap(document.getElementById('heatmapdiv'));

        tree.draw(data, {
          minColor: '#8FBECA',
            midColor: '#ADCFC4',
          maxColor: '#589CB4',
          headerHeight: 0,
          fontColor: 'black',
          showScale: false,
            highlightOnMouseOver: true
        });
        

    }; // end controller function defn
    
    heatmapController.$inject = ['$scope', '$http'];

    angular.module('app')
      .controller('heatmapController', heatmapController);
    
}()); // end anon function