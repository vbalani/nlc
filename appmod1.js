var app = angular.module('appmod1', ['ngAnimate', 'ngTouch', 'ui.grid']);
 
function setOptions($scope,uiGridConstants) {
    
    function cellTemplate() {
        return '<div class="ui-grid-cell"><a href="/index4-filters1.html"> {{ grid.getCellValue(row,col) }}</a></div>' ;
    };
    
  gridOptions = {
      data: [],
    enableFiltering: true,
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
    },
     
      columnDefs: [   // columndefs have the field names hardcoded if i have to play with setting etc. have to find a agnostic way
      { field: 'VENDOR',
        cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
          if (grid.getCellValue(row,col) === 'FEDEX') {
            return 'blue';
          }
        }
      },
          {field: 'Department', 
           cellTemplate: cellTemplate(),
           filter: {
           condition: uiGridConstants.filter.CONTAINS
          }
    },
          {field: 'GL Account'},
          {field: 'DESCR',
          filter: {
           condition: uiGridConstants.filter.CONTAINS
          }} 
    ]  // emd column defs defn
      
     
      
  };// end of grid options setup 
   return gridOptions; 
};