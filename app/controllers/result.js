angular
    .module('woordle')
    .controller('Result', function ($scope, $location, $routeParams) {
        $scope.model = {};
        $scope.model.users = [];
        Parse.initialize('tVjrmGMQinaozGHcbfedVMDIUvJVoRCKKeuWtS16', 'QcepLGcJ7R9LnsWnO5RDNk7FOg9VXHh0MuOFiYEm');
        var query = new Parse.Query('users');
        query.get($routeParams.user, {
            success: function (data) {
                $scope.model.user = data.attributes.name;
                $scope.model.score = data.attributes.score;
                var newQuery = new Parse.Query('users');
                newQuery.limit(10);
                newQuery.descending('score');
                newQuery.find({
                    success: function(data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.model.users.push({
                                name: data[i].attributes.name,
                                score: data[i].attributes.score
                            });
                        }
                        $scope.$apply();
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
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