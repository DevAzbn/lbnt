var jsURLHistory = function() {
	'use strict';
	
	var ctrl = this;
	var h = window.history;
	
	ctrl.go2 = function(url, param){
		try {
			h.pushState(param, null, url);
			return;
		} catch(e) {
			
		}
		location.hash = '#' + url;
	};
	
	ctrl.back = function(){
		h.back();
	};
	
};