
	
	$(function(){
		
		if(screenJS.isMD() || screenJS.isLG()) {
			
			$('.b-news-list .project-cont').css({
				height : $(window).outerHeight(true),
			});
			
		}
		
	});
