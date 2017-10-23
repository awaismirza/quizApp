angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', 'appMode', function (
    $scope,
    Quiz,
    Question,
    quizHelper,
    appMode
) {
    window.quizAppScope = $scope;
    $scope.appMode = appMode;
    $scope.quizMode = appMode.STARTAPP;

    $scope.quiz = new Quiz();
    $scope.question = new Question();
    $scope.potentialQuestion = null;
    $scope.count = 1;
    $scope.questionLimitExceeded = false;
    $scope.validQuestion = true;

    $scope.changeAppMode = function (mode) {
        $scope.quizMode = mode;
    };

    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
        console.log($scope.quiz);
        $scope.quiz.showQuestionForm = true;
        $scope.quiz.showQuizForm = false;
    };

    $scope.addQuestion = function () {
        if ($scope.question.answer === 0) {
            $scope.validQuestion = false;
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
            $scope.quizMode = appMode.SUCCESSQUIZ;
        }
    };

    $scope.buildQuiz = function () {
        quizHelper.addQuestionToQuiz($scope.quiz);
        quizHelper.saveQuizToJSON($scope.quiz);
    };

    $scope.printQuestion = function () {
        $scope.potentialQuestion = quizHelper.jsonToParse();
        console.log($scope.quiz);
    }

}]);