
$(function(){
	
	$('.project-slide').each(function(index){
		
		var block = $(this);
		var param = JSON.parse(block.attr('data-slide-param')||'{}');
		
		if(screenJS.isXS()) {
			block.css({
				//'height' : $(window).outerHeight(true),
				'background-image' : 'url(' + param.img + ')',
			});
		} else if(screenJS.isSM() || screenJS.isMD()) {
			block.css({
				'height' : $(window).outerHeight(true),
				'background-image' : 'url(' + param.img + ')',
			});
		} else {
			block.css({
				'height' : (block.outerWidth(true) / param.ratio),
				'background-image' : 'url(' + param.img + ')',
			});
		}
		
	});
	
});
