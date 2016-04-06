
$('.fecss-jscart').each(function(){
	
	var block = $(this);
	var flt = block.attr('data-jscart-filter') || 'default';
	
	var Cart = new jsCart({
		filter : flt,
	});
	
	block.on('rebuild', function(event){
		block.find('.jscart-item').each(function(index){
			
			var item = $(this);
			
			var product = item.attr('data-jscart-product');
			var taste = item.attr('data-jscart-taste');
			//var cost = item.attr('data-jscart-cost');
			//var amount = item.attr('data-jscart-amount');
			
			var c_item = Cart.getItem(product, taste);
			item.find('input.jscart-item-amount').attr('value', parseInt(c_item.amount));
			item.find('div.jscart-item-amount, span.jscart-item-amount, a.jscart-item-amount').html(parseInt(c_item.amount));
			
			var result = Cart.calculate();
			block.attr('data-jscart-sum', result.sum).find('.jscart-sum').html(result.sum);
			block.find('.jscart-product').html(result.product);
			block.find('.jscart-amount').html(result.amount);
		});
	});
	block.trigger('rebuild');
	
	block.on('clear', function(event){
		Cart.clear();
		block.trigger('rebuild');
	});
	
	block.on('create-order', function(event){
		Cart.saveCart(function(profile, cart){
			
			var order = {
				profile : profile,
				cart : cart,
			};
			
			$.getJSON('/json/_fecss-jscart/create-order.json', function(data){
				
				var neworder = data;//JSON.parse(data);
				Cart.saveOrder(neworder);
				
				Cart.clear();
				block.trigger('rebuild');
			});
			
		})
	});
	
	
	
	block.find('.jscart-item .jscart-add-btn').on('click.jscart', function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		var product = btn.attr('data-jscart-product');
		var taste = btn.attr('data-jscart-taste');
		var cost = btn.attr('data-jscart-cost');
		var amount = btn.attr('data-jscart-amount');
		
		if(product == '' || typeof product == 'underfined' || product == null) {
			product = btn.closest('.jscart-item').attr('data-jscart-product');
		}
		if(taste == '' || typeof taste == 'underfined' || taste == null) {
			taste = btn.closest('.jscart-item').attr('data-jscart-taste');
		}
		if(cost == '' || typeof cost == 'underfined' || cost == null) {
			cost = btn.closest('.jscart-item').attr('data-jscart-cost');
		}
		if(amount == '' || typeof amount == 'underfined' || amount == null || amount == 0) {
			amount = btn.closest('.jscart-item').attr('data-jscart-amount');
		}
		
		Cart.add(product, taste, cost, parseInt(amount));
		console.log('product ' + product + ' added to cart');
		block.trigger('rebuild');
	});
	
	block.find('.jscart-item .jscart-remove-btn').on('click.jscart', function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		var product = btn.attr('data-jscart-product');
		var taste = btn.attr('data-jscart-taste');
		var cost = btn.attr('data-jscart-cost');
		var amount = btn.attr('data-jscart-amount');
		
		if(product == '' || typeof product == 'underfined' || product == null) {
			product = btn.closest('.jscart-item').attr('data-jscart-product');
		}
		if(taste == '' || typeof taste == 'underfined' || taste == null) {
			taste = btn.closest('.jscart-item').attr('data-jscart-taste');
		}
		if(cost == '' || typeof cost == 'underfined' || cost == null) {
			cost = btn.closest('.jscart-item').attr('data-jscart-cost');
		}
		if(amount == '' || typeof amount == 'underfined' || amount == null || amount == 0) {
			amount = btn.closest('.jscart-item').attr('data-jscart-amount');
		}
		
		Cart.remove(product, taste, parseInt(amount));
		console.log('product ' + product + ' removed from cart');
		block.trigger('rebuild');
	});
	
	block.find('.jscart-clear-btn').on('click.jscart', function(event){
		event.preventDefault();
		block.trigger('clear');
	});
	
	block.find('.jscart-create-order').on('click.jscart', function(event){
		event.preventDefault();
		block.trigger('create-order');
	});
	
})

