/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */

var app = angular.module('app');

app.controller('AppCtrl', ['Session', '$scope', function (Session, $scope) {

    if (Session.user){
        $scope.currentUser = Session.user;
    } else {
        $scope.currentUser = null; //todo change back to null when you want login to work. True if you want it to always be logged in.
    }

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

}]);

app.controller('LoginCtrl',
    ['$scope', 'AuthService', '$location', function ($scope, AuthService, $location) {
        $scope.login = function () {
            AuthService.login($scope.loginUser).then(function (user) {
                $scope.setCurrentUser(user);
                $location.path('/'); //todo change to appropriate redirect page
            })
        };
    }]);

app.controller('RegistrationCtrl',
    ['$scope', 'AuthService', '$location', function ($scope, AuthService, $location) {
        $scope.reset = function () {
            $scope.newUser = {};
            $scope.newUser.email = "";
        };
        $scope.register = function () {
            AuthService.register($scope.newUser).then(function (user) {
                $scope.setCurrentUser(user);
                $location.path('/'); //todo change to appropriate redirect page
            })
        }
    }]);