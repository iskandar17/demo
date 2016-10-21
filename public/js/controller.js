function issueListCtrl ($scope, reqFn) {
	$scope.list_scope = '';
    $scope.col_count = [
    	{title:'ID', field: 'id'},
    	{title:'Название', field: 'name', ngSref: 'view({id: item.id})',},
    	{title:'ID проекта', field: 'project_id', ngClass: 'text-center'},
    	{title:'Статус', field: 'obj_status', ngClass: 'text-center'},
    	{title:'Теги', field: 'tags', ngClass: 'text-center',filter: " | arrayParse", htmlTrust: true},
    	{title:'Закончен', field: 'is_completed', ngClass: 'text-center', filter: " | myfilter"},
    	{title:'В архиве', field: 'is_archived', ngClass: 'text-center', filter: " | myfilter"},
    	{title:'Прогресс', field: 'physical_progress', ngClass: 'text-center'},
    	{title:'Создан', field: 'creation_date', filter: ' | date:"HH:mm dd.MM.yyyy"', ngClass: 'text-center'},
    	{title:'Начало', field: 'start_date', filter: ' | date:"HH:mm dd.MM.yyyy"', ngClass: 'text-center'},
    	{title:'Срок', field: 'due_date', filter: ' | date:"HH:mm dd.MM.yyyy"', ngClass: 'text-center'},
    	{title:' ', field: '<a class="array-tags" ui-sref="edit({id: item.id})">Редактировать</a>', button: true}
    ];
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
			list: 'list_scope'
		};	
		reqFn.request(params.request).then(function(response){
			for(i=0; i< response.data.length; i++){
				if(response.data[i].id == $stateParams.id){
					$scope.editScope =	response.data[i]	;
				}				
			}
		});
	}
	$scope.saveElem = function(a){
		params = {
			url:'api/put',
			method: 'put',
			data: a
		};
		reqFn.request(params).then(function(response){
			console.log(response);
		});
	}
}
angular
    .module('test')
    .controller('issueListCtrl', issueListCtrl)
    .controller('editorCtrl', editorCtrl);