	
	$(document.body).on('click.fecss.url-history', '.url-history', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var href = btn.attr('href');
		var target = btn.attr('data-target');
		
		if(target && typeof target != 'undefined' && target != 'undefined') {
			//href = target;
		} else {
			target = 'title:title, body:body';
		}
		
		var addToHistory = true;
		
		$(document.body).trigger('fecss.url-history.get', [href, target, addToHistory]);
	});
	