var LS = {
	set:function(id,value) {localStorage.setItem(id,value);},
	get:function(id) {return localStorage.getItem(id);},
	remove:function(id) {localStorage.removeItem(id);},
	clear:function() {localStorage.clear();},
	obj2s:function(id,obj2save) {this.set(id,JSON.stringify(obj2save));},
	s2obj:function(id) {return JSON.parse(this.get(id));}
};

var SS = {
	set:function(id,value) {sessionStorage.setItem(id,value);},
	get:function(id) {return sessionStorage.getItem(id);},
	remove:function(id) {sessionStorage.removeItem(id);},
	clear:function() {sessionStorage.clear();},
	obj2s:function(id,obj2save) {this.set(id,JSON.stringify(obj2save));},
	s2obj:function(id) {return JSON.parse(this.get(id));}
};