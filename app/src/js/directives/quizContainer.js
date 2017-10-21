angular.module('quizApp').directive('quizContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/directives/quizcontainer.html',
        controller: function ($scope) {
            $scope.showQuizForm = true;
            $scope.showQuestionForm = false;
        }
    }
});