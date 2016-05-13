	
	$('[data-toggle="tooltip"]').tooltip();
	

	$('.arrow-slider').each(function(index){
		
		var block = $(this);
		var imgs = block.find('.img-block .item');
		var content = block.find('.text-content');
		var title_block = block.find('.title-block');
		var arrow_block = block.find('.arrow-block');
		var point_line = arrow_block.find('.point-line');
		//var counter = block.find('.info-block .counter');
		//var position = counter.find('.position');
		
		imgs.each(function(index){
			//$(this).attr('data-index', index+1);
			$('<a/>',{
				class : 'item',
				html : '<span class="point" ></span>',
				href : '#image-' + index,
			})
			.on('click.arrow-slider.point',function(event){
				console.log('click.arrow-slider.point');
				var i = $(this).index();
				point_line.find('.item').removeClass('active');
				imgs.fadeOut('fast').removeClass('active');
				$(this).addClass('active');
				imgs.eq(i).fadeIn('fast').addClass('active');
			})
			.appendTo(point_line);
		});
		/*
		imgs.eq(0).each(function(index){
			$(this).addClass('active');
			//counter.find('.position').html(index+1);
			//counter.find('.form').html(imgs.size());
		});
		*/
		arrow_block.on('click.arrow-slider.right', '.btn-arrow.right', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).next('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(0).trigger('click');
			}
		});
		arrow_block.on('click.arrow-slider.left', '.btn-arrow.left', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).prev('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(-1).trigger('click');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					arrow_block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
		if(point_line.find('.item.active').size()) {
			
		} else {
			point_line.find('.item').eq(0).trigger('click');
		}
		
	});
	

$(document.body).on('click.fecss.can-close.close-btn', '.can-close .close-btn', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.can-close.close-btn');
	
	$(this).closest('.can-close').removeClass('active');
});


/*
start .fecss document-ready
*/

$(
	function() {
		var res = 'noname-browser';
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('msie') != -1) res = 'msie';
		if (userAgent.indexOf('trident') != -1) res = 'msie';
		if (userAgent.indexOf('konqueror') != -1) res = 'konqueror';
		if (userAgent.indexOf('firefox') != -1) res = 'firefox';
		if (userAgent.indexOf('safari') != -1) res = 'safari';
		if (userAgent.indexOf('chrome') != -1) res = 'chrome';
		if (userAgent.indexOf('chromium') != -1) res = 'chromium';
		if (userAgent.indexOf('opera') != -1) res = 'opera';
		if (userAgent.indexOf('yabrowser') != -1) res = 'yabrowser';
		
		$('html').eq(0).addClass(res);
	}
);

$(
	function() {
		$(document.body).bind('keydown', function(event){
			event.stopPropagation();
			
			$(document.body).trigger('fecss.keydown', [{
				alt : event.altKey,
				ctrl : event.ctrlKey,
				shift : event.shiftKey,
				meta : event.metaKey,
				key : event.which,
				liter : String.fromCharCode(event.which),
			}]);
		});
	}
);

/*
end .fecss document-ready
*/

/*
$(document.body).on(
	//'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error',
	'dblclick',
	'.autosave',
	function(event){
		
	}
);
*/

/*
var urlL = new jsURLHistory();

setTimeout(function(){
	urlL.go2('/testovy1',{id:1,});
},3000);

setTimeout(function(){
	urlL.go2('/testovy2',{id:2,});
},6000);

setTimeout(function(){
	urlL.go2('/testovy3',{id:3,});
},9000);

setTimeout(function(){
	urlL.back();
},13000);

setTimeout(function(){
	urlL.back();
},16000);

setTimeout(function(){
	urlL.back();
},19000);

// http://xozblog.ru/demo/history-api-demo/pushState/script.js
window.addEventListener('popstate', function(event) {
	alert(JSON.stringify(event.state));
}, false);
*/

