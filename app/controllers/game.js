angular
    .module('woordle')
    .controller('Game', function ($scope, $location) {
        $scope.model = {};
        $scope.model.words = [];
        $scope.model.temp = [];
        $scope.model.time = 40;
        $scope.model.score = 0;
        Parse.initialize("tVjrmGMQinaozGHcbfedVMDIUvJVoRCKKeuWtS16", "QcepLGcJ7R9LnsWnO5RDNk7FOg9VXHh0MuOFiYEm");
        var query = new Parse.Query('wordsObject');
        query.limit(10);
        query.find({
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.model.words.push(data[i].attributes.word);
                }
                $scope.pick();
            },
            error: function(error) {
                console.log(error);
            }
        });
        $scope.pick = function () {
            var random = Math.floor(Math.random() * $scope.model.words.length),
                word = $scope.model.words[random].split('');
            $scope.model.word = $scope.model.words[random];
            if ($scope.model.words.length > -1) {$scope.model.words.splice(random, 1)};
            $scope.model.puzzle = $scope.shuffle(word);
            $scope.$apply();
            console.log($scope.model.puzzle, $scope.model.word);
        };
        $scope.shuffle = function (word) {
            if (word.length == 0) { return $scope.model.temp.join(''); }
            var random = Math.floor(Math.random() * word.length);
            $scope.model.temp.push(word[random]);
            word.splice(random, 1);
            return $scope.shuffle(word);
        }
        $scope.start = function () {
            console.log($scope.model);
            $location.path('/start/' + $scope.model.username);
        };
    });