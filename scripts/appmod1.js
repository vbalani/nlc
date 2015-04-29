var app = angular.module('appmod1', ['ngAnimate', 'ngTouch', 'ui.grid']);
 
function setOptions($scope,uiGridConstants) {
    
    function hyperlinkCellTemplate() {
        return '<div class="ui-grid-cell"><a href="/index4-filters1.html"> {{ grid.getCellValue(row,col) }}</a></div>' ;
    };
    function contextMenuCellTemplate() {
        return '<DIV ng-context-menu="menuOptions" class="context">{{ COL_FIELD }}</DIV>' ;
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
           cellTemplate: contextMenuCellTemplate(),
           filter: {
           condition: uiGridConstants.filter.CONTAINS
          }
    },
          {field: 'GL Account'},
          {field: 'DESCR',
          filter: {
           condition: uiGridConstants.filter.CONTAINS
          }} 
    ]  // end column defs defn
      
    };// end of grid options setup 
   return gridOptions; 
};

