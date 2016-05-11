if(device.desktop()) {

	$(function() {
		
		var scrolling = false;
		var _step = 0;
		
		$('.wheel-block').each(function(index){
			$(this).attr('data-wheel-step', index);
		});
		
		
		$(document.body).on('fecss.wheel.set', null, {}, function(event, param){
			event.preventDefault();
			
			scrolling = true;
			
			console.log('body trigger:fecss.wheel.set: ' + JSON.stringify(param));
			
			param.diff = parseInt(param.diff);
			param.step = parseInt(param.step);
			
			var active, active_step, block;
			
			active = $('.wheel-block.active');
			
			if(param.step > 0 || param.step == 0) {
				
				block = $('.wheel-block[data-wheel-step="' + param.step + '"]');
				
			} else {
				
				if(active.size()) {
					
					var _prev = active.prev('.wheel-block');
					var _next = active.next('.wheel-block');
					
					if(param.diff > 0) {
						block = _prev;
					} else {
						block = _next;
					}
					
				} else {
					
					block = $('.wheel-block[data-wheel-step="0"]');
					
				}
				
			}
			
			//scrolling = true;
			
			$('html, body').animate({
				scrollTop: (block.offset().top)
			}, 777, function() {
				if(active.size()) {
					active.removeClass('active');
				}
				block.addClass('active');
				$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
				scrolling = false;
			});
			
		})
			.trigger('fecss.wheel.set', [{
				step : _step,
			}])
		;
		
		
		$(document).on("wheel mousewheel DOMMouseScroll", function(event) {
			event.preventDefault();
			
			if(scrolling) {
				return;
			} else {
				$(document.body).trigger('fecss.wheel.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			
			/*
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				$(document.body).trigger('fecss.wheel.set', [{diff:event.originalEvent.wheelDelta}]);
			} else { 
				$(document.body).trigger('fecss.wheel.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			*/
		});
		
	});

}