console.log('I am admin :).');

(function() {
  'use strict';

  angular.module('app', []).controller('AdminController', AdminController);

  function AdminController($scope, $http) {

    $scope.removeArticle = removeArticle;

    // 初期化
    getAllArticles().then(function(response) {
      if(response && response.data) {
        $scope.articles = response.data.articles;
      } else {
         console.log('Invalid response data. -> ' + response);
      }
    });

    ///////////

    function removeArticle(id) {
      $http({
        method: 'DELETE',
        url: '/api/articles/' + article._id
      }).then(function(response){
        var index = $scope.articles.indexOf(article);
        $scope.articles.splice(index, 1);
      });
    }

    function getAllArticles() {
      return $http({
        url: '/api/articles'
      });
    }
    
  }

})();
