
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
