(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Data',
      state: 'articles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Explore Data',
      state: 'articles.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Create Data',
      state: 'articles.create',
      roles: ['user']
    });
  }
}());
