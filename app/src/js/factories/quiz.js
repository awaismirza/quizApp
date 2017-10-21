angular.module('quizApp').factory('Quiz', function () {

    var Quiz = function () {
        var self = this;
        this.deep_copy_whitelist = [
            'quizName', 'author', 'questions', 'choices'
        ];

        this.author = '';
        this.quizName = '';
        this.question = '';
        this.choices = '';

        this.makeQuiz = function (quiz) {
            self.author = quiz.author;
            self.quizName = quiz.quizName;
            self.question = quiz.question;
            self.choices = quiz.choices;
        }


        // this.createQuestions = function(question, choices){
        //     for(let i = 0; i < question.length; i++){
        //         let question {
        //
        //         }
        //     }
        // }
    };
    return Quiz;
});
