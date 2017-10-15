

// Declare app level module which depends on views, and components
angular.module('quizApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');

}]);