$(document.body).on('click.fecss.fecss-collapse.collapser', '.fecss-collapse .collapser', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.fecss-collapse.collapser');
	
	var btn = $(this);
	var collapse = btn.closest('.fecss-collapse');
	collapse.toggleClass('active');
	
});

/*
$('.fecss-imguploader').jqfeDropImgOptimizer3({
	max_width:800,
	max_height:800,
	callback:function(dataURL){		
		$(document.body).append('<img src="' + dataURL + '" />');
	}
});
*/
$(document.body).on('click.fecss.imgresizer', '.fecss-imgresizer', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.imgresizer');
	
	var btn = $(this);
	//var href = btn.attr('href');
	var max_w = parseInt(btn.attr('data-max-width')) || 1000;
	var max_h = parseInt(btn.attr('data-max-height')) || 1000;
	
	btn.jqfeDropImgOptimizer3({
		max_width : max_w,
		max_height : max_h,
		'multiple' : 'multiple',
		callback:function(result){ // {result:, file:}
			console.log((result.file));
			$(document.body).append('<img src="' + result.dataURL + '" title="' + result.file.name + '" />');
		}
	})

});

$('.fecss-jscacher').each(function(){
	
	var block = $(this);
	
	var flt = block.attr('data-jscacher-filter') || 'default';
	var ttl = parseInt(block.attr('data-jscacher-ttl')) || 60000;
	
	block.attr('data-jscacher-cached', false);
	
	var Cacher = new jsCacher({
		filter : flt,
		ttl : ttl,
	});
	
	block.on('cacher-clear', function(event){
		block.attr('data-jscacher-cached', false);
		Cacher.clear();
	});
	
	block.on('cacher-cache', function(event){
		block.attr('data-jscacher-cached', false);
		Cacher.cache(block.html());
		block.attr('data-jscacher-cached', true);
		console.log('.fecss-jscacher[data-jscacher-filter="' + flt + '"] cacher-cache');
	});
	
	block.on('cacher-load', function(event){
		var cache = Cacher.load();
		block.html(cache.content).attr('data-jscacher-cached', true);
		console.log('.fecss-jscacher[data-jscacher-filter="' + flt + '"] cacher-load');
	});
	
	block.on('cacher-check', function(event){
		var cache = Cacher.load();
		if(cache.need_update) {
			block.trigger('cacher-cache');
		} else {
			block.trigger('cacher-load');
		}
	}).trigger('cacher-check');
	
})



