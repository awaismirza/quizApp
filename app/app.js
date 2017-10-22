// Declare app level module which depends on views, and components
var quizApp = angular.module('quizApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

quizApp.constant('appMode', {
    STARTAPP: '0',
    CREATEQUIZ: '1',
    SUCCESSQUIZ: '2',
    TAKEQUIZ: '3'
});