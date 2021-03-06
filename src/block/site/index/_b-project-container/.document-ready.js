$(document.body).on('fecss.b-project-container.item.setActive', '.b-project-container', {}, function(event, _index, callback){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	slides.removeClass('active');
	setTimeout(function(){
		slides.eq(_index).addClass('active');
	}, 600);
	
	nav.find('.item').removeClass('active');
	nav.find('.item').eq(_index).addClass('active');
	
	if(callback) {
		callback();
	}
	
});

$(document.body).on('click.fecss.b-project-container.nav-control.item', '.b-project-container .nav-control .item', {}, function(event, callback){
	event.preventDefault();
	
	var btn = $(this);
	
	btn.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index(), callback]);
	
});

$(document.body).on('fecss.b-project-container.init', '.b-project-container', {}, function(event){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	if(!screenJS.isXS()) {
		block.css({
			height : $(window).outerHeight(true),
		});
	} else {
		/*
		block.css({
			height : '180px',
		});
		*/
	}
	
	nav.empty();
	
	slides.each(function(_index){
		var s = $(this);
		
		var item = $('<a/>', {
			class : 'item',
			href : '#project-slide-' + _index,
			html : '<span>0' + (_index + 1) + '</span>',
		})
			.appendTo(nav);
	});
	
	var h = nav.outerHeight(true);
	var top_value = (block.outerHeight(true) - h) / 2;
	nav.parent().css({
		height : h +'px',
		top : top_value +'px',
		bottom : top_value +'px',
	})
	
	nav.find('a.item').eq(0).trigger('click.fecss.b-project-container.nav-control.item');
	
});
