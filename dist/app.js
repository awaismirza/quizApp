var quizApp = angular.module('quizApp', ['ui.router']);

quizApp.constant('AppInformation', {
    App_Version: '1.0'
});
// Adding a Main Controller
quizApp.controller('quizController', ['$scope', function($scope){
    // This is the Main Controller
    $scope.test = "Hello";
    $scope.what = "yeah";
}]);