$('.fecss-jscart').each(function(){
	
	var block = $(this);
	var flt = block.attr('data-jscart-filter') || 'default';
	
	var Cart = new jsCart({
		filter : flt,
	});
	
	block.on('rebuild', function(event){
		block.find('.jscart-item').each(function(index){
			
			var item = $(this);
			
			var product = item.attr('data-jscart-product');
			var taste = item.attr('data-jscart-taste');
			//var cost = item.attr('data-jscart-cost');
			//var amount = item.attr('data-jscart-amount');
			
			var c_item = Cart.getItem(product, taste);
			item.find('input.jscart-item-amount').attr('value', parseInt(c_item.amount));
			item.find('div.jscart-item-amount, span.jscart-item-amount, a.jscart-item-amount').html(parseInt(c_item.amount));
			
			var result = Cart.calculate();
			block.attr('data-jscart-sum', result.sum).find('.jscart-sum').html(result.sum);
			block.find('.jscart-product').html(result.product);
			block.find('.jscart-amount').html(result.amount);
		});
	});
	block.trigger('rebuild');
	
	block.on('clear', function(event){
		Cart.clear();
		block.trigger('rebuild');
	});
	
	block.on('create-order', function(event){
		Cart.saveCart(function(profile, cart){
			
			var order = {
				profile : profile,
				cart : cart,
			};
			
			$.getJSON('/json/_fecss-jscart/create-order.json', function(data){
				
				var neworder = data;//JSON.parse(data);
				Cart.saveOrder(neworder);
				
				Cart.clear();
				block.trigger('rebuild');
			});
			
		})
	});
	
	
	
	block.find('.jscart-item .jscart-add-btn').on('click.jscart', function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		var product = btn.attr('data-jscart-product');
		var taste = btn.attr('data-jscart-taste');
		var cost = btn.attr('data-jscart-cost');
		var amount = btn.attr('data-jscart-amount');
		
		if(product == '' || typeof product == 'underfined' || product == null) {
			product = btn.closest('.jscart-item').attr('data-jscart-product');
		}
		if(taste == '' || typeof taste == 'underfined' || taste == null) {
			taste = btn.closest('.jscart-item').attr('data-jscart-taste');
		}
		if(cost == '' || typeof cost == 'underfined' || cost == null) {
			cost = btn.closest('.jscart-item').attr('data-jscart-cost');
		}
		if(amount == '' || typeof amount == 'underfined' || amount == null || amount == 0) {
			amount = btn.closest('.jscart-item').attr('data-jscart-amount');
		}
		
		Cart.add(product, taste, cost, parseInt(amount));
		console.log('product ' + product + ' added to cart');
		block.trigger('rebuild');
	});
	
	block.find('.jscart-item .jscart-remove-btn').on('click.jscart', function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		var product = btn.attr('data-jscart-product');
		var taste = btn.attr('data-jscart-taste');
		var cost = btn.attr('data-jscart-cost');
		var amount = btn.attr('data-jscart-amount');
		
		if(product == '' || typeof product == 'underfined' || product == null) {
			product = btn.closest('.jscart-item').attr('data-jscart-product');
		}
		if(taste == '' || typeof taste == 'underfined' || taste == null) {
			taste = btn.closest('.jscart-item').attr('data-jscart-taste');
		}
		if(cost == '' || typeof cost == 'underfined' || cost == null) {
			cost = btn.closest('.jscart-item').attr('data-jscart-cost');
		}
		if(amount == '' || typeof amount == 'underfined' || amount == null || amount == 0) {
			amount = btn.closest('.jscart-item').attr('data-jscart-amount');
		}
		
		Cart.remove(product, taste, parseInt(amount));
		console.log('product ' + product + ' removed from cart');
		block.trigger('rebuild');
	});
	
	block.find('.jscart-clear-btn').on('click.jscart', function(event){
		event.preventDefault();
		block.trigger('clear');
	});
	
	block.find('.jscart-create-order').on('click.jscart', function(event){
		event.preventDefault();
		block.trigger('create-order');
	});
	
})



$('.fecss-jsviewed').each(function(){
	
	var block = $(this);
	var flt = block.attr('data-jsviewed-filter') || 'default';
	var tpl = block.html();
	
	var Viewed = new jsViewed({
		filter : flt,
	});
	
	block.on('rebuild', function(event){
		block.empty();
		
		var vwd = Viewed.getAll();
		//console.log(vwd.length);
		if(vwd != null) {
			for(var k in vwd) {
				var item = vwd[k];
				
				var html = tpl;
				
				for(var _k in item) {
					html = html.replace(new RegExp('%' + _k + '%','ig'), item[_k]);
				}
				
				var div = $('<div/>',{
					html : html,
				});
				div.appendTo(block);
			}
		}
	});
	block.trigger('rebuild');
	
	block.on('create-view', {}, function(event, data){
		Viewed.add(data);
		console.log('.fecss-jsviewed[data-jsviewed-filter="' + flt + '"] create-view');
	});
	
	block.on('clear', function(event){
		Viewed.clear();
		block.trigger('rebuild');
	});
	
	block.find('.jsviewed-clear-btn').on('click.jsviewed', function(event){
		event.preventDefault();
		block.trigger('clear');
	});
	
	(function(){
		block.trigger('create-view', [{
			id : new Date().getTime(),//1456862349352,//
			title : 'some test',
		}]);
	})();
	
})



