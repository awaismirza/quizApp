'use strict';

// Declare app level module which depends on views, and components
var quizApp = angular.module('quizApp',[]);

quizApp.constant('AppInformation', {
    App_Version: '1.0',
});
// Adding a Main Controller
quizApp.controller('quizController', ['$scope', function($scope){
    // This is the Main Controller
    $scope.test = "Hello";
    $scope.what = "yeah";
}]);