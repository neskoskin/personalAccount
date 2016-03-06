personalApp.factory('transactionFactory', function($http) {
  var urlBase = '/api/transactions';
  var transactionService = {};

  transactionService.getTransactions = function() {
    return $http.get(urlBase);
  };

  transactionService.saveTransaction = function(transaction) {
    return $http.post(urlBase, transaction);
  };

  transactionService.updateTransaction = function(transaction) {
    return $http.put(urlBase, transaction);
  };

  transactionService.deleteTransaction = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return transactionService;
})
.factory('balanceFactory', function($http) {
  var urlBase = '/api/balance';
  var balanceService = {};

  balanceService.getBalance = function() {
    return $http.get(urlBase);
  };

  balanceService.saveBalance = function(balance) {
    return $http.post(urlBase, balance);
  };

  balanceService.updateBalance = function(balance) {
    return $http.put(urlBase, balance);
  };

  balanceService.deleteBalance = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return balanceService;
});
