
$(document.body).on('fecss.default',	null, {}, function(event) {
	console.log('body trigger:fecss.default');
});

$(document.body).on('fecss.init',		null, {}, function(event) {
	console.log('body trigger:fecss.init');
});

$(document.body).on('fecss.window.unload',		null, {}, function(event, _event) {
	console.log('body trigger:fecss.window.unload: ' + JSON.stringify(_event));
});

$(document.body).on('fecss.ajax.success',		null, {}, function(event) {
	console.log('body trigger:fecss.ajax.success');
});

$(document.body).on('fecss.keydown',		null, {}, function(event, _event) {
	console.log('body trigger:fecss.keydown: ' + JSON.stringify(_event));
});

$(document.body).on('DOMSubtreeModified',		null, {}, function(event, _event) {
	console.log('body trigger:DOMSubtreeModified: ' + JSON.stringify(_event));
});

$(document.body).on('fecss.changeDOM',		'.fecss-change-dom', {}, function(event, _event) {
	console.log('.fecss-change-dom trigger:fecss.changeDOM');
});

$(document.body).on('DOMSubtreeModified',		'.fecss-change-dom', {}, function(event, _event) {
	$(this).trigger('fecss.changeDOM');
});


$(document.body).on('fecss.modal.show.after', null, {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('body trigger:fecss.modal.show.after');
	
	
	
});

$(document.body).on('fecss.modal.hide.after', null, {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('body trigger:fecss.modal.hide.after');
	
	
	
});

$(document.body).on('fecss.active.set', '.fecss-modal .white-container', {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('.white-container trigger:fecss.active.set');
	
	
	
});

$(document.body).on('fecss.active.unset', '.fecss-modal .white-container', {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('.white-container trigger:fecss.active.unset');
	
	
	
});


	
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
				$(item[0]).html($(data).find(item[1]).eq(0).html());
			}
			
			// Если был выполнен клик в меню - добавляем запись в стек истории сеанса
			// Если была нажата кнопка назад/вперед, добавлять записи в историю не надо
			
			if(addToHistory == true) {
				// Добавляем запись в историю, используя pushState
				window.history.pushState({href : href, target : target}, null, href);
			}
		});
		
	});
	
	window.addEventListener('popstate', function(event) {
		//alert(JSON.stringify(event.state));
		$(document.body).trigger('fecss.url-history.get', [window.location.pathname, event.state.target, false]);
	}, false);
	