$(document.body).on('click.fecss.modal.show', '.fecss-modal-btn', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.modal.show');
	
	var btn = $(this);
	var href = btn.attr('href');
	
	var wc = $(document.body).find('.fecss-modal ' + href + '.white-container');
	var modal = wc.closest('.fecss-modal');
	
	if(wc.size()) {
		
		var _prev = $(document.body).find('.fecss-modal .white-container.active:not(.in-bg)').eq(0);
		if(_prev.size()) {
			_prev.addClass('in-bg');
			_prev.closest('.fecss-modal').addClass('in-bg');
			wc.data('fecss-modal-prev', _prev.attr('id'));
		}
		
		//if(!modal.hasClass('active')) {
			modal.addClass('active').removeClass('in-bg');
		//}
		
		var bc = modal.find('.black-container');
		bc.css({top : $(document).scrollTop() + 50 + 'px',});
		
		wc.addClass('active').removeClass('in-bg').trigger('fecss.active.set');
		
		$(document.body).trigger('fecss.modal.show.after', [modal, wc]);
		
	}
});

$(document.body).on('click.fecss.modal.hide', '.fecss-modal .white-container .hide-modal', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.modal.hide');
	
	var btn = $(this);
	var wc = btn.closest('.white-container');
	var modal = btn.closest('.fecss-modal');
	
	if(wc.size()) {
		
		wc.removeClass('active').removeClass('in-bg');
		
		var _prev = $('#' + wc.data('fecss-modal-prev'));
		if(_prev.size()) {
			
			var _prev_modal = _prev.closest('.fecss-modal');
			
			if(_prev_modal.hasClass('active')) {
				if(!_prev_modal.hasClass('in-bg')) {
					
				} else {
					modal.removeClass('active').removeClass('in-bg');
					_prev_modal.removeClass('in-bg');
				}
			} else {
				modal.removeClass('active');
				_prev_modal.addClass('active').removeClass('in-bg');
			}
			
			_prev.removeClass('in-bg');
			
		} else {
			modal.removeClass('active');
		}
		
		wc.data('fecss-modal-prev', '').trigger('fecss.active.unset');
		
		$(document.body).trigger('fecss.modal.hide.after', [modal, wc]);
		
	}
	
});


/*
start .got-to-top document-ready
*/

$(document.ready).on('click.fecss.go-to-top', '.go-to-top', function(event){
	event.preventDefault();
	
	$('html, body').animate({
		scrollTop : 0
	}, 777);
});

/*
end .got-to-top document-ready
*/


	$('.line-gallery').each(function(index){
		
		var block = $(this);
		
		//var arrow_block = block.find('.arrow-block');

		block.on('click.line-gallery.right', '.btn-arrow.right', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				vis.eq(-1).next('.item').fadeIn('fast');
			} else {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				block.find('.img-block .item').eq(0).fadeIn('fast');
			}
		});
		block.on('click.line-gallery.left', '.btn-arrow.left', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(-1).hide();
				imgs.eq(-1).insertBefore(vis.eq(0)).fadeIn('fast');
			} else {
				vis.eq(0).hide();
				block.find('.img-block .item').eq(-1).insertBefore(block.find('.img-block .item').eq(0)).fadeIn('fast');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
	});
	
$(window).load(function(event){
	$('.page-loader').removeClass('active');
});

