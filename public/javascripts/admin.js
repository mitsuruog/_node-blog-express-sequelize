console.log('I am admin :).');

(function() {
  'use strict';

  angular.module('app', []).controller('AdminController', AdminController);

  function AdminController($scope, $http) {
  }

})();
