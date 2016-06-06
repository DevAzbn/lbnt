$(window).load(function(event){
	
	if($('.page-loader').attr('data-page-loader-next')) {
		$('.page-loader').removeClass('active');
	} else {
		$('.page-loader').attr('data-page-loader-next', true);
	}
	
});

$(document.body).on('click.fecss.page-loader.close-loader', '.page-loader .close-loader', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.page-loader.close-loader');
	
	$('.page-loader').removeClass('active');
});

$(function(){
	
	setTimeout(function(){
		if($('.page-loader').attr('data-page-loader-next')) {
			$('.page-loader').removeClass('active');
		} else {
			$('.page-loader').attr('data-page-loader-next', true);
		}
	}, 
	2500);
	
});