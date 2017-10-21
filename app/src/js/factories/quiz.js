angular.module('quizApp').factory('Quiz', function () {

    var Quiz = function () {
        var self = this;
        this.deep_copy_whitelist = [
            'quizName', 'author', 'questionLength', 'choicesLength'
        ];

        this.author = '';
        this.quizName = '';
        this.questionLength = '';
        this.choicesLength = 4;
        this.questions = [];
        this.showQuizForm = true;
        this.showQuestionForm = false;

    };
    return Quiz;
});
