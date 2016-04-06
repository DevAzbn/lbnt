var jsCacher = function(param_obj) {
	'use strict';
	
	var ctrl = this;
	
	if(typeof param_obj == 'undefined' || param_obj == null) {
		param_obj = {
			filter : 'filter',
			ttl : 60000,
		};
	}
	
	/* ----- параметры для работы ----- */
	var param = {
		ls : {
			cacher		:		'__jscacher_' + param_obj.filter,
		},
	};
	
	
	/* ----- движок работы с локальным хранилищем ----- */
	ctrl.ls = new jsLocalStorage();
	
	
	ctrl.cache = function(content) {
		var o = {
			created_at : new Date().getTime(),
			content : content,
		};
		ctrl.ls.obj2s(param.ls.cacher, o);
	};
	
	
	ctrl.load = function() {
		var o = ctrl.ls.s2obj(param.ls.cacher);
		
		if(o != null) {
			if(((o.created_at + param_obj.ttl) < new Date().getTime() - 1000) || (!o.created_at)) {
				o.need_update = true;
			} else {
				o.need_update = false;
			}
			return o;
		} else {
			o = {
				need_update : true,
			}
			return o;
		}
	};
	
	
	ctrl.clear = function() {
		ctrl.ls.obj2s(param.ls.cacher, {});
	};
	
	
};