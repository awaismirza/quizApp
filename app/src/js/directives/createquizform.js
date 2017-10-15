angular.module('quizApp').directive('createQuiz', function () {
   return {
       restrict: 'E',
       templateUrl: 'app/src/templates/directives/createQuizForm.html',
       controller: function ($scope, Quiz) {
           $scope.potentialQuiz = new Quiz();
           $scope.createQuiz = function () {
               console.log($scope.potentialQuiz);
           }
       }
   }
});