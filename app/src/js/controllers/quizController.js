angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', 'appMode', 'appInformation', '$timeout', 'takeQuizMode', '$window', '$q', function (
    $scope,
    Quiz,
    Question,
    quizHelper,
    appMode,
    appInformation,
    takeQuizMode,
    $timeout,
    $window,
    $q,
    $location
) {
    window.quizAppScope = $scope;


    $scope.appMode = appMode;
    $scope.takeQuizMode = takeQuizMode;

    $scope.appInformation = appInformation;

    $scope.quizMode = appMode.STARTAPP;
    $scope.quizLoaded = false;
    $scope.startQuiz = false;


    $scope.quiz = new Quiz();
    $scope.question = new Question();
    $scope.potentialQuestion = null;
    $scope.count = 0;
    $scope.countQuestion = 0;
    $scope.questionLimitExceeded = false;

    $scope.validQuestion = true;

    $scope.currentQuestion = null;
    $scope.correctAnswers = [];
    $scope.questionAnswered = false;


    $scope.clearField = function () {
      $scope.quiz = new Quiz();
        $scope.question = new Question();
    };

    $scope.changeAppMode = function (mode) {
        $scope.quiz = new Quiz();
        $scope.question = new Question();
        $scope.quizMode = mode;
        $scope.quizLoaded = false;
    };

    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
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
        if ($scope.countQuestion < $scope.quiz.questionLength) {
            $scope.countQuestion++;
            $scope.question = new Question();
        } else {
            $scope.questionLimitExceeded = true;
            quizHelper.addQuestionToQuiz($scope.quiz);
            $scope.changeAppMode(appMode.SUCCESSQUIZ);
        }
    };

    $scope.buildQuiz = function () {
        quizHelper.saveQuizToJSON($scope.quiz);
    };


    $scope.printQuestion = function () {
        $scope.potentialQuestion = quizHelper.jsonToParse();
    };

    $scope.openQuizToTake = function () {
        $('#open-file').click().change(function (data) {
            var reader = new FileReader();
            reader.onload = function () {
                quizHelper.loadQuiz(reader.result);
                if ($scope.quiz.quizName !== "") {
                    $scope.quizLoaded = true;
                    $scope.$digest();
                }
            };
            reader.readAsText(data.target.files[0], "text/json;charset=utf-8");
        });

    };


    $scope.letStartQuiz = function () {
        $scope.startQuiz = true;
        if ($scope.startQuiz) {
            $scope.potentialQuestion = $scope.quiz.questions;
        }
    };

    $scope.checkAnswer = function (answer) {
        var correctAnswer = $scope.potentialQuestion[$scope.count].answer;
        if (answer == correctAnswer) {
            $scope.potentialQuestion[$scope.count].result = true;
            $scope.potentialQuestion[$scope.count].selectedAnswer = answer;
        } else {
            $scope.potentialQuestion[$scope.count].result = false;
            $scope.potentialQuestion[$scope.count].selectedAnswer = answer;
        }
        $scope.questionAnswered = true;
    };



    $scope.nextQuestion = function () {
        if ($scope.count < $scope.potentialQuestion.length - 1) {
            $scope.count++;
            $scope.questionAnswered = false;
        } else {
            $scope.questionLimitExceeded = true;
        }
    };

    $scope.restartApp = function () {
        $window.location.reload();
    };
}]);