angular
    .module('woordle', ['ngRoute'])
    .config(function ($routeProvider) {
        //configuration of the routes
        $routeProvider
            // Main view
            .when('/', {
                templateUrl: 'app/views/main.html'
            })
            .when('/start/:user', {
                templateUrl: 'app/views/puzzle.html',
                controller: 'Game'
            })
            .when('/result/:user', {
                templateUrl: 'app/views/result.html',
                controller: 'Result'
            })
    });