angular.module('todolist.sections.registration.controller', [])
  .controller('registrationController', function(registrationService, $scope, $location) {
    $scope.save = function() {
      return registrationService.newUser($scope.user)
        .success(function(response) {
          $location.path('/user');
        })
        .error(function(response) {
          console.log(response);
          const length = response.length;
          const errors = [length]
          for (let i = 0; i < length; i++) {
            let err = response[i];
            let msg;
            for (let key in err) {
              if (key === 'msg') {
                msg = err[key];
                errors[i] = msg;
              }
            }

          }
          $scope.errors = errors;
        });
    };
  });
