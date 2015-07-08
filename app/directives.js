var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid','appmod1','ngRoute','ui.grid.pagination','ui.bootstrap']);


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
