angular.module('quizApp').factory('Quiz', function () {

    var Quiz = function () {
        var self = this;
        this.deep_copy_whitelist = [
            'quizName', 'author', 'questionLength', 'choicesLength', 'questions'
        ];

        this.author = '';
        this.quizName = '';
        this.questionLength = 0;
        this.questions = [];
        this.choicesLength = 4;


    };
    return Quiz;
});
