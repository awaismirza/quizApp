angular.module('quizApp').service('quizHelper', function ($scope,
                                                          Question) {
    var self = this;
    var quiz = {};
    var questions = [];

    var createQuiz = function (quiz) {
        this.quiz = quiz;
        console.log(this.quiz);
    };

    var addQuestion = function (question) {
        let count = 1;
        if (count < this.quiz.questionLength) {

        } else {
            console.log("type the Proper Question");
        }
    };
    this.addQuestion = addQuestion;
    this.createQuiz = createQuiz;

});
