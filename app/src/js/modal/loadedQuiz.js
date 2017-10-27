angular.module('quizApp').directive('loadedQuiz', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/src/templates/Modal/loadedQuiz.html'
    }
});