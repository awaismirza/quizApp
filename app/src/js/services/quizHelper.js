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