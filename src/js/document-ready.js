'use strict';

window.onerror = function(error, url, lineNumber, column, errorObj) {
	console.log('Error FECSS: ' + url + ':' + lineNumber + ':' + column + ': ' + JSON.stringify(error) + '\n' + JSON.stringify(errorObj));
	return;
}

[snp tpl="src/_/concat.plugin.js" ]

$(document).ready(function() {
	
	[snp tpl="src/_/concat.body.on.js" ]
	
	[snp tpl="src/_/concat.document-ready.js" ]
	
	$(window).on('resize',function(event){
		[snp tpl="src/_/concat.window-resize.js" ]
	}).trigger('resize');
	
	$(window).on('scroll',function(){
		[snp tpl="src/_/concat.window-scroll.js" ]
	}).trigger('scroll');
	
	$('body').on('changeClass',function(){
		[snp tpl="src/_/concat.body.changeClass.js" ]
	});
	
	[snp tpl="src/_/concat.changeClass.js" ]
	
	window.onbeforeunload = function(event) {
		//alert(event.target.URL);
		$('body').trigger('fecss.window.unload', [event]);
		return;//return false;
	}
	
	$(document.body).trigger('fecss.init');
	
});