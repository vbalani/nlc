var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid','appmod1','ngRoute','ui.grid.pagination','ui.bootstrap']);
 
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
    
    $http.get('http://52.1.144.162:1337/vbalani/nl_deptxwalk/%7B%22vendor_name%22%20:%20%22SIGHTLIFE%22%7D')
        .success(function(data) {
          $scope.gridOptions.data = data;
            $scope.gridOptions.tName = 'Vendor File';
        });

        } // end controller anonymous function arg defn
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

app.directive('ngContextMenu', function ($parse) {
    var renderContextMenu = function ($scope, event, options) {
        if (!$) { var $ = angular.element; }
        $(event.currentTarget).addClass('context');
        var $contextMenu = $('<div>');
        $contextMenu.addClass('dropdown clearfix');
        var $ul = $('<ul>');
        $ul.addClass('dropdown-menu');
        $ul.attr({ 'role': 'menu' });
        $ul.css({
            display: 'block',
            position: 'absolute',
            left: event.pageX + 'px',
            top: event.pageY + 'px'
        }); 
        angular.forEach(options, function (item, i) {
            var $li = $('<li>');
            if (item === null) {
                $li.addClass('divider');
            } else {
                $a = $('<a>');
                $a.attr({ tabindex: '-1', href: '#' });
                $a.text(item[0]);
                $li.append($a);
                $li.on('click', function () {
                    $scope.$apply(function() {
                        item[1].call($scope, $scope);
                    });
                });
            }
            $ul.append($li);
        });
        $contextMenu.append($ul);
        $contextMenu.css({
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999
        });
        $(document).find('body').append($contextMenu);
        
        $contextMenu.on("click", function (e) {
            $(event.currentTarget).removeClass('context');
            $contextMenu.remove();
        }).on('contextmenu', function (event) {
            $(event.currentTarget).removeClass('context');
            event.preventDefault();
            $contextMenu.remove();
        });
    };
    
    return function ($scope, element, attrs) {
        
        // event handler for right click (contextmenu)
        element.on('contextmenu', function (event) {
            $scope.$apply(function () {
                
        // so if the underlying element is hyperlink it wont trigger
                event.preventDefault();
                 
                // down the road obtain the menu structure (array) from function (service)
                // call to metalayer object
                var options = [
                                ['Filter on: ' + event.currentTarget.innerText, function ($itemScope) {

                                }],
                                null,
                                ['Purchase Orrs', function ($itemScope) {

                                }],
                                null,
                                ['Vouchers', function ($itemScope) {

                                }],
                                null,
                                ['Items', function ($itemScope) {

                                }]
                                ];
                
     
                if (options instanceof Array) {
                    renderContextMenu($scope, event, options);
                } else {
                    throw '"' + attrs.ngContextMenu + '" not an array';
                }
            });
        });
    };
});

app.controller('TypeaheadCtrl',['$scope','$http',  function($scope, $http) {

  $scope.selected = undefined;
    
    $scope.submitSearch = function() {
        if (typeof $scope.searchPhrase === 'object') {
            alert('Typeahead selected: '+ JSON.stringify($scope.searchPhrase));
        } else {
            alert("search phrase:  " + $scope.searchPhrase);
        }
    };
  
    $scope.onSelect = function() {
        $scope.target = $scope.searchPhrase.target;
        $scope.keyvalue = $scope.searchPhrase.keyvalue;
        $scope.searchPhrase = $scope.searchPhrase.keydescr + " in " + $scope.searchPhrase.target;
        
    }
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getTypeAheads = function(val) {
    return $http.get('http://52.1.144.162:1337/esauto/VBALAni/nldev/nl_autocomplete/' + val).then(function(response){
return response.data;     
// return response.data.map(function(item){
      //  return item.VENDORNAME ;
     // });
        
    });
  };

} 
]
                                );

app.controller('DropdownCtrl', ['$scope','$log',function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!',
      '4th',
      'fifth',
      'of course it\'s sixth'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
}]);
