
$(function(){
	
	if($('.owl-carousel').size()) {
		
		$('.owl-carousel').owlCarousel({
			loop:true,
			margin:0,
			//autoWidth:true,
			items:4,
			animateIn:true,
			animateOut: true,
			autoplay:true,
			autoplayTimeout:3000,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
					nav:true,
				},
				768:{
					items:2,
					nav:false,
				},
				992:{
					items:3,
					nav:false,
					loop:false,
				},
				1200:{
					items:4,
					nav:false,
					loop:false,
				},
			}
		});
		
	}
	
})