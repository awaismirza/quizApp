// Declare app level module which depends on views, and components
var quizApp = angular.module('quizApp', ['ui.bootstrap',
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

quizApp.constant('appInformation', {
    appName: "Quiz App",
    version: "1.0.0"
});


quizApp.constant('appMode', {
    STARTAPP: '0',
    CREATEQUIZ: '1',
    SUCCESSQUIZ: '2',
    RESULTQUIZ: '3',
    TAKEQUIZ: '4'
});
