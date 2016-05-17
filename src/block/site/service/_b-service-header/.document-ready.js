
$(function(){
	
	$(document.body).on('click.fecss.b-service-header.type-filters.a', '.b-service-header .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var flt = btn.attr('data-filter');
		
		$('.b-service-header .type-filters a').removeClass('active');
		btn.addClass('active');
		
		var block = $('.b-service-body');
		var tt = block.find('.text-tabber .item');
		tt.filter('.active').removeClass('active');
		tt.filter('[data-filter="' + flt + '"]').addClass('active');
		
	});
	
	$('.b-service-header .type-filters a').eq(0).trigger('click.fecss.b-service-header.type-filters.a');
	
});
