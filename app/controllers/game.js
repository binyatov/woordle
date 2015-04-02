angular
    .module('woordle')
    .controller('Game', function ($scope, $location, $interval, $routeParams) {
        $scope.model = {};
        $scope.model.words = [];
        $scope.model.temp = [];
        $scope.model.time = 40;
        $scope.model.score = 0;
        Parse.initialize('tVjrmGMQinaozGHcbfedVMDIUvJVoRCKKeuWtS16', 'QcepLGcJ7R9LnsWnO5RDNk7FOg9VXHh0MuOFiYEm');
        var query = new Parse.Query('wordsObject');
        query.limit(10);
        query.find({
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.model.words.push(data[i].attributes.word);
                }
                pick();
            },
            error: function(error) {
                console.log(error);
            }
        });
        var pick = function () {
            if ($scope.model.words.length == 0) { 
                result();
                return; 
            }
            var random = Math.floor(Math.random() * $scope.model.words.length),
                word = $scope.model.words[random].split('');
            $scope.model.word = $scope.model.words[random];
            if ($scope.model.words.length > -1) { $scope.model.words.splice(random, 1); }
            $scope.model.puzzle = shuffle(word);
        };
        var shuffle = function (word) {
            if (word.length == 0) { return $scope.model.temp.join(''); }
            var random = Math.floor(Math.random() * word.length);
            $scope.model.temp.push(word[random]);
            word.splice(random, 1);
            return shuffle(word);
        }
        var timer = $interval(function () {
            if ($scope.model.time == 0) {
                result();
                return;
            }
            $scope.model.time--;
        }, 1000);
        var result = function () {
            var parseObj = Parse.Object.extend('users');
            var newScore = new parseObj();
            $interval.cancel(timer);
            timer = undefined;
            newScore.save(
                {
                    name: $routeParams.user, 
                    score: $scope.model.score
                },
                {
                    success: function(data) {
                        $location.path('/result/' + data.id);
                        $scope.$apply();
                    },
                    error: function(error) {
                        console.log(error);
                    }
                }
            );
        };
        var index = 0,
            backs = 0,
            n = 0;
        $scope.change = function () {
            var len = $scope.model.answer.length;
            if (len > index) { index++; } else { backs++; }
            if ($scope.model.answer == $scope.model.word) {
                if (backs > 0 && index >= backs) { n = (index - backs) + 1; }
                else { n = index + 1; }
                index = 0;
                backs = 0;
                $scope.model.score += Math.floor(1.95^(n/3));
                $scope.model.temp = [];
                $scope.model.answer = '';
                pick();
            }
        }
    });