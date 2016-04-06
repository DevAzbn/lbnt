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