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
