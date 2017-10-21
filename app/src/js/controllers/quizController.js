angular.module('quizApp').controller('quizController', ['$scope','Quiz',function (
    $scope,
    Quiz
) {
    window.quizAppScope = $scope;
}]);