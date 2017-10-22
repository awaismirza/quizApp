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
        questionArray.push(JSON.stringify(question));
    };

    var addQuestionToQuiz = function (quiz, questions) {
        let q = quiz;
        q.question = questions;
        console.log(q);
        return q;
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