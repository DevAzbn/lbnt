$(function(){
	
	if(screenJS.isXS()) {
		
		var collapse = $('.b-top-menu .fecss-collapse');
		
		collapse.find('.collapsing').css({
			height : $(window).outerHeight(true),
		});
		
	}
	
	
});