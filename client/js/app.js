personalApp = angular.module('personalApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/transactions.html',
        controller: 'TransactionController'
      })
      .when('/insert', {
        templateUrl: '/partials/insert-transactions.html',
        controller: 'TransactionController'
      })
      .when('/todo', {
        templateUrl: '/partials/todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
