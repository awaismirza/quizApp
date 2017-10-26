angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', 'appMode', 'appInformation', '$timeout' , function (
    $scope,
    Quiz,
    Question,
    quizHelper,
    appMode,
    appInformation,
    $timeout
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

    $scope.clearField = function () {
      $scope.quiz = new Quiz();
        $scope.question = new Question();
    };

    $scope.changeAppMode = function (mode) {
        $scope.quizMode = mode;
    };

    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
        console.log($scope.quiz);
        if(appMode.CREATEQUIZ){
           $scope.changeAppMode(appMode.ADDQUESTION);
        }
    };

    $scope.addQuestion = function () {
        $scope.validQuestion = quizHelper.checkValidQuestion($scope.question);
        $('#selectionError').text("");
        if (!$scope.validQuestion) {
            return ;
        }
        if ($scope.question.answer === 0) {
            $scope.validQuestion = false;
            $('#selectionError').text("Select Correct Answer");
            return;
        }

        quizHelper.sendQuestion($scope.question);
        if ($scope.count < $scope.quiz.questionLength && $scope.question.answer !== 0) {
            $scope.count++;
            $scope.question = new Question();
        } else {
            $scope.questionLimitExceeded = true;
            quizHelper.addQuestionToQuiz($scope.quiz);
            $scope.changeAppMode(appMode.SUCCESSQUIZ);
        }
    };

    $scope.buildQuiz = function () {
        // quizHelper.addQuestionToQuiz($scope.quiz);
        quizHelper.saveQuizToJSON($scope.quiz);
    };

    $scope.printQuestion = function () {
        $scope.potentialQuestion = quizHelper.jsonToParse();
        console.log($scope.quiz);
    }

}]);