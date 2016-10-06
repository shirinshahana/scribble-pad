angular.module('todolist.sections.tasks.service', [])
  .factory('taskService', function($http) {
    function isauthorizedUser() {
      return $http.get('/task/isauthorized')
        .then(function(response) {
          return response;
        });
    }

    function getdata() {
      return $http.get('/task')
        .then(function(response) {
          return response;
        }, function(response) {
          return response;
        });
    }

    function updatelist(data) {
      return $http.post('/task/new', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    function deletetask(data) {
      return $http.post('/task/delete', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    function editlist(data) {
      return $http.post('/task/update', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    function logout() {
      return $http.delete('/user')
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    function reorder(data) {
      return $http.post('/task/reorder', data)
        .success(function(response) {
          return response;
        })
        .error(function(response) {
          return response;
        });
    }

    return {
      isauthorizedUser: isauthorizedUser,
      getdata: getdata,
      updatelist: updatelist,
      deletetask: deletetask,
      editlist: editlist,
      reorder: reorder,
      logout: logout
    };
  });
