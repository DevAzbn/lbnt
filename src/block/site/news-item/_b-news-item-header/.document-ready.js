
$(document.body).on('fecss.b-news-item-header.init', '.b-news-item-header', {}, function(event){
	event.preventDefault();
	
	var block = $(this);
	var slide = block.find('.news-item-img-cont');
	
	if(!screenJS.isXS()) {
		slide.css({
			height : $(window).outerHeight(true),
		});
	}
	
});
