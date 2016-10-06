angular.module('todolist.sections.registration.service', [])
  .factory('registrationService', function($http) {

    function newUser(data) {
      return $http.post('/user/registration', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }
    
    return {
      newUser: newUser
    };

  });
