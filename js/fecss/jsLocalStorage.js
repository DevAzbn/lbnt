var jsLocalStorage = function() {
	'use strict';
	
	var ctrl = this;
	
	ctrl.set = function(id,value) {localStorage.setItem(id,value);};
	
	ctrl.get = function(id) {
			var item = localStorage.getItem(id);
			if(typeof item !== 'undefined' && item != null) {
				return localStorage.getItem(id);
			} else {
				return null;
			}
	};
	
	ctrl.remove = function(id) {localStorage.removeItem(id);};
	
	ctrl.clear = function() {localStorage.clear();};
	
	ctrl.obj2s = function(id,obj2save) {this.set(id,JSON.stringify(obj2save));};
	
	ctrl.s2obj = function(id) {
			var item = this.get(id);
			if(typeof item !== 'undefined' && item != null) {
				return JSON.parse(item);
			} else {
				return null;
			}
			
	};
	
};