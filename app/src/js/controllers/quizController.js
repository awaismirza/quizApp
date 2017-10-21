angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', function (
    $scope,
    Quiz,
    Question,
    quizHelper
) {
    window.quizAppScope = $scope;

    $scope.quiz = new Quiz();
    $scope.question = new Question();

    $scope.addQuiz = function () {
        quizHelper.createQuiz($scope.quiz);
        $scope.quiz.showQuestionForm = true;
        $scope.quiz.showQuizForm = false;
    };

    $scope.addQuestion = function () {
        quizHelper.addQuestion($scope.question);
    }
}]);