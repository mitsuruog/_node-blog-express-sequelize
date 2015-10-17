console.log('I am admin :).');

(function() {
  'use strict';

  angular.module('app', []).controller('AdminController', AdminController);

  function AdminController($scope, $http, $window) {

    $scope.removeArticle = removeArticle;

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

  }

})();
