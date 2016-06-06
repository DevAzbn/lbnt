
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
	
	$(function(){
		var hash = window.location.hash.split('#'); 
		if(hash[1]) {
			$('.b-service-header .type-filters a[data-filter="' + hash[1] + '"]').eq(0).trigger('click.fecss.b-service-header.type-filters.a');
		} else {
			if(screenJS.isXS()) {
				$('.b-service-header .type-filters a').eq(2).trigger('click.fecss.b-service-header.type-filters.a');
			} else {
				$('.b-service-header .type-filters a').eq(0).trigger('click.fecss.b-service-header.type-filters.a');
			}
		}
	});
	
});
