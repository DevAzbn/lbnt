// jquery-плагин-заготовка
(function($){
	
	var defaults={
		speed:2000,
		diff:0
		};
	//var options;
	
	$.fn.jqfeScrollTo=function(params){
		
		var options=$.extend({},defaults,params);
		
		return this.each(function(){
			
			// тут код
			// доступ к объекту через $(this)
			var el=$(this);
			/*
			$('#go2top-btn').animate({
				opacity: 0
				}, 300);
			*/
			$('html, body').animate({
				scrollTop: (el.offset().top + options.diff)
				}, options.speed);
			
			});
		};
	
})(jQuery);