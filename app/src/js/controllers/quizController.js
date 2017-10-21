angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', function (
    $scope,
    Quiz,
    Question,
    quizHelper
) {
    window.quizAppScope = $scope;

    $scope.quiz = new Quiz();
    $scope.question = new Question();
    $scope.potentialQuestion = null;
    $scope.count = 1;
    $scope.questionLimitExceeded = false;
    $scope.validQuestion = true;

    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
        console.log($scope.quiz);
        $scope.quiz.showQuestionForm = true;
        $scope.quiz.showQuizForm = false;
    };

    $scope.addQuestion = function () {
        if ($scope.question.answer === 0) {
            alert("Select the Correct Answer");
            return;
        }
        $scope.validQuestion = quizHelper.checkValidQuestion($scope.question);
        if (!$scope.validQuestion) {
            return;
        }

        quizHelper.sendQuestion($scope.question);
        if ($scope.count < $scope.quiz.questionLength && $scope.question.answer !== 0) {
            $scope.count++;
            $scope.question = new Question();
        } else {
            $scope.questionLimitExceeded = true;
        }
    };

    $scope.printQuestion = function () {
        $scope.potentialQuestion = quizHelper.jsonToParse();
        console.log($scope.potentialQuestion);
    }

}]);