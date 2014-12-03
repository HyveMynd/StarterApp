/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */

var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {
            templateUrl: 'partials/home',
            controller: 'LoginCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/register',
            controller: 'RegistrationCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {

    // Check for authentication failed and reroute to login
    $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
        if (eventObj.auth === false){
            $location.path('/login');
        } else if (eventObj.auth === true){
            $location.path('/'); //todo change to desired route
        }
    })
}]);