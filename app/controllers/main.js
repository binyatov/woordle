angular
    .module('woordle')
    .controller('Main', function ($scope, $location) {
        $scope.model = {};
        $scope.start = function () {
            if (!$scope.model.username) { return; }
            $location.path('/start/' + $scope.model.username);
        };
    });