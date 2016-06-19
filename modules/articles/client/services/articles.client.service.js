(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('ArticlesService', ArticlesService);
  angular
    .module('articles.services')
    .factory('ArticlesSearchService', ArticlesSearchService);


  ArticlesService.$inject = ['$resource'];
  ArticlesSearchService.$inject = ['$resource'];

  function ArticlesService($resource) {
    return $resource('api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function ArticlesSearchService($resource) {
    return $resource('api/articles_search');
  }
}());
