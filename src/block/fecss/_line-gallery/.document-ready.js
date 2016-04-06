
	$('.line-gallery').each(function(index){
		
		var block = $(this);
		
		//var arrow_block = block.find('.arrow-block');

		block.on('click.line-gallery.right', '.btn-arrow.right', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				vis.eq(-1).next('.item').fadeIn('fast');
			} else {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				block.find('.img-block .item').eq(0).fadeIn('fast');
			}
		});
		block.on('click.line-gallery.left', '.btn-arrow.left', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(-1).hide();
				imgs.eq(-1).insertBefore(vis.eq(0)).fadeIn('fast');
			} else {
				vis.eq(0).hide();
				block.find('.img-block .item').eq(-1).insertBefore(block.find('.img-block .item').eq(0)).fadeIn('fast');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
	});
	