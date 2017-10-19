angular.module('quizApp').directive('createQuiz', function () {
   return {
       restrict: 'E',
       templateUrl: 'app/src/templates/directives/createQuizForm.html',
       controller: function ($scope, Quiz) {
           $scope.createQuiz = function (valid) {
               $scope.potentialQuiz = new Quiz();
               console.log($scope.potentialQuiz);
           }
       }
   }
});