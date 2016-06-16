	
	$(document.body).on('fecss.url-history.get', null, {}, function(event, href, target, addToHistory){
		event.preventDefault();
		
		$('.page-loader.full-screen').addClass('active');
		
		setTimeout(function(){
			
			$.get(href, {}, function(data) {
				// Обновление только текстового содержимого в сером блоке
				var t_arr = [];
				
				if(target != '' && typeof target != 'undefined' && target != 'undefined') {
					t_arr = target.split(',');
				} else {
					t_arr = ['div:div'];
				}
				for(var k in t_arr) {
					var item = t_arr[k].trim().split(':');
					
					var d = $('<div/>',{
						//html : data,
					})
						.css({
							'display' : 'none',
						})
						.html(data)
					;
					
					$(item[0]).html(d.find(item[1]).eq(0).html());
					d.empty().remove();
				}
				
				// Если был выполнен клик в меню - добавляем запись в стек истории сеанса
				// Если была нажата кнопка назад/вперед, добавлять записи в историю не надо
				
				if(addToHistory == true) {
					// Добавляем запись в историю, используя pushState
					window.history.pushState({href : href, target : target}, null, href);
				}
				
				setTimeout(function(){
					
					//$(document).trigger('ready');
					//$(document.body).trigger('fecss.init');
					//$(window).trigger('resize');
					
					$(document.body).removeClass('is-mainpage');
					
					if($('.b-welcome').size()) {
						$(document.body).addClass('is-mainpage')
					}
					
					
					
					if($('.b-service-header').size()) {
						if(screenJS.isXS()) {
							$('.b-service-header .type-filters a').eq(2).trigger('click.fecss.b-service-header.type-filters.a');
						} else {
							$('.b-service-header .type-filters a').eq(0).trigger('click.fecss.b-service-header.type-filters.a');
						}
					}
					
					
					
					if($('.owl-carousel').size()) {
						
						$('.owl-carousel').owlCarousel({
							loop:true,
							margin:0,
							//autoWidth:true,
							items:4,
							animateIn:true,
							animateOut: true,
							autoplay:false,
							//autoplayTimeout:3000,
							responsiveClass:true,
							responsive:{
								0:{
									items:1,
									nav:true,
								},
								768:{
									items:2,
									nav:false,
								},
								992:{
									items:3,
									nav:false,
									loop:false,
								},
								1200:{
									items:4,
									nav:false,
									loop:false,
								},
							}
						});
						
					}
					
					
					
					if($('.b-project-list').size()) {
						
						if(screenJS.isMD() || screenJS.isLG()) {
							
							$('.b-project-list .project-cont').css({
								height : $(window).outerHeight(true),
							});
							
						}
						
						$('.b-project-filters .type-filters a').eq(0).trigger('click.fecss.b-project-filters.type-filters.a');
						
					}
					
					
					if($('.b-news-list').size()) {
						
						if(screenJS.isMD() || screenJS.isLG()) {
							
							$('.b-news-list .project-cont').css({
								height : $(window).outerHeight(true),
							});
							
						}
						
						$('.b-news-filters .type-filters a').eq(0).trigger('click.fecss.b-news-filters.type-filters.a');
						
					}
					
					
					
					$('.b-news-item-header').trigger('fecss.b-news-item-header.init');
					
					
					
					//$('.arrow-slider').trigger('');
					
					
					
					$('.page-loader.full-screen').removeClass('active');
					
					$('html, body').animate({
						scrollTop : 0
					}, 777);
					
				}, 
				999);
			});
			
		}, 
		451);
		
	});
	
	window.addEventListener('popstate', function(event) {
		//alert(JSON.stringify(event.state));
		if(event.state && event.state.target) {
			$(document.body).trigger('fecss.url-history.get', [window.location.pathname, event.state.target, false]);
		}
	}, false);
	