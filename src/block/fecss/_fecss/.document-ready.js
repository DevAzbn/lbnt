
/*
start .fecss document-ready
*/

$(
	function() {
		var res = 'noname-browser';
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('msie') != -1) res = 'msie';
		if (userAgent.indexOf('trident') != -1) res = 'msie';
		if (userAgent.indexOf('konqueror') != -1) res = 'konqueror';
		if (userAgent.indexOf('firefox') != -1) res = 'firefox';
		if (userAgent.indexOf('safari') != -1) res = 'safari';
		if (userAgent.indexOf('chrome') != -1) res = 'chrome';
		if (userAgent.indexOf('chromium') != -1) res = 'chromium';
		if (userAgent.indexOf('opera') != -1) res = 'opera';
		if (userAgent.indexOf('yabrowser') != -1) res = 'yabrowser';
		
		$('html').eq(0).addClass(res);
	}
);

$(
	function() {
		$(document.body).bind('keydown', function(event){
			event.stopPropagation();
			
			$(document.body).trigger('fecss.keydown', [{
				alt : event.altKey,
				ctrl : event.ctrlKey,
				shift : event.shiftKey,
				meta : event.metaKey,
				key : event.which,
				liter : String.fromCharCode(event.which),
			}]);
		});
	}
);

/*
end .fecss document-ready
*/

/*
$(document.body).on(
	//'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error',
	'dblclick',
	'.autosave',
	function(event){
		
	}
);
*/

/*
var urlL = new jsURLHistory();

setTimeout(function(){
	urlL.go2('/testovy1',{id:1,});
},3000);

setTimeout(function(){
	urlL.go2('/testovy2',{id:2,});
},6000);

setTimeout(function(){
	urlL.go2('/testovy3',{id:3,});
},9000);

setTimeout(function(){
	urlL.back();
},13000);

setTimeout(function(){
	urlL.back();
},16000);

setTimeout(function(){
	urlL.back();
},19000);

// http://xozblog.ru/demo/history-api-demo/pushState/script.js
window.addEventListener('popstate', function(event) {
	alert(JSON.stringify(event.state));
}, false);
*/