angular.module('quizApp').directive('createQuizForm', function () {
    return {
        restrict: 'E',
        scope: '=',
        templateUrl: 'app/src/templates/directives/createQuizForm.html',
        controller: function ($scope, Quiz) {
            $scope.quiz = new Quiz();
            $scope.createQuiz = function () {
                console.log($scope.quiz);
                $scope.showQuestionForm = true;
                $scope.showQuizForm = false;
            };

            $scope.createQuestions = function () {

            }

        }
    }
});