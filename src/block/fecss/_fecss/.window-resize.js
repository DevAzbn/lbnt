
/*
start .fecss window-resize
*/

	$(
		function() {
			
			var wsize = {
				xs : {
					min : 0,
					max : 768,
				},
				sm : {
					min : 767,
					max : 992,
				},
				md : {
					min : 991,
					max : 1200,
				},
				lg : {
					min : 1199,
					max : 10000,
				},
			};
			
			var hsize = {
				xs : {
					min : 0,
					max : 361,
				},
				sm : {
					min : 360,
					max : 769,
				},
				md : {
					min : 768,
					max : 961,
				},
				lg : {
					min : 960,
					max : 10000,
				},
			};
			
			var wcl = 'window-width';
			var hcl = 'window-height';
			
			var w = $(window).outerWidth(true);
			var h = $(window).outerHeight(true);
			
			var body = $('html body').eq(0);
			
			/* ----- расчет ширины ----- */
			
			if(w < wsize.xs.max) {
				if(body.hasClass('window-width-sm')) {
					body.removeClass('window-width-sm');
				}
				if(body.hasClass('window-width-md')) {
					body.removeClass('window-width-md');
				}
				if(body.hasClass('window-width-lg')) {
					body.removeClass('window-width-lg');
				}
				wcl = 'window-width-xs';
			}
			
			if(w > wsize.sm.min && w < wsize.sm.max) {
				if(body.hasClass('window-width-xs')) {
					body.removeClass('window-width-xs');
				}
				if(body.hasClass('window-width-md')) {
					body.removeClass('window-width-md');
				}
				if(body.hasClass('window-width-lg')) {
					body.removeClass('window-width-lg');
				}
				wcl = 'window-width-sm';
			}
			
			if(w > wsize.md.min && w < wsize.md.max) {
				if(body.hasClass('window-width-xs')) {
					body.removeClass('window-width-xs');
				}
				if(body.hasClass('window-width-sm')) {
					body.removeClass('window-width-sm');
				}
				if(body.hasClass('window-width-lg')) {
					body.removeClass('window-width-lg');
				}
				wcl = 'window-width-md';
			}
			
			if(w > wsize.lg.min) {
				if(body.hasClass('window-width-xs')) {
					body.removeClass('window-width-xs');
				}
				if(body.hasClass('window-width-sm')) {
					body.removeClass('window-width-sm');
				}
				if(body.hasClass('window-width-md')) {
					body.removeClass('window-width-md');
				}
				wcl = 'window-width-lg';
			}
			
			/* ----- /расчет ширины ----- */
			
			
			/* ----- расчет высоты ----- */
			
			if(h < hsize.xs.max) {
				if(body.hasClass('window-height-sm')) {
					body.removeClass('window-height-sm');
				}
				if(body.hasClass('window-height-md')) {
					body.removeClass('window-height-md');
				}
				if(body.hasClass('window-height-lg')) {
					body.removeClass('window-height-lg');
				}
				hcl = 'window-height-xs';
			}
			
			if(h > hsize.sm.min && h < hsize.sm.max) {
				if(body.hasClass('window-height-xs')) {
					body.removeClass('window-height-xs');
				}
				if(body.hasClass('window-height-md')) {
					body.removeClass('window-height-md');
				}
				if(body.hasClass('window-height-lg')) {
					body.removeClass('window-height-lg');
				}
				hcl = 'window-height-sm';
			}
			
			if(h > hsize.md.min && h < hsize.md.max) {
				if(body.hasClass('window-height-xs')) {
					body.removeClass('window-height-xs');
				}
				if(body.hasClass('window-height-sm')) {
					body.removeClass('window-height-sm');
				}
				if(body.hasClass('window-height-lg')) {
					body.removeClass('window-height-lg');
				}
				hcl = 'window-height-md';
			}
			
			if(h > hsize.lg.min) {
				if(body.hasClass('window-height-xs')) {
					body.removeClass('window-height-xs');
				}
				if(body.hasClass('window-height-sm')) {
					body.removeClass('window-height-sm');
				}
				if(body.hasClass('window-height-md')) {
					body.removeClass('window-height-md');
				}
				hcl = 'window-height-lg';
			}
			
			/* ----- /расчет высоты ----- */
			
			
			$('html body').eq(0).addClass(wcl).addClass(hcl);
		}
	);

/*
end .fecss window-resize
*/
