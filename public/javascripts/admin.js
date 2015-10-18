console.log('I am admin :).');

(function() {
  'use strict';

  angular.module('app', []).controller('AdminController', AdminController);

  function AdminController($scope, $http, $window) {

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
        url: '/api/articles/' + id
      }).then(function(response){
        // 削除が成功した場合は、画面をリフレッシュする
        $window.location.reload();
      });
    }

    function getAllArticles() {
      return $http({
        url: '/api/articles'
      });
    }
    
  }

})();
