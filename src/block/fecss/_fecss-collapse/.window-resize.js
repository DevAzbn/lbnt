$(function(){
	
	if(screenJS.isXS() || screenJS.isSM()) {
		
		var collapse = $('.b-top-menu .fecss-collapse');
		
		collapse.find('.collapsing').css({
			height : $(window).outerHeight(true),
		});
		
	}
	
	
});