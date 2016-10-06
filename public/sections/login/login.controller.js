angular.module('todolist.sections.login.controller', [])
  .controller('loginController', function($scope, $location, loginService) {
    $scope.passmein = function() {
      return loginService.isauthorized($scope.user)
        .success(function(response) {
          $location.path('/user');
        })
        .error(function(response) {
          const length = response.length;
          const errors = [length];
          for (var i = 0; i < length; i++) {
            let err = response[i];
            let msg;
            for (let key in err) {
              if (key == 'msg') {
                msg = err[key];
                errors[i] = msg;
              }
            }
          }
          $scope.errors = errors;
        });
    };
  });