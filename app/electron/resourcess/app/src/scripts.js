// Declare app level module which depends on views, and components
var quizApp = angular.module('quizApp', [
    'ngRoute',
    'ngAnimate'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

quizApp.constant('appInformation', {
    appName: "Quiz App",
    version: "1.0.0"
});


quizApp.constant('appMode', {
    STARTAPP: '0',
    CREATEQUIZ: '1',
    ADDQUESTION: '2',
    SUCCESSQUIZ: '3',
    RESULTQUIZ: '4',
    TAKEQUIZ: '5'
});

quizApp.constant('takeQuizMode', {
    SELECTQUIZ: '6',
    TAKEQUESTION: '7',
    SHOWRESULTS: '8'
});




angular.module('quizApp').directive('addQuestionButton', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/Button/addQuestionButton.html'
    }
});

angular.module('quizApp').directive('questionForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/forms/questionForm.html'
    }
});
angular.module('quizApp').directive('openQuiz', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/forms/openQuiz.html'
    }
});
angular.module('quizApp').directive('createQuizForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/forms/createQuizForm.html'
    }
});
angular.module('quizApp').directive('takeQuizContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/Modal/takeQuizContainer.html'
    }
});
angular.module('quizApp').directive('quizSuccessContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/Modal/quizSuccessContainer.html'
    }
});
angular.module('quizApp').directive('quizContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/Modal/quizContainer.html'
    }
});
angular.module('quizApp').service('quizHelper', ['Question', 'Quiz', function (Quiz,
                                                                               Question) {
    var self = this;

    this.quiz = {};
    var questionArray = [];
    var count = 0;

    var addQuiz = function (quiz) {
        self.quiz = quiz;
    };

    var sendQuestion = function (question) {
        self.question = question;
        if (count <= self.quiz.questionLength) {
            pushQuestionToArray(self.question);
            count++;
        } else {
            console.log(questionArray);
            alert("Question Limit Exceeded");
        }
    };

    var checkValidQuestion = function (question) {
        let validQuestion = false;
        _.forIn(question, function (value, key) {
            if (value !== "") {
                validQuestion = true;
            } else {
                return validQuestion = false;
            }
        });
        _.forIn(question.choices, function (value, key) {
            if (value !== "") {
                validQuestion = true;
            } else {
                return validQuestion = false;
            }
        });
        return validQuestion;
    };

    var pushQuestionToArray = function (question) {
        questionArray.push(question);
    };

    var addQuestionToQuiz = function (quiz) {
        questionArray.forEach(function (choice) {
           let choices = choice;
           console.log(choices);
           quiz.questions.push(choices);
        });
    };

    var jsonToParse = function () {
        return questionArray;
    };

    var saveQuizToJSON = function (quiz) {
        var data = JSON.stringify(quiz);
        var blob = new Blob([data], {type: "text/json;charset=utf-8"});
        saveAs(blob, 'quiz.json');
    };

    var loadQuiz = function (quiz) {
        quizAppScope.quiz = new Quiz();
        quizAppScope.quiz = JSON.parse(quiz);
        if (quizAppScope.quiz.quizName !== "") {
            quizAppScope.quizLoaded = true;
        }

    };


    this.addQuiz = addQuiz;
    this.sendQuestion = sendQuestion;
    this.checkValidQuestion = checkValidQuestion;
    this.pushQuestionToArray = pushQuestionToArray;
    this.jsonToParse = jsonToParse;
    this.addQuestionToQuiz = addQuestionToQuiz;
    this.saveQuizToJSON = saveQuizToJSON;
    this.loadQuiz = loadQuiz;

}]);
angular.module('quizApp').factory('Quiz', function () {

    var Quiz = function () {
        var self = this;
        this.deep_copy_whitelist = [
            'quizName', 'author', 'questionLength', 'choicesLength', 'questions'
        ];

        this.author = '';
        this.quizName = '';
        this.questionLength = '';
        this.questions = [];
        this.choicesLength = 4;


    };
    return Quiz;
});

angular.module('quizApp').factory('Question', function () {

    var Question = function () {
        var self = this;
        this.question = "";
        this.choices = {
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: ""
        };
        this.answer = "";
    };
    return Question;
});

angular.module('quizApp').controller('quizController', ['$scope', 'Quiz', 'Question', 'quizHelper', 'appMode', 'appInformation', '$timeout', 'takeQuizMode', '$window', '$q', '$animate', function (
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
    $location,
    $animate
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
    $scope.countQuestion = 1;
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
        console.log($scope.quiz);
    };

    $scope.openQuizToTake = function () {
        $('#open-file').click().change(function (data) {
            var reader = new FileReader();
            reader.onload = function () {
                quizHelper.loadQuiz(reader.result);
                console.log($scope.quiz);
                if ($scope.quiz.quizName !== "") {
                    $scope.quizLoaded = true;
                    $scope.$digest();
                    console.log($scope.quiz);
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

