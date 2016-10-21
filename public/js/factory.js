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
angular
    .module('test')
    .factory('reqFn', reqFn)
    ;