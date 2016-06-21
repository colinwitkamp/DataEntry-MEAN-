(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$rootScope', '$state', 'articleResolve', '$window', 'Authentication'];

  function ArticlesController($scope, $rootScope, $state, article, $window, Authentication) {
    var vm = this;

    vm.article = article;
    if ($rootScope.article) {
      vm.article.record = $rootScope.article.record;
      vm.article.ordinate = $rootScope.article.ordinate;
      vm.article.title = $rootScope.article.title;
      vm.article.genus = $rootScope.article.genus;
      vm.article.species = $rootScope.article.species;
      vm.article.animal = $rootScope.article.animal;
      vm.article.name = $rootScope.article.name;
      vm.article.notes = $rootScope.article.notes;
      vm.article.reference = $rootScope.article.reference;
      $rootScope.article = null; // remove it
    }


    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    vm.CopyAndEdit = function() {
      $rootScope.article = vm.article;
      $state.go('articles.create');
    };

    vm.shouldRenderMenu = function() {
      if (!vm.authentication) {
        return false;
      }
      if (vm.authentication.user.roles.indexOf('admin') >= 0) {
        return true;
      } else {
        return false;
      }
    };
  }
}());
