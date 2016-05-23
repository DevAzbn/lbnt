
	
	$(function(){
		
		if(screenJS.isMD() || screenJS.isLG()) {
			
			$('.b-project-list .project-cont').css({
				height : $(window).outerHeight(true),
			});
			
		}
		
	});
