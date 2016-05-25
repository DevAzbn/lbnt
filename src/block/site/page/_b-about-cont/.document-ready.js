
$(function(){
	
	$(document.body).on('click.fecss.b-about-cont.close-btn', '.b-about-cont .close-btn', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var block = btn.closest('.b-about-cont');
		
		block
			
			.css({
				//'top' : '-' + block.outerHeight(true) + 15 + 'px',
				'top' : '-120%',
			}).removeClass('active')
		;
		
		if(!screenJS.isXS() && !screenJS.isSM()) {
			$('.page-container').removeClass('blur');
			$('.b-top-menu').removeClass('blur');
		}
		
	});
	$('.b-about-cont .close-btn').trigger('click.fecss.b-about-cont.close-btn');
	
});
