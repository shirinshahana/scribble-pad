angular.module('todolist.core.router.service', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'sections/login/login.html',
        controller: 'loginController'
      })
      .state('registration', {
        url: '/new',
        templateUrl: 'sections/registration/create.html',
        controller: 'registrationController'
      })
      .state('home', {
        url: '/user',
        templateUrl: 'sections/tasks/mypage.html',
        controller: 'taskController',
        resolve: {
          listall: function(taskService) {
            return taskService.getdata();
          }
        }
      });
  });
