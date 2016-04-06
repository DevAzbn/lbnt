
$(document.body).on('click.fecss.can-close.close-btn', '.can-close .close-btn', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.can-close.close-btn');
	
	$(this).closest('.can-close').removeClass('active');
});
