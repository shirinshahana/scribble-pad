angular.module('todolist.sections.tasks.controller', [])
  .controller('taskController', function(taskService, $location, listall, $mdDialog, $scope) {
    if (listall.status === 401) {
      $location.path('/');
    }
    $scope.list = listall.data;
    $scope.onclick = false;

    $scope.expand = function(event) {
      $scope.onclick = true;
      event.stopPropagation();
    };

    window.onclick = function() {
        if ($scope.onclick === true) {
          $scope.onclick = false;
          $scope.$apply();
        }
      }
    //Add new task 
    $scope.updatelist = function() {
      return taskService.updatelist($scope.user)
        .success(function(response) {
          $scope.list = response;
          $scope.user.task = null;
          $scope.user.taskTitle = null;
        })
        .error(function(response) {
          alert(response);
        });
    };

    $scope.delete = function($index) {
      return taskService.deletetask($scope.list[$index])
        .success(function(response) {
          $scope.list = response;
        })
        .error(function(response) {
          alert(response);
        });
    };

    $scope.edit = function($event, tasks) {
      const indexOftasks = $scope.list.indexOf(tasks);
      const data = angular.copy($scope.list[indexOftasks]);
      $mdDialog.show({
          locals: { name: data, index: indexOftasks },
          controller: ['$scope', 'name', 'index', function($scope, name, index) {
            $scope.user = name;
            $scope.user.index = index;

            $scope.todo = function() {
              return taskService.editlist($scope.user)
                .success(function(response) {
                  $mdDialog.hide(response);
                })
                .error(function(response) {
                  $mdDialog.hide(response);
                });
            };
          }],
          templateUrl: 'sections/tasks/popup.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          preserveScope: true,
          clickOutsideToClose: true,
        })
        .then(function(answer) {
          $scope.list = answer;
        }, function() {

        });
    };

    $scope.logout = function() {
      return taskService.logout()
        .success(function(response) {
          $location.path('/');
        })
        .error(function(response) {
          alert(response);
        });
    };

    $scope.onDropComplete = function(index, obj, evt) {
      //index = refers to the index to which object is dragged
      //obj = referes to the dragged object
      //OtherObj = stores data that was in the index to which we dragged a object
      const otherObj = $scope.list[index];
      const otherIndex = $scope.list.indexOf(obj);
      $scope.list[index] = obj;
      $scope.list[otherIndex] = otherObj;
      return taskService.reorder($scope.list)
        .success(function(response) {})
        .error(function(response) {
          alert(response);
        });
    };
  });
