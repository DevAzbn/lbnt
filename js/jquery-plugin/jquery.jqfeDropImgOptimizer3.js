/*
jquery-плагин
ajax-загрузки файлов на сервер
*/ 
(function($){
	
	var defaults = {
		plugin:{
			name : 'jqfeDropImgOptimizer3',
			version : '0.3',
			mod_date : '18/03/2016 23:47',
		},
		strings:{
			error_no_filereader : 'Не поддерживается браузером',
		},
		//action:'/',
		//name:'filename',
		callback : function(str){alert(str);}
	};
	
	var modifyAndUpload = function(el, file, options, event) {
		
		var reader = new FileReader();
		
		var callback = options.callback;
		
		if (!file.type.match(/image.*/)) {
			return true;
		}
		
		reader.onload = function(event) {
			
			var img = document.createElement('img');
			img.src = event.target.result;
			
			img.onload = function() {
				try {
					
					var real_w = img.width;
					var real_h = img.height;
					var w = 1;
					var h = 1;
					
					if(real_w > options.max_width || real_h > options.max_height) {
						
						var real_prop = real_w / real_h;
						var max_prop = options.max_width / options.max_height;
						
						if(real_prop > max_prop) {
							w = options.max_width;
							h = Math.round(w / real_prop);
							} else {
								h = options.max_height;
								w = Math.round(h * real_prop);
								}
						
					} else {
						
						w = real_w;
						h = real_h;
						
					}
					
					var canvas = document.createElement('canvas');
					canvas.setAttribute('width', w);
					canvas.setAttribute('height', h);
					var ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, w, h);
					
					el.attr('data-loaded-images', (parseInt(el.attr('data-loaded-images')) + 1 || 1));
					callback({
						dataURL : canvas.toDataURL('image/png'),
						file : file,
					});
					
				} catch (err) {
					console.error(err.code);
				}
			};
			
		};
		
		reader.onerror = function(event) {
			console.error('Error: ' + event.target.error.code);
		};
		
		reader.readAsDataURL(file);
		
	};
	
	var selectFilesAndModify = function(el, files, options, event) {
		
		var reader = new FileReader();
		
		var callback = options.callback;
		
		$.each(files, function(i, file) {
			
			if (!file.type.match(/image.*/)) {
				return true;
			}
			
			modifyAndUpload(el, file, options, event)
			
		});
		
	}
	
	var methods = {
		
		init : function(params){
			
			var options = $.extend({}, defaults, params);
			//this.data(defaults.plugin.name, options);
			
			var el = $(this);
			
			el.data(defaults.plugin.name, options);
			//el.data(defaults.plugin.name+'-counter', 0);
			
			if (typeof(window.FileReader) == 'undefined') {
				
				el.html(defaults.strings.error_no_filereader);
			
			}
			
			var uploadfile = $('<input/>', {
				name : options.name,
				type : 'file',
				//multiple : options.multiple,
				css :{
					'display':'none'
				},
				//id : defaults.plugin.name+'-uploadfile',
			})
				.appendTo($('body'))
				
				.on('change.' + defaults.plugin.name, null, {}, function(event){
					event.preventDefault();
					
					selectFilesAndModify(el, this.files, options, event);
					uploadfile.unbind('change.' + defaults.plugin.name);
					uploadfile.remove();
					
				});
			
			if(options.multiple != '' && options.multiple) {
				uploadfile.attr('multiple', 'multiple');
			}
			
			uploadfile.trigger('click.' + defaults.plugin.name);
				
			return this;
		}
		
	};
	
	$.fn.jqfeDropImgOptimizer3 = function(method){
		if(methods[method]) {
			
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		
		} else if(typeof method==='object' || !method) {
			
			return methods.init.apply(this,arguments);
		
		} else {
			
			$.error('Метод '+method+' в плагине не найден!');
		
		}
	};
	
})(jQuery);