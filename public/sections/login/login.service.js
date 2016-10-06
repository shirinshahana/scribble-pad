angular.module('todolist.sections.login.service', [])
  .factory('loginService', function($http) {

    function isauthorized(data) {
      return $http.post('/user/login', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    return {
      isauthorized: isauthorized
    };
  });
