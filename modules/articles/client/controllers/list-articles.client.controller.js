(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService', 'ArticlesSearchService'];

  function ArticlesListController(ArticlesService, ArticlesSearchService) {
    var vm = this;

    vm.aryFields = ['All', 'Record', 'Ordinate', 'Title', 'Name', 'Genus', 'Animal', 'Notes', 'Reference'];
    vm.searchField = 'Record';
    vm.search = '';
    vm.articles = ArticlesService.query();

    vm.searchForArticles = function() {
      vm.articles = ArticlesSearchService.query({
        'field': vm.searchField.toLowerCase(),
        'search': vm.search
      });
    };
  }
}());
