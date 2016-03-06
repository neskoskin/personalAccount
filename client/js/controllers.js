personalApp.controller('TransactionController', function($rootScope, $scope, $location, transactionFactory, balanceFactory) {
  GetTransactions();
  GetBalance();
  $scope.saveTransaction = function(credentials) {
    credentials.date = new Date();
    var json = angular.toJson(credentials);
    return transactionFactory.saveTransaction(json)
    .then(function() {
      var balanceElem = {};
      var type = credentials.type;

      balanceElem._id = $scope.balance[0]._id;
      if (type === 'income') {
        balanceElem.denars = $scope.balance[0].denars + credentials.amount;
        balanceElem.euros = $scope.balance[0].euros;
      }else if(type === 'spend'){
        balanceElem.denars = $scope.balance[0].denars - credentials.amount;
        balanceElem.euros = $scope.balance[0].euros;
      }else if (type === 'toEuros') {
        balanceElem.denars = $scope.balance[0].denars - credentials.amount;
        balanceElem.euros = $scope.balance[0].euros + (credentials.amount / 61.5);
      }

      var jsonBalance = angular.toJson(balanceElem);
      balanceFactory.updateBalance(jsonBalance)
      .then(function() {

         GetTransactions();
         GetBalance();
      })
      .catch(function() {
        console.log('Something went wrong');
      });

    })
    .catch(function(response) {
      console.log('Something went wrong', response.data);
    });

  };
 $scope.deleteTransaction = function(i) {
   transactionFactory.deleteTransaction($scope.transactions[i]._id).then(function() {
       $location.path('/');
       GetTransactions();
   });
 };


function GetTransactions() {
  transactionFactory.getTransactions()
    .then(function(response) {
      $scope.transactions = response.data;
    })
    .catch(function(response) {
      console.log('Something went wrong', response.data);
    });
}
function GetBalance() {
  balanceFactory.getBalance()
    .then(function(response) {
      $scope.balance = response.data;
    })
    .catch(function(response) {
      console.log('Something went wrong', response.data);
    });
}
});