$(document.body).on('click.fecss.page-loader.close-loader', '.page-loader .close-loader', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.page-loader.close-loader');
	
	$('.page-loader').removeClass('active');
});
	
	$('.scroll-container').each(function(index){
		
		var block = $(this);
		var target = $(block.attr('data-target') + ' .scroll-element').eq(0);
		var otarget = target.find('.scroll-overflow').eq(0);
		var line = block.find('.scroll-line');
		var scroll = line.find('.scroll');
		var scroll_ball;
		scroll_ball = $('<div/>', {
			class:'scroll-ball',
		});
		scroll_ball.appendTo(scroll.empty());
		var type = 0;
		
		block.on('init', function(event){
			event.preventDefault();
			
			console.log('.scroll-container init');
			
			if(block.hasClass('horizontal')) {
				type = 0;
				
				scroll.width(line.width() * (target.outerWidth(true) / otarget.outerWidth(true)));
				
				block.attr('data-ratio-h', (otarget.outerWidth(true) / (line.outerWidth(true))));
				
				scroll.draggable({
					axis:'x',
					containment : 'parent',
					scroll:false,
					drag:function(event, ui){
						target.scrollLeft(ui.position.left * block.attr('data-ratio-h'));
					},
				});
				
				target.trigger('scroll');
				
			} else if(block.hasClass('vertical')) {
				type = 1;
				
				scroll.height(line.height() * (target.outerHeight(true) / otarget.outerHeight(true)));
				
				block.attr('data-ratio-v', (otarget.outerHeight(true) / (line.outerHeight(true))));
				
				scroll.draggable({
					axis:'y',
					containment : 'parent',
					scroll:false,
					drag:function(event, ui){
						target.scrollTop(ui.position.top * block.attr('data-ratio-v'));
					},
				});
				
				target.trigger('scroll');
				
			}
		}).trigger('init');
		
		target.on('scroll', function(event){
			var pos = 0;
			var _pos = 0;
			if(type == 0) {
				pos = target.scrollLeft() / block.attr('data-ratio-h');
				_pos = pos * 100 / (line.outerWidth(true) - scroll.outerWidth(true));
				
				scroll.css({'left':pos});
				scroll_ball.css({'left':_pos + '%'});
			} else if(type == 1) {
				pos = target.scrollTop() / block.attr('data-ratio-v');
				_pos = pos * 100 / (line.outerHeight(true) - scroll.outerHeight(true));
				
				scroll.css({'top':pos});
				scroll_ball.css({'top':_pos + '%'});
			}
		});
		
	});
	

$(document.body).on('click.fecss.scrollto', '.scrollto', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.scrollto');
	
	var btn = $(this);
	
	var el = $(btn.attr('href')).eq(0);
	var diff = parseInt(btn.attr('data-scrollto-diff')) || 0;
	var speed = parseInt(btn.attr('data-scrollto-speed')) || 777;
	
	$('html, body').animate({
		scrollTop: (el.offset().top + diff)
	}, speed);
});

	
	/*
	$('.touchswipe').swipe({
		// http://labs.rampinteractive.co.uk/touchSwipe/demos/
		
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			console.log('.touchswipe swipe ' + direction);
		},
		//swipeLeft ...
		
		threshold:20
	});
	*/
	
	
	$(document.body).on('click.fecss.url-history', '.url-history', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var href = btn.attr('href');
		var target = btn.attr('data-target');
		
		if(typeof target != 'undefined' && target != 'undefined') {
			//href = target;
		} else {
			target = 'title:title, body:body';
		}
		
		var addToHistory = true;
		
		$(document.body).trigger('fecss.url-history.get', [href, target, addToHistory]);
	});
	
$(document.body).on('click.fecss.rolling-image-btn', '.rolling-image-btn', {}, function(event){
	event.preventDefault();
	
	var btn = $(this);
	var id = btn.attr('data-img-id');
	
	var ri = $('.rolling-image');
	
	ri.find('.img-item').removeClass('on-top')
	ri.removeClass('active');
	ri.find('.img-item').filter(id).addClass('on-top');
	ri.addClass('active');
	
	$('.rolling-image-btn').prop('disabled', 'disabled');
	
	setTimeout(function(){
		ri.removeClass('active');
		$('.rolling-image-btn').prop('disabled', false);
	}, 6000);
	
});
$(document.body).on('fecss.b-project-container.item.setActive', '.b-project-container', {}, function(event, _index){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	slides.removeClass('active');
	slides.eq(_index).addClass('active');
	
	nav.find('.item').removeClass('active');
	nav.find('.item').eq(_index).addClass('active');
	
});

