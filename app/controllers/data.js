angular
    .module('woordle')
    .controller('User', function ($scope, $location, $routeParams) {
        $scope.model = {};
        var query = new Parse.Query('users');
        query.get($routeParams.id, {
            success: function (data) {
                $scope.model.words = data.attributes.result;
                $scope.model.user = data.attributes.name;
                $scope.$apply();
            },
            error: function (error) {
                console.log(error);
            }
        });
        $scope.start = function () {
            if (!$scope.model.user) { return; }
            $location.path('/start/' + $scope.model.user);
        };
    });