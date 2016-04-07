
$(function(){
	
	$('.project-slide').each(function(index){
		
		var block = $(this);
		var param = JSON.parse(block.attr('data-slide-param')||'{}');
		
		block.css({
			'height' : (block.outerWidth(true) / param.ratio),
			'background-image' : 'url(' + param.img + ')',
		})
		
	});
	
});
