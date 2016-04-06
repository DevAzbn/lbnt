
$('.fecss-jscacher').each(function(){
	
	var block = $(this);
	
	var flt = block.attr('data-jscacher-filter') || 'default';
	var ttl = parseInt(block.attr('data-jscacher-ttl')) || 60000;
	
	block.attr('data-jscacher-cached', false);
	
	var Cacher = new jsCacher({
		filter : flt,
		ttl : ttl,
	});
	
	block.on('cacher-clear', function(event){
		block.attr('data-jscacher-cached', false);
		Cacher.clear();
	});
	
	block.on('cacher-cache', function(event){
		block.attr('data-jscacher-cached', false);
		Cacher.cache(block.html());
		block.attr('data-jscacher-cached', true);
		console.log('.fecss-jscacher[data-jscacher-filter="' + flt + '"] cacher-cache');
	});
	
	block.on('cacher-load', function(event){
		var cache = Cacher.load();
		block.html(cache.content).attr('data-jscacher-cached', true);
		console.log('.fecss-jscacher[data-jscacher-filter="' + flt + '"] cacher-load');
	});
	
	block.on('cacher-check', function(event){
		var cache = Cacher.load();
		if(cache.need_update) {
			block.trigger('cacher-cache');
		} else {
			block.trigger('cacher-load');
		}
	}).trigger('cacher-check');
	
})

