angular
    .module('woordle', ['ngRoute'])
    .config(function ($routeProvider) {
        //configuration of the routes
        $routeProvider
            // Main view
            .when('/', {
                templateUrl: 'app/views/main.html'
            })
    });