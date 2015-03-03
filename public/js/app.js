'use strict';


// Declare app level module which depends on filters, and services
var secintoApp = angular.module('secintoApp', ['ngRoute']);

secintoApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/welcome', {templateUrl: 'partial/welcome'});
    $routeProvider.when('/services', {templateUrl: 'partial/services'});
    $routeProvider.when('/news', {templateUrl: 'partial/news'});
    $routeProvider.when('/legal', {templateUrl: 'partial/legal'});
    $routeProvider.otherwise({redirectTo: '/welcome'});
    $locationProvider.html5Mode(true);
}]);