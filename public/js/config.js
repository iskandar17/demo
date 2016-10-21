function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
    	.state('list', {
            url: "/index",
            templateUrl: "views/list.html",
            controller: 'issueListCtrl'
        })
        .state('edit', {
            url: "/edit/:id",
            parent: 'list',
            views: {
                '@': {
                    templateUrl: "views/list_edit.html",
                    controller: 'editorCtrl'
                }
            },
        })
        .state('view', {
            url: "/view/:id",
            parent: 'list',
            views: {
                '@': {
                    templateUrl: "views/list_view.html",
                    controller: 'editorCtrl'
                }
            },
        });
}
angular
    .module('test')
    .config(config);