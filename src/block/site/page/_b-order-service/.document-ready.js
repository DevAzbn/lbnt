
$(function(){
	
	$(document.body).on('click.fecss.go-to-header', '.go-to-header.scrollto', {}, function(event){
		event.preventDefault();
		
		$('.wheel-block')
			.removeClass('active')
			.filter('[data-wheel-step="0"]')
				.addClass('active')
		;
		$(document.body).attr('data-wheel-step', 0);
		
		$('.b-project-container').trigger('fecss.b-project-container.item.setActive', [0])
		
	});
	
});
