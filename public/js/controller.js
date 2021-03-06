function MainCtrl ($scope, $state, $rootScope) {
	$scope.showMe = false;
	$scope.$on('user', function (event, data) {
		$scope.user = data.user;
	   	$scope.showMe = data.panel;
	});
	$rootScope.$on('$stateChangeStart', function (event, toState) {
			if(toState.url != '/index' && toState.url != '/login'){
				$scope.showBackBtn = true;
			}else{
				$scope.showBackBtn = false;
			}
	});
	$scope.backState = function  () {
		if($state.current.url != '/index'){
			$state.go('^');
		}
	}
}
function issueListCtrl ($scope, reqFn, $rootScope) {
	$scope.list_scope = '';
    $scope.col_count = [
    	{title:'ID', field: 'id'},
    	{title:'Название', field: 'name', ngSref: 'view({id: item.id})',},
    	//{title:'ID проекта', field: 'project_id', ngClass: 'text-center'},
    	{title:'Статус', field: 'obj_status', ngClass: 'text-center'},
    	{title:'Теги', field: 'tags', ngClass: 'text-center',filter: " | arrayParse", htmlTrust: true},
    	{title:'Закончен', field: 'is_completed', ngClass: 'text-center', filter: " | myfilter"},
    	{title:'В архиве', field: 'is_archived', ngClass: 'text-center', filter: " | myfilter"},
    	{title:'Прогресс', field: 'physical_progress', ngClass: 'text-center'},
    	{title:'Создан', field: 'creation_date', filter: ' | date:"dd.MM.yyyy HH:mm"', ngClass: 'text-center'},
    	{title:'Начало', field: 'start_date', filter: ' | date:"dd.MM.yyyy HH:mm"', ngClass: 'text-center'},
    	{title:'Срок', field: 'due_date', filter: ' | date:"dd.MM.yyyy HH:mm"', ngClass: 'text-center'}
    ];
    if($rootScope.allowRight.hasOwnProperty('admin')){
    	adminAlow = $rootScope.allowRight.admin;
    };
    if(adminAlow){
    	$scope.col_count.push({title:' ', field: '<a class="array-tags" ui-sref="edit({id: item.id})">Редактировать</a>', button: true});
    };
	var getListFn = function (a){
		reqFn.request(a.request).then(function(response){
			$scope[a.list] = response.data;
		});
	};
	params = {
		request: {
			url: 'json/list.json',
			method: 'get'
		},
		list: 'list_scope'
	}
	getListFn(params);
}
function editorCtrl($scope, $rootScope,reqFn, $stateParams){
	if($rootScope.currentElement){
		$scope.editScope = $rootScope.currentElement;
	}else{
		params = {
			request: {
				url: 'json/list.json',
				method: 'get'
			},
			list: 'editScope'
		};	
		reqFn.request(params.request).then(function(response){
			for(i=0; i< response.data.length; i++){
				if(response.data[i].id == $stateParams.id){
					$scope[params.list] =	response.data[i];
				}				
			}
		});
	}
	$scope.saveElem = function(a){
		params = {
			url:'../json/',
			method: 'post',
			data: a
		};
		reqFn.request(params).then(function(response){
			console.log(response);
		});
	}
}
function  loginCtrl($scope, $rootScope, $location) {
	var goTo = '/index';
	if($rootScope.returnToState){
		goTo = $rootScope.returnToState;
	};
	$scope.loginText = {
		login: 'Email:'
	};
	$rootScope.allowRight = {
		valid: false,
		user: "",
		admin: false
	};
	$scope.$emit('user', {
		  user: '',
		  panel: false
		});
	$scope.login = function  (a) {
		if(a == "dev@dev.dev"){
			$rootScope.allowRight.admin = true;
		}
		$rootScope.allowRight.valid=true;
		$rootScope.allowRight.user=a;
		$location.path(goTo);
		$scope.$emit('user', {
		  user: a,
		  panel: true
		});
	};
}
angular
    .module('test')
    .controller('MainCtrl', MainCtrl)
    .controller('issueListCtrl', issueListCtrl)
    .controller('editorCtrl', editorCtrl)
    .controller('loginCtrl',loginCtrl);