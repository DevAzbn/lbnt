$(window).load(function(event){
	$('.page-loader').removeClass('active');
});

$(document.body).on('click.fecss.page-loader.close-loader', '.page-loader .close-loader', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.page-loader.close-loader');
	
	$('.page-loader').removeClass('active');
});