function reqFn($http){
    return {
    	request: function (rData){
           return $http
               [rData.method](rData.url, rData.data).then(
             function (response){
                 return response;
             },function (rejection){
                   return rejection;
               }
           );
        }
    }
}
function authHeaderSet($rootScope, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            config.headers.Auth = 'someHash';
            return config;
        },
        responseError: function(rejection) {
            return $q.reject(rejection);
        }
    }
}
angular
    .module('test')
    .factory('reqFn', reqFn)
    .factory('authHeaderSet',authHeaderSet);