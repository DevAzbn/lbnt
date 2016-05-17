
$(function(){
	
	$(document.body).on('click.fecss.b-about-cont.close-btn', '.b-about-cont .close-btn', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var block = btn.closest('.b-about-cont');
		
		block
			.removeClass('active')
			.css({
				'top' : '-' + block.outerHeight(true) + 'px',
			})
		;
		
		$('.page-container').removeClass('filter blur');
		$('.b-top-menu').removeClass('filter blur');
		
	});
	$('.b-about-cont .close-btn').trigger('click.fecss.b-about-cont.close-btn');
	
});
