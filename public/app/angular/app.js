                
var HRApp = angular.module('HRApp', [
                                  'Admin.controllers',
                                  'Members.controllers', 
                                  'Appreciations.controllers',
                                  'ngRoute', 
                                  'ngCookies'
                                ]);
 
 HRApp.config(['$routeProvider','$httpProvider','$locationProvider',
                    function($routeProvider,$httpProvider,$locationProvider)
                    {   
                        // $httpProvider.responseInterceptors.push('httpInterceptor');
                        $httpProvider.interceptors.push('httpInterceptor');
                        $routeProvider.when('/', 
                                        {
                                            redirectTo: '/admin/login'
                                            // templateUrl: 'views/home.html' 
                                        })
                                        .when('/admin/logout/', 
                                        { 
                                            templateUrl: 'views/blank.html',
                                            controller: 'AdminLogoutController'
                                            
                                        }).when('/admin/login/', 
                                        {
                                            templateUrl: 'views/admin/login.html',
                                            controller: 'AdminLoginController'
                                        })
                                        .when('/appreciation/list/', 
                                        {
                                            templateUrl: 'views/appreciations/list.html',
                                            controller: 'AppreciationsListController'
                                        })
                                        .when('/appreciation/delete/:user_id/:id', 
                                        {
                                            templateUrl: 'views/blank.html',
                                            controller: 'AppreciationDeleteController'
                                        }).when('/member/view/:memberid', 
                                        {
                                            templateUrl: 'views/member/view.html',
                                            controller: 'MemberViewController'
                                        })
                                        .when('/member/add/', 
                                        {
                                            templateUrl: 'views/member/add.html',
                                            controller: 'MembersAddController'
                                        })
                                        .when('/appreciation/add/', 
                                        {
                                            templateUrl: 'views/appreciations/add.html',
                                            controller: 'AppreciationWithIdAddController'
                                        }) 
                                        .when('/appreciation/add/:appreciated_to', 
                                        {
                                            templateUrl: 'views/appreciations/add.html',
                                            controller: 'AppreciationWithIdAddController'
                                        })
                                        .otherwise({redirectTo: '/admin/login'});

                        // $locationProvider.html5Mode(true);
                    }
                ]);
				

HRApp.run(function (api) {
  api.init();
}); 