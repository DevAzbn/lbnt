
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