$(document.body).on('click.fecss.b-project-container.nav-control.item', '.b-project-container .nav-control .item', {}, function(event){
	event.preventDefault();
	
	var btn = $(this);
	
	btn.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index()]);
	
});

$(document.body).on('fecss.b-project-container.init', '.b-project-container', {}, function(event){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	block.css({
		height : $(window).outerHeight(true),
	})
	
	nav.empty();
	
	slides.each(function(_index){
		var s = $(this);
		
		var item = $('<a/>', {
			class : 'item',
			href : '#project-slide-' + _index,
		})
			.appendTo(nav);
	});
	
	var h = nav.outerHeight(true);
	var top_value = (block.outerHeight(true) - h) / 2;
	nav.parent().css({
		height : h +'px',
		top : top_value +'px',
		bottom : top_value +'px',
	})
	
	nav.find('a.item').eq(0).trigger('click.fecss.b-project-container.nav-control.item');
	
});



$(function(){
	
	$(document.body).on('click.fecss.go-to-header', '.go-to-header.scrollto', {}, function(event){
		event.preventDefault();
		
		$('.wheel-block')
			.removeClass('active')
			.filter('[data-wheel-step="0"]')
				.addClass('active')
		;
		$(document.body).attr('data-wheel-step', 0);
		
	});
	
});


$(function(){
	
	/*
	$(document.body).on('click.fecss.order-service-btn', '.b-top-menu .site-menu .order-service-btn', {}, function(event){
		event.preventDefault();
		
		var block = $('.b-order-service').eq(0);
		
		$('html, body').animate({
			scrollTop: (block.offset().top)
		}, 777, function() {
			block.addClass('active');
			$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
		});
		
	});
	*/
	
});

$(function() {
	
	if(device.desktop() && $('.wheel-block').size()) {
		var scrolling = false;
		var _step = 0;
		
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
			
			scrolling = true;
			
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
					
					console.log('body trigger:fecss.wheel-block.set: (wheel-block-child) ' + JSON.stringify(param));
					
					if(param.diff > 0) {
						
						block_child = active_child.prev('.wheel-block-child');
						
					} else if(param.diff < 0) {
						
						block_child = active_child.next('.wheel-block-child');
						
					}
					
					if(block_child.size()) {
						
						//active.trigger('fecss.b-project-container.item.setActive', [parseInt(block_child.attr('data-wheel-step'))]);
						
						var nav = active.find('.nav-control .item-cell');
						nav.find('a.item').eq(parseInt(block_child.attr('data-wheel-step'))).trigger('click.fecss.b-project-container.nav-control.item');
						
						scrolling = false;
						
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
								scrolling = false;
							});
							
						} else {
							
							scrolling = false;
							
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
							scrolling = false;
						});
						
					} else {
						
						scrolling = false;
						
					}
					
				}
				
			} else {
				
				block = $('.wheel-block[data-wheel-step="0"]');
				
				block.addClass('active');
				$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
				
				scrolling = false;
				
			}
			
		})
			.trigger('fecss.wheel-block.set', [{
				step : _step,
			}])
		;
		
		
		$(document).on("wheel mousewheel DOMMouseScroll", function(event) {
			event.preventDefault();
			
			if(scrolling) {
				return;
			} else {
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			
			/*
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			} else { 
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			*/
		});
	
	}
	
});

$(function(){
	
	$(document.body).on('click.fecss.b-project-filters.type-filters.a', '.b-project-filters .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-project-filters .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});


$(function(){
	
	$(document.body).on('click.fecss.b-service-header.type-filters.a', '.b-service-header .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-service-header .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});
