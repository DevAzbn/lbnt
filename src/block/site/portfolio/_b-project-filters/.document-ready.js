
$(function(){
	
	$(document.body).on('click.fecss.b-project-filters.type-filters.a', '.b-project-filters .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-project-filters .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});
