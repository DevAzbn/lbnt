var jsViewed = function(param_obj) {
	'use strict';
	
	var ctrl = this;
	
	if(typeof param_obj == 'undefined' || param_obj == null) {
		param_obj = {
			filter : 'filter',
		};
	}
	
	/* ----- параметры для работы корзины ----- */
	var param = {
		ls : {
			viewed		:		'__jsviewed_' + param_obj.filter,
		},
	};
	
	
	/* ----- движок работы с локальным хранилищем ----- */
	ctrl.ls = new jsLocalStorage();
	
	
	/* ----- добавление элементов в список ----- */
	ctrl.add = function(el) {
		var _list = ctrl.ls.s2obj(param.ls.viewed);
		var to_add = true;
		if(_list != null) {
			
		} else {
			_list = [];
		}
		
		if(typeof _list[0] !== 'undefined' && _list[0] != null) {
			var item = _list[0];
			if(typeof item.id !== 'undefined' && item.id != null && typeof el.id !== 'undefined' && el.id != null) {
				
				if(item.id == el.id) {
					to_add = false;
				} else {
					
				}
				
			} else {
				
			}
		}
		
		if(to_add) {
			_list.unshift(el);
			_list = _list.slice(0,25);
		}
		
		ctrl.ls.obj2s(param.ls.viewed, _list);
	};
	
	
	/* ----- получение информации о товаре в корзине ----- */
	ctrl.getAll = function(start, end) {
		var _list = ctrl.ls.s2obj(param.ls.viewed);
		
		if(_list != null) {
			return _list;
		} else {
			return [];
		}
	};
	
	
	
	/* ----- очистка данных, удаляет все из списка ----- */
	ctrl.clear = function() {
		ctrl.ls.obj2s(param.ls.viewed, {});
	};
	
	
	/* ----- сохранение (колбек обработки данных из локального хранилища) ----- */
	ctrl.saveAll = function(cb) {
		cb(ctrl.ls.s2obj(param.ls.viewed));
	};
	
};