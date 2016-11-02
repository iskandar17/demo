function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('authHeaderSet');
    $urlRouterProvider.otherwise("/index");
    $stateProvider
    	.state('list', {
            url: "/index",
            templateUrl: "views/list/list.html",
            controller: 'issueListCtrl',
            auth: true
        })
        .state('edit', {
            url: "/edit/:id",
            parent: 'list',
            views: {
                '@': {
                    templateUrl: "views/list/list_edit.html",
                    controller: 'editorCtrl'
                }
            },
            auth: true,
        })
        .state('view', {
            url: "/view/:id",
            parent: 'list',
            views: {
                '@': {
                    templateUrl: "views/list/list_view.html",
                    controller: 'editorCtrl'
                }
            },
            auth: true
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login/login.html",
            controller: 'loginCtrl'
        });
}
angular
    .module('test')
    .config(config)
    .run(function($rootScope,$state, $stateParams, $location) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            var allow = $rootScope.allowRight;
            if(allow){
                allow = $rootScope.allowRight.valid;
            }
            if(toState.auth && !allow){
                $rootScope.returnToState = $location.url();
                $location.path('/login');
            };
        });
    });