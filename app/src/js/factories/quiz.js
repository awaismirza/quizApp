angular.module('quizApp').factory('Quiz', function () {

    var Quiz = function(title,author,quizname,question, choices){
        var self = this;
        this.deep_copy_whitelist = [
            'title','quizName','author','questions','choices'
        ];
        this.title = title;
        this.author = author;
        this.quizName = quizname;
        this.question = question;
        this.choices = choices;
    };
    return Quiz;
});
