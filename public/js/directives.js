function tableDyn ($compile, $document){
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: "=",
            col: "=",
            count: "=",
            param:"="
        },
        template: '<div><table  class="table">' +
        '<thead><tr><th ng-class="prop.ngClass" ng-repeat="prop in col">{{prop.title}}</th></tr></thead>'+
        '<tbody></tbody>'+
        '</table><div>',
        link: function (scope, elem){
          	elem.find('tbody').append('<tr  tbody-col ng-repeat="item in data | limitTo: count.singleSelect.id | orderBy:\'id\'" reqFn="reqFn" item="item" col="col"></tr>');
            $compile(elem.contents())(scope);
        }
    }
}
function tbodyCol($compile){
    return {
        restrict: "A",
        scope: {
            col: "=",
            item: "="
        },
        link: function (scope, element){
            str = filterVal = '';
            for(i=0; i<scope.col.length; i++){
            	/*geting filter*/
                   if(scope.col[i].filter){
                        filterVal =scope.col[i].filter;
                    }
                /*geting class*/
                    if(scope.col[i].ngClass){
                        ngClass = scope.col[i].ngClass;
                    }else{
                        ngClass = '';
                    }
                /*check has href*/
                    if(scope.col[i].ngSref){
                    	/*use filter to return html*/
                        if(scope.col[i].htmlTrust){
                        str += '<td class="'+ngClass+'"><a ng-bind-html="item.' + scope.col[i].field + filterVal +'" ui-sref="'+scope.col[i].ngSref+'" class="'+ngClass+'"></td>';
                        }else{
                        	/*binding without changes*/
                        str += '<td class="'+ngClass+'"><a ui-sref="'+scope.col[i].ngSref+'" class="'+ngClass+'">{{item.' + scope.col[i].field + filterVal +'}}</a></td>';
                        }
                    }else{
                        if(scope.col[i].button){
                            str += '<td class="'+ngClass+'">'+scope.col[i].field+'</td>';
                        }else{
                            if(scope.col[i].htmlTrust){
                                str += '<td class="'+ngClass+'" ng-bind-html="item.' + scope.col[i].field + filterVal +'"></td>';
                            }else{
                                str += '<td class="'+ngClass+'">{{item.' + scope.col[i].field + filterVal +'}}</td>';
                            }
                        }
                    }
            };
            element.append(str);
            $compile(element.contents())(scope)
        }
    }
}
function mobileFocusAction ($document){
    return {
        restrict: 'A',
        link: function (scope, elem){
            elem.on('input', function  () {
                if(angular.element(this).val() !== ''){
                    angular.element(this).parent().find('label').addClass('has-dirty');
                    if(angular.element(this).hasClass('ng-invalid-email')){
                        angular.element(this).parent().find('label').addClass('error');
                        $document.find('button').attr('disabled', true);
                    }else{
                        angular.element(this).parent().find('label').removeClass('error');
                        $document.find('button').removeAttr('disabled');
                    }
                }else{
                    angular.element(this).parent().find('label').removeClass('has-dirty'); 
                    angular.element(this).parent().find('label').removeClass('error');
                    $document.find('button').removeAttr('disabled');
                }
            });
        }
    }
}
angular
    .module('test')
    .directive('tableDyn', tableDyn)
    .directive('tbodyCol', tbodyCol)
    .directive('mobileFocusAction',mobileFocusAction);