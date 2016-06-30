
$(function(){
	
	$(document.body).on('click.fecss.b-project-filters.type-filters.a', '.b-project-filters .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var cat_flt = btn.attr('data-cat-flt') || 0;
		
		$('.b-project-filters .type-filters a').removeClass('active');
		btn.addClass('active');
		
		$('.b-project-list .project-cont').hide();
		if(cat_flt) {
			$('.b-project-list .project-cont[data-cat-flt="' + cat_flt + '"]').fadeIn('fast');
		} else {
			$('.b-project-list .project-cont').fadeIn('fast');
		}
		
	});
	
});
