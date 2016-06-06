	
	$(document.body).on('fecss.url-history.get', null, {}, function(event, href, target, addToHistory){
		event.preventDefault();
		
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
					html : data,
				});
				
				$(item[0]).html(d.find(item[1]).eq(0).html());
				d.empty().remove();
			}
			
			// Если был выполнен клик в меню - добавляем запись в стек истории сеанса
			// Если была нажата кнопка назад/вперед, добавлять записи в историю не надо
			
			if(addToHistory == true) {
				// Добавляем запись в историю, используя pushState
				window.history.pushState({href : href, target : target}, null, href);
			}
			
			$(document).trigger('ready');
			$(document.body).trigger('fecss.init');
			$(window).trigger('resize');
		});
		
	});
	
	window.addEventListener('popstate', function(event) {
		//alert(JSON.stringify(event.state));
		if(event.state && event.state.target) {
			$(document.body).trigger('fecss.url-history.get', [window.location.pathname, event.state.target, false]);
		}
	}, false);
	