var site_url = "http://madframework-webmadhuranga.c9.io";
var AdminLoginServices = angular.module('AdminUsers.services', ['ngResource']);

AdminLoginServices.factory('AdminUser', function ($resource) {
    return $resource(site_url+'/authorized_users/login/', {}, {
        login: { method: 'POST' }
    })
});

var MembersServices = angular.module('Members.services', ['ngResource']);
MembersServices.factory('Members', function ($resource) {
    return $resource(site_url+'/members/', {}, {
        query: { method: 'GET', isArray: true }
    })
}).factory('Member', function ($resource) {
    return $resource(site_url+'/members/:memberid', {}, {
        get: { method: 'GET' ,params: {memberid: '@memberid'}}
    })
}).factory('api', function ($http, $cookies ) {
    return {
        init: function (token,member_id,member_code) {  
            // set in request header
            $http.defaults.headers.common['X-Access-Token'] = token || $cookies.get('token');
            $http.defaults.headers.common['X-Access-Member_id'] = member_id || $cookies.get('member_id');
            $http.defaults.headers.common['X-Access-Member_code'] = member_code || $cookies.get('member_code');
             
        }
    };
}).factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
    return function (promise) {

        var success = function (response) { 
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $location.path('/admin/login/');
            }
            return $q.reject(response);
        };

        return promise.then(success, error);
    };
});



// get appreciations by memebrid
var AppreciationServices = angular.module('Appreciations.services', ['ngResource']);
AppreciationServices.factory('AppreciationsByUser', function ($resource) { 
    return $resource(site_url+'/appreciations/byuser/:memberid', {}, {
        get_byuser: { method: 'GET' ,params: {memberid: '@memberid'}, isArray:true},
        create: { method: 'POST' }
    })
})

AppreciationServices.factory('Appreciations', function ($resource) { 
    return $resource(site_url+'/appreciations/', {}, {
        get: { method: 'GET', isArray:true},
        create: { method: 'POST' }
    })
})

AppreciationServices.factory('Appreciation', function ($resource) { 
    return $resource(site_url+'/appreciations/:id', {}, {
        get: { method: 'POST' ,params: {id: '@id'}},
        post: { method: 'GET' ,params: {id: '@id'}},
        delete: { method: 'DELETE' ,params: {id: '@id'}}
    })
})
