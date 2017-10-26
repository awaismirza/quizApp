angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', 'appMode', 'appInformation', function (
    $scope,
    Quiz,
    Question,
    quizHelper,
    appMode,
    appInformation
) {
    window.quizAppScope = $scope;


    $scope.appMode = appMode;
    $scope.appInformation = appInformation;

    $scope.quizMode = appMode.STARTAPP;


    $scope.quiz = new Quiz();
    $scope.question = new Question();
    $scope.potentialQuestion = null;
    $scope.count = 1;
    $scope.questionLimitExceeded = false;

    $scope.validQuestion = true;
    $scope.showQuizForm = true;
    $scope.showQuestionForm = false;

    $scope.changeAppMode = function (mode) {
        $scope.quizMode = mode;
    };

    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
        console.log($scope.quiz);
        $scope.showQuestionForm = true;
        $scope.showQuizForm = false;
    };


    $scope.addQuestion = function () {
        $scope.validQuestion = quizHelper.checkValidQuestion($scope.question);
        if (!$scope.validQuestion) {
            return $("#questionpopover").popover();
        }
        if ($scope.question.answer === 0) {
            $scope.validQuestion = false;
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