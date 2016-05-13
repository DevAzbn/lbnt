
	$('.line-gallery').each(function(index){
		
		var block = $(this);
		var body = $('body').eq(0);
		var c = 3;
		
		if(body.hasClass('window-width-xs')) {
			c = block.attr('data-xs-vis') || 1;
		} else
		if(body.hasClass('window-width-sm')) {
			c = block.attr('data-sm-vis') || 2;
		} else
		if(body.hasClass('window-width-md')) {
			c = block.attr('data-md-vis') || 3;
		} else
		if(body.hasClass('window-width-lg')) {
			c = block.attr('data-lg-vis') || 3;
		}
		
		var imgs = block.find('.img-block .item');//.hide();
		for(var i = (c); i < imgs.size(); i++) {
			imgs.eq(i).hide();
		}
		for(var i = 0; i < c; i++) {
			if(imgs.eq(i).is(':hidden')) {
				imgs.eq(i).fadeIn('fast');
			}
		}
		
	});
	