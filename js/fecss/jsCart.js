var jsCart = function(param_obj) {
	'use strict';
	
	var ctrl = this;
	
	if(typeof param_obj == 'undefined' || param_obj == null) {
		param_obj = {
			filter : 'filter',
		};
	}
	
	/* ----- параметры для работы корзины ----- */
	var param = {
		ls : {
			cart		:		'__jscart_cart_' + param_obj.filter,
			order		:		'__jscart_order_' + param_obj.filter,
			product		:		'__jscart_product_' + param_obj.filter,
			profile		:		'__jscart_profile_' + param_obj.filter,
		},
	};
	
	
	/* ----- движок работы с локальным хранилищем ----- */
	ctrl.ls = new jsLocalStorage();
	
	
	/*
	item = {
		amount : 0,
		cost : 0,
	}
	*/
	/* ----- добавление элементов в позицию в корзине ----- */
	ctrl.add = function(id, taste, cost, amount) {
		var cart = ctrl.ls.s2obj(param.ls.cart);
		
		if(cart != null) {
			
		} else {
			cart = {};
		}
		if(typeof cart[id] !== 'undefined' && cart[id] != null) {
			var product = cart[id];
			if(typeof product[taste] !== 'undefined' && product[taste] != null) {
				var item = product[taste];
				item.amount = parseInt(item.amount) + parseInt(amount);
				item.cost = cost;
			} else {
				product[taste] = {
					amount : amount,
					cost : cost,
				};
			}
		} else {
			cart[id] = {
				
			};
			cart[id][taste] = {
				amount : amount,
				cost : cost,
			};
		}
		
		ctrl.ls.obj2s(param.ls.cart, cart);
	};
	
	
	/* ----- удаление элементов из позиции в корзине ----- */
	ctrl.remove = function(id, taste, amount) {
		var cart = ctrl.ls.s2obj(param.ls.cart);
		
		if(cart != null) {
			
		} else {
			cart = {};
		}
		if(cart != null) {
			if(typeof cart[id] !== 'undefined' && cart[id] != null) {
				var product = cart[id];
				if(typeof product[taste] !== 'undefined' && product[taste] != null) {
					var item = product[taste];
					item.amount = parseInt(item.amount) - parseInt(amount);
					if(item.amount < 0 || item.amount == 0) {
						item.amount = 0;
						delete cart[id];
					}
				}
			}
		} else {
			cart = {};
		}
		
		ctrl.ls.obj2s(param.ls.cart, cart);
	};
	
	
	/* ----- добавление одного элемента позиции в корзине ----- */
	ctrl.addOne = function(id, taste, cost) {
		ctrl.add(id, taste, cost, 1);
	};
	
	
	/* ----- удаление одного элемента из позиции в корзине ----- */
	ctrl.removeOne = function(id, taste) {
		ctrl.remove(id, taste, 1);
	};
	
	
	/* ----- получение информации о товаре в корзине ----- */
	ctrl.getItem = function(id, taste) {
		var cart = ctrl.ls.s2obj(param.ls.cart);
		var item = {
			amount : 0,
			cost : 0,
		};
		
		if(cart != null) {
			if(typeof cart[id] !== 'undefined' && cart[id] != null) {
				var product = cart[id];
				if(typeof product[taste] !== 'undefined' && product[taste] != null) {
					item = product[taste];
				}
			} else {
				
			}
		} else {
			
		}
		return item;
	};
	
	
	/* ----- подсчет полной стоимости ----- */
	ctrl.calculate = function() {
		var result = {
			sum : 0,
			product : 0,
			amount : 0,
		};
		
		var cart = ctrl.ls.s2obj(param.ls.cart);
		
		if(cart != null) {
			
		} else {
			cart = {};
		}
		
		for(var p_key in cart) {
			var product = cart[p_key];
			for(var t_key in product) {
				var taste = product[t_key];
				result.product++;
				result.amount = result.amount + taste.amount;
				result.sum = result.sum + (taste.amount * taste.cost);
			}
		}
		
		return result;
	};
	
	
	/* ----- очистка корзины, удаляет все из корзины ----- */
	ctrl.clear = function() {
		ctrl.ls.obj2s(param.ls.cart, {});
	};
	
	
	/* ----- сохранение корзины (колбек обработки данных из локального хранилища) ----- */
	ctrl.saveCart = function(cb) {
		cb(ctrl.ls.s2obj(param.ls.profile), ctrl.ls.s2obj(param.ls.cart));
	};
	
	
	/* ----- сохранение инфо о заказе - ID и проч. ----- */
	ctrl.saveOrder = function(neworder) {
		var order = ctrl.ls.s2obj(param.ls.order);
		if(order == null) {
			order = [];
		}
		order.push(neworder);
		ctrl.ls.obj2s(param.ls.order, order);
	};
	
	
	/* ----- сохранение данных пользователя, используется для заказа ----- */
	ctrl.setProfile = function(obj) {
		ctrl.ls.obj2s(param.ls.profile, obj);
	};
	
	
	/* ----- получение данных пользователя, используется для заказа ----- */
	ctrl.getProfile = function(obj) {
		return ctrl.ls.s2obj(param.ls.profile);
	};
	
};