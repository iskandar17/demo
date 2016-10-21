function myfilter($sce){
	return function(a){
		if(a){
			a = 'Да'
		}else{
			a = 'Нет';
		}
		return $sce.trustAsHtml(a);
	}
}
function arrayParse($sce){
	return function(a){
		str = '';
		if(a){
			b = a.sort();
			for(i=0; i<b.length; i++){
			str+='<span class="array-tags">'+b[i]+'</span>'	
			}
		}else{
			str = '<span></span>';
		}
		return $sce.trustAsHtml(str);
	}
}
angular
	.module('test')
	.filter('arrayParse', arrayParse)
	.filter('myfilter', myfilter);