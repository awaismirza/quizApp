// Declare app level module which depends on views, and components
var quizApp = angular.module('quizApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

quizApp.constant('quizMode', {
  TAKEQUIZ: '0',
  CREATEQUIZ: '1'
});