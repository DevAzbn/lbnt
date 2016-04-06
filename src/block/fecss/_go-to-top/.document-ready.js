
/*
start .got-to-top document-ready
*/

$(document.ready).on('click.fecss.go-to-top', '.go-to-top', function(event){
	event.preventDefault();
	
	$('html, body').animate({
		scrollTop : 0
	}, 777);
});

/*
end .got-to-top document-ready
*/
