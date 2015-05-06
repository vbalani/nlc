var app = angular.module('appmod1', ['ngAnimate', 'ngTouch', 'ui.grid','ui.grid.pagination']);
 
function setOptions($scope,uiGridConstants) {
    
    function hyperlinkCellTemplate() {
        return '<div class="ui-grid-cell"><a href="/index4-filters1.html"> {{ grid.getCellValue(row,col) }}</a></div>' ;
    };
    function contextMenuCellTemplate() {
        return '<DIV ng-context-menu="menuOptions" class="nlccontextfield">{{ COL_FIELD }}</DIV>' ;
    };
    function dropDownMenuCellTemplate() { 
        return '<div class = "ddcellmenu"><div class="dropdown"> <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ COL_FIELD }} <span class="caret"></span> </button><ul role="menu" class="dropdown-menu " aria-labelledby="dlabel"> <li role="presentation"><a href="#" role="menuitem">{{ COL_FIELD}}</a></li><li role="presentation"><a href="#" role="menuitem">Cell</a></li><li role="presentation"><a href="#" role="menuitem">Science</a></li></ul></li></div></div>'
    };
    
    
    
  gridOptions = {
      data: [],
    enableFiltering: true,
    showGridFooter: true,
      enablePaginationControls: true,
     paginationPageSizes: [50, 100, 500, 1000],
   paginationPageSize: 50,
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
    },
     
      columnDefs: [   // columndefs have the field names hardcoded if i have to play with setting etc. have to find a agnostic way
      { field: 'VENDOR',
        cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
       /*   if (grid.getCellValue(row,col) === 'FEDEX') {
            return 'blue';
          } */
        }
      },
          {field: 'Department', 
           cellTemplate: contextMenuCellTemplate(),
           filter: {
           condition: uiGridConstants.filter.CONTAINS
          }
    },
          {field: 'GL Account',
           cellTemplate: contextMenuCellTemplate()
          },
          {field: 'DESCR',
          filter: {
           condition: uiGridConstants.filter.CONTAINS
          }} 
    ]  // end column defs defn
      
    };// end of grid options setup 
   return gridOptions; 
};

