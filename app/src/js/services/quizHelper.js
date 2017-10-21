angular.module('quizApp').service('quizHelper', ['Question', 'Quiz', function () {
    var self = this;

    var quiz = {};
    var question = {};
    var questionArray = [];
    var count = 0;

    var addQuiz = function (quiz) {
        self.quiz = quiz;
    };

    var sendQuestion = function (question) {
        self.question = question;
        if (count < self.quiz.questionLength) {
            pushQuestionToArray(self.question);
            count++;
        } else {
            console.log(questionArray);
            alert("Question Limit Exceeded");
        }
    };

    var checkValidQuestion = function (question) {
        _.forIn(question, function (value, key) {
            if (value !== "") {
                console.log(value);
                return true;
            } else {
                console.log(value);
                return false;
            }
        });
    };

    var pushQuestionToArray = function (question) {
        questionArray.push(JSON.stringify(question));
    };

    var jsonToParse = function () {
        return questionArray;
    };

    this.addQuiz = addQuiz;
    this.sendQuestion = sendQuestion;
    this.checkValidQuestion = checkValidQuestion;
    this.pushQuestionToArray = pushQuestionToArray;
    this.jsonToParse = jsonToParse;
    this.count = count;


}]);