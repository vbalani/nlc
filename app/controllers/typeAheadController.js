(function() {
    
    var typeAheadController = function ($scope, $http) {
        
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
        };
        
          // Any function returning a promise object can be used to load values asynchronously
        $scope.getTypeAheads = function(val) {
            return $http.get('http://52.1.144.162:1337/esauto/VBALAni/nldev/nl_autocomplete/' + val).then(function(response){
        return response.data;     
            });
        };

    }; // end controller function defn
    
    typeAheadController.$inject = ['$scope', '$http'];

    angular.module('app')
      .controller('typeAheadController', typeAheadController);
    
}()); // end anon function