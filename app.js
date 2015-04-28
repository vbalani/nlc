var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid','appmod1','ngRoute']);
 
app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {


          $scope.highlightFilteredHeader = 
              function( row, rowRenderIndex, col, colRenderIndex ) {
            if( col.filters[0].term ){
              return 'header-filtered';
            } else {
              return '';
            }
          };


            $scope.gridOptions = setOptions($scope, uiGridConstants);
            // end of grid options setup 

          $http.get('fedex.json')
            .success(function(data) {
              $scope.gridOptions.data = data;
            //  $scope.gridOptions.data[0].age = -5;
            /*
              data.forEach( function addDates( row, index ){
                row.mixedDate = new Date();
                row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
                row.gender = row.gender==='male' ? '1' : '2';
              }); */
            });

          $scope.toggleFiltering = function(){
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
          };

        } // end controller defn
                            
                         
] // end controllers second argument (array)
); //end controller definition

app.config(function ($routeProvider) {
 
        // routes in the main app.js
    	$routeProvider
    		.when('/VENDOR',
    			{ redirectTo: '/' }
    		)
    		.otherwise({ redirectTo: '/' });

    });       