/*
$('.fecss-imguploader').jqfeDropImgOptimizer3({
	max_width:800,
	max_height:800,
	callback:function(dataURL){		
		$(document.body).append('<img src="' + dataURL + '" />');
	}
});
*/
$(document.body).on('click.fecss.imgresizer', '.fecss-imgresizer', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.imgresizer');
	
	var btn = $(this);
	//var href = btn.attr('href');
	var max_w = parseInt(btn.attr('data-max-width')) || 1000;
	var max_h = parseInt(btn.attr('data-max-height')) || 1000;
	
	btn.jqfeDropImgOptimizer3({
		max_width : max_w,
		max_height : max_h,
		'multiple' : 'multiple',
		callback:function(result){ // {result:, file:}
			console.log((result.file));
			$(document.body).append('<img src="' + result.dataURL + '" title="' + result.file.name + '" />');
		}
	})

});