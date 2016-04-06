
$(document.body).on('fecss.changeDOM',		'.fecss-change-dom', {}, function(event, _event) {
	console.log('.fecss-change-dom trigger:fecss.changeDOM');
});

$(document.body).on('DOMSubtreeModified',		'.fecss-change-dom', {}, function(event, _event) {
	$(this).trigger('fecss.changeDOM');
});
