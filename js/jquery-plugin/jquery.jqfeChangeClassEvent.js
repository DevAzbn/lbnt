// jquery-плагин-заготовка
(function($){
	
	var originalAddClassMethod = jQuery.fn.addClass;
	var originalRemoveClassMethod = jQuery.fn.removeClass;
	var originalToggleClassMethod = jQuery.fn.toggleClass;
	
	$.fn.addClass = function(){
		var result = originalAddClassMethod.apply(this, arguments);
		$(this).trigger('changeClass');
		console.log('changeClass add');
		return result;
	}
	
	$.fn.removeClass = function(){
		var result = originalRemoveClassMethod.apply(this, arguments);
		$(this).trigger('changeClass');
		console.log('changeClass remove');
		return result;
	}
	
	$.fn.toggleClass = function(){
		var result = originalToggleClassMethod.apply(this, arguments);
		$(this).trigger('changeClass');
		console.log('changeClass toggle');
		return result;
	}
	
})(jQuery);