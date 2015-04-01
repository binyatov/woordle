angular
    .module('woordle', [])
    .config(function ($routeProvider) {
        //configuration of the routes
        $routeProvider
            // Main view
            .when('/', {
                templateUrl: 'main.html',
                controller: 'Main'
            })
});