
$(function(){
	
	$(document.body).on('click.fecss.order-service-btn', '.b-top-menu .order-service-btn', {}, function(event){
		event.preventDefault();
		
		var block = $('.b-order-service').eq(0);
		
		$('html, body').animate({
			scrollTop: (block.offset().top)
		}, 777, function() {
			block.addClass('active');
			$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
			
			/*
			var tm = $('.b-top-menu');
			if(screenJS.isXS() && tm.find('.mobile-menu.fecss-collapse').hasClass('active')) {
				tm.find('.mobile-menu .menu-btn').trigger('click.fecss.mobile-menu.menu-btn');
			}
			*/
			
		});
		
	});
	
	$(document.body).on('click.fecss.show-b-about-cont', '.b-top-menu .show-b-about-cont', {}, function(event){
		event.preventDefault();
		
		var block = $('.b-about-cont').eq(0);
		//var h = block.outerHeight(true);
		
		block.addClass('active');
		
		if(!screenJS.isXS()) {
			$('.page-container').addClass('filter blur');
			$('.b-top-menu').addClass('filter blur');
		}
		
	});
	
	$(document).on("wheel mousewheel DOMMouseScroll", function(event) {
		//event.preventDefault();
		
		var block = $('.b-top-menu');
		if(event.originalEvent.wheelDelta > 0 && block.hasClass('over-screen')) {
			block.removeClass('over-screen');
		} else if(event.originalEvent.wheelDelta < 0 && !block.hasClass('over-screen')) {
			block.addClass('over-screen');
		}
		
	});
	
	
	$(document.body).on('click.fecss.mobile-menu.menu-btn', '.mobile-menu .menu-btn', {}, function(event){
		event.preventDefault();
		
		$('.page-container').toggleClass('filter blur');
		//$('.b-top-menu').toggleClass('filter blur');
		
	});
	
	
});
