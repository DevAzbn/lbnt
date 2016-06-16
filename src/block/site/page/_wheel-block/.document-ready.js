$(function() {
	
	if((screenJS.isMD() || screenJS.isLG()) && $('.wheel-block').size()) {
		var scrolling;
		var _step = 0;
		
		var can_scroll = function(timeout){
			if(timeout) {
				setTimeout(function(){
					scrolling = false;
				}, timeout);
			} else {
				scrolling = false;
			}
		};
		
		can_scroll();
		
		$('.wheel-block').each(function(index){
			$(this).attr('data-wheel-step', index);
		});
		
		
		$('.wheel-block.with-child-wheel').each(function(index){
			var _b = $(this);
			_b.find('.wheel-block-child').each(function(_index){
				var __b = $(this);
				__b.attr('data-wheel-step', _index);
			});
		});
		
		
		
		
		$(document.body).on('fecss.wheel-block.set', null, {}, function(event, param){
			event.preventDefault();
			
			//scrolling = true;
			
			console.log('body trigger:fecss.wheel-block.set: ' + JSON.stringify(param));
			
			param.diff = parseInt(param.diff);
			param.step = param.step || -1;
			
			var active, active_step, block;
			
			active = $('.wheel-block.active');
			
			if(active.size()) {
				
				active_step = parseInt(active.attr('data-wheel-step'));
				
				if(active.hasClass('with-child-wheel')) { // .wheel-block-child 
					
					//.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index()]);
					
					var block_child;
					var active_child = active.find('.wheel-block-child.active');
					var active_child_step = parseInt(active_child.attr('data-wheel-step'));
					
					//console.log('body trigger:fecss.wheel-block.set: (wheel-block-child) ' + JSON.stringify(param));
					
					if(param.diff > 0) {
						
						block_child = active_child.prev('.wheel-block-child');
						
					} else if(param.diff < 0) {
						
						block_child = active_child.next('.wheel-block-child');
						
					}
					
					if(block_child.size()) {
						
						//active.trigger('fecss.b-project-container.item.setActive', [parseInt(block_child.attr('data-wheel-step'))]);
						
						var nav = active.find('.nav-control .item-cell');
						nav.find('a.item').eq(parseInt(block_child.attr('data-wheel-step'))).trigger('click.fecss.b-project-container.nav-control.item', [function(){
							can_scroll(451);
							//alert();
						}]);
						
						//scrolling = false;
						
					} else {
						
						if(param.diff > 0) {
							
							block = active.prev('.wheel-block');
							
						} else if(param.diff < 0) {
							
							block = active.next('.wheel-block');
							
						}
						
						if(block.size()) {
							
							$('html, body').animate({
								scrollTop: (block.offset().top)
							}, 777, function() {
								if(active.size()) {
									active.removeClass('active');
								}
								block.addClass('active');
								$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
								can_scroll();
							});
							
						} else {
							
							can_scroll();
							
						}
						
					}
					
				} else {
					
					if(param.diff > 0) {
						
						block = active.prev('.wheel-block');
						
					} else if(param.diff < 0) {
						
						block = active.next('.wheel-block');
						
					} else if(param.step > -1) {
						
						block = $('.wheel-block[data-wheel-step="' + param.step + '"]');
						
					}
					
					if(block.size()) {
						
						$('html, body').animate({
							scrollTop: (block.offset().top)
						}, 777, function() {
							if(active.size()) {
								active.removeClass('active');
							}
							block.addClass('active');
							$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
							can_scroll();
						});
						
					} else {
						
						can_scroll();
						
					}
					
				}
				
			} else {
				
				block = $('.wheel-block[data-wheel-step="0"]');
				
				block.addClass('active');
				$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
				
				can_scroll();
				
			}
			
		})
			.trigger('fecss.wheel-block.set', [{
				step : _step,
			}])
		;
		
		
		$(document.body).on("wheel mousewheel DOMMouseScroll MozMousePixelScroll", function(event) {
			if($(document.body).hasClass('is-mainpage')) {
				event.preventDefault();
			}
			
			if(scrolling) {
				return;
			} else {
				scrolling = true;
				
				var diff = (-event.originalEvent.deltaY) || event.originalEvent.detail || event.originalEvent.wheelDelta;
				
				$(document.body).trigger('fecss.wheel-block.set', [{diff:diff}]);
			}
			
		});
	
	}
	
});