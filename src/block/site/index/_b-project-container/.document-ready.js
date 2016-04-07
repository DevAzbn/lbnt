$(document.body).on('fecss.b-project-container.item.setActive', '.b-project-container', {}, function(event, _index){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	slides.removeClass('active');
	slides.eq(_index).addClass('active');
	
	nav.find('.item').removeClass('active');
	nav.find('.item').eq(_index).addClass('active');
	
});

$(document.body).on('click.fecss.b-project-container.nav-control.item', '.b-project-container .nav-control .item', {}, function(event){
	event.preventDefault();
	
	var btn = $(this);
	
	btn.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index()]);
	
});

$(document.body).on('fecss.b-project-container.init', '.b-project-container', {}, function(event){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	nav.empty();
	
	slides.each(function(_index){
		var s = $(this);
		
		var item = $('<a/>', {
			class : 'item',
			href : '#project-slide-' + _index,
		})
			.appendTo(nav);
	});
	
	nav.find('a.item').eq(0).trigger('click.fecss.b-project-container.nav-control.item');
	
});
$('.b-project-container').trigger('fecss.b-project-container.init');
