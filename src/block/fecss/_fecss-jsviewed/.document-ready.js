
$('.fecss-jsviewed').each(function(){
	
	var block = $(this);
	var flt = block.attr('data-jsviewed-filter') || 'default';
	var tpl = block.html();
	
	var Viewed = new jsViewed({
		filter : flt,
	});
	
	block.on('rebuild', function(event){
		block.empty();
		
		var vwd = Viewed.getAll();
		//console.log(vwd.length);
		if(vwd != null) {
			for(var k in vwd) {
				var item = vwd[k];
				
				var html = tpl;
				
				for(var _k in item) {
					html = html.replace(new RegExp('%' + _k + '%','ig'), item[_k]);
				}
				
				var div = $('<div/>',{
					html : html,
				});
				div.appendTo(block);
			}
		}
	});
	block.trigger('rebuild');
	
	block.on('create-view', {}, function(event, data){
		Viewed.add(data);
		console.log('.fecss-jsviewed[data-jsviewed-filter="' + flt + '"] create-view');
	});
	
	block.on('clear', function(event){
		Viewed.clear();
		block.trigger('rebuild');
	});
	
	block.find('.jsviewed-clear-btn').on('click.jsviewed', function(event){
		event.preventDefault();
		block.trigger('clear');
	});
	
	(function(){
		block.trigger('create-view', [{
			id : new Date().getTime(),//1456862349352,//
			title : 'some test',
		}]);
	})();
	
})

