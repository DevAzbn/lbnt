
$(function(){
	
	$(document.body).on('click.fecss.b-service-header.type-filters.a', '.b-service-header .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-service-header .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});
