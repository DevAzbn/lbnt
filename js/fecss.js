var fecss = {
	
	focused : {},
	
	genGuideGrid:function(step){
		//step = step || 20;
		$('.fe-dbg .guide-line').empty().remove();
		var x = 0, y = 0;
		while(x < screen.width) {
			$('<div/>',{
				class:'guide-line v-line',
			})
			.attr('data-left', x)
			.appendTo($('body.fe-dbg'));
			x = x + step;
		}
		while(y < screen.height) {
			$('<div/>',{
				class:'guide-line h-line',
			})
			.attr('data-top', y)
			.appendTo($('body.fe-dbg'));
			y = y + step;
		}
		this.rebuildGuideGrid();
	},
	
	rebuildGuideGrid:function() {
		$('.fe-dbg .guide-line.h-line').each(function(index){
			var top_val = $(this).attr('data-top');
			if(top_val != undefined) {
				$(this).css({top:top_val+'px'});
			} else {
				$(this).empty().remove();
			}
		});
		
		$('.fe-dbg .guide-line.v-line').each(function(index){
			var left_val = $(this).attr('data-left');
			if(left_val != undefined) {
				$(this).css({left:left_val+'px'});
			} else {
				$(this).empty().remove();
			}
		});
	},
	
	ajaxLoading:function() {
		
	},
	
	filelist:function(base, path) {
		
		var fl = $('.filelist').eq(0);
		
		var item = $('<div/>',{
			'class' : 'item ',
			'data-path' : base.path,
		});
		var name;
		if(base.is_file == 1) {
			name = $('<a/>',{
				'class' : 'name ',
				'html' : base.name,
				'href' : '/pagebuilder/build?file=__pagebuilder/page/code-editable.html#' + base.path,
				'target' : '_blank',				
			});
		} else {
			name = $('<div/>',{
				'class' : 'name ',
				'html' : base.name,
			});
		}
		name.appendTo(item);
		
		item.appendTo($('[data-path="' + path + '"]'));
		
		if(base.is_file == 0) {
			for(var i in base.item_list) {
				fecss.filelist(base.item_list[i], base.path);
			}
		}
		
		/*
		fl.html(fl.html() + '<div class="item " >');
		if(base.is_file == 1) {
			fl.append('<div class="name" >' + base.name + '</div>');
		} else {
			fl.append('<div class="name" >' + base.name + '</div>');
			fl.html(fl.html() + '<div class="item-list " >');
			for(var i in base.item_list) {
				fecss.filelist(base.item_list[i]);
				//console.log(base.item_list[i]);
			}
			fl.html(fl.html() + '</div>');
		}
		fl.html(fl.html() + '</div>');
		*/
	}
	
}

$(document).ready(function() {
	
	//fecss.rebuildGuideGrid();
	
	$('.fecss .image.box.contain').each(function(index){
		var img = $(this).attr('data-bgimg');
		if(img != undefined) {
			$(this).css({'background-image':'url('+img+')'});
		} else {
			
		}
	});
	
	$('.fecss .image.box.cover').each(function(index){
		var img = $(this).attr('data-bgimg');
		if(img != undefined) {
			$(this).css({'background-image':'url('+img+')'});
		} else {
			
		}
	});
	
	/*
	$('.image.flip.filter.grayscale').hover(
		function(){
			$(this).addClass('not-filter');
		},
		function(){
			$(this).removeClass('not-filter');
		}
	);
	*/
	
	
	/*
	$(document.body).on(
		//'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error',
		'dblclick',
		'.autosave',
		function(event){
			
		}
	);
	*/
	
	$(document.body).on('dblclick', '*', function(event){
		event.stopPropagation();
		
		fecss.focused = $(this);
	})
	
	$(document.body).bind('keydown.fecss', function(event){
		event.stopPropagation();
		
		
		if(event.ctrlKey && event.which==65) { // Ctrl + A
			event.preventDefault();
			
			$('.autosave').each(function(index){
				var el = $(this);
				//el.html(LS.get(el.attr('class')));
				
				$.get(
					'/pagebuilder/build',
					{
						file : '/__pagebuilder/savehtml/' + el.attr('class') + '.html',
					},
					function(data) {
						if(data != '') {
							el.html(data);
						}
						console.log('action/pagebuilder');
					}
				);
			});
		}
		
		if(event.ctrlKey && event.which==66) { // Ctrl + B
			event.preventDefault();
			
			var html = '&nbsp;';
			
			$('<div/>',{
				class : prompt('Введите классы для блока', ''),
				html : html,
			}).appendTo(fecss.focused);
		}
		
		if(event.ctrlKey && event.which==68) { // Ctrl + D
			event.preventDefault();
			
			$.getJSON('/pagebuilder/catalog', function(data){
				//console.log(data['/'].name);
				fecss.filelist(data['/'], '.');
			})
		}
		
		if(event.ctrlKey && event.which==70) { // Ctrl + F
			event.preventDefault();
			
			var html = '&nbsp;';
			
			if(event.shiftKey) {
				html = '<div class="adaptive-block grid grid-12" ><div class="grid-row" ><div class="clmn-12 clmn-xs-12 clmn-sm-12 clmn-md-12 clmn-lg-12 " >&nbsp;</div><div class="clear" ></div></div></div>';
			}
			
			$('<div/>',{
				class : 'fluid-block ' + prompt('Введите дополнительные классы для блока', 'autosave '),
				html : html,
			}).insertAfter($('body > .fluid-block').eq(-1));
		}
		
		if(event.ctrlKey && event.which==71) { // Ctrl + G
			event.preventDefault();
			fecss.genGuideGrid(20);
		}
		
		if(event.ctrlKey && event.which==76 && fecss.focused) { // Ctrl + L
			event.preventDefault();
			
			var html = '&nbsp;';
			
			if(event.shiftKey) {
				html = 'fecss/text/multiphrase/.html';
			} else {
				html = 'fecss/text/phrase/.html';
			}
			
			$.get(
				'/pagebuilder/build',
				{
					file : html,
				},
				function(data) {
					fecss.focused.html(data);
				}
			);
		}
		
		if(event.ctrlKey && event.which==83) { // Ctrl + S
			event.preventDefault();
			
			$('.autosave').each(function(index){
				
				var el = $(this);
				
				//LS.set(el.attr('class'), el.html());
				
				$.post(
					'/pagebuilder/savehtml',
					{
						name : el.attr('class'),
						value : el.html(),
					},
					function(data) {
						console.log(data, 'action/savehtml');
					}
				);
				
			});
			
		}
		
		//console.log(event.which);
		/*
		R	82
		Q	81
		E	69
		D	68
		A	65
		S	83
		Z	90
		X	88
		C	67
		G	71
		W	87
		F	70
		L	76
		B	66
		H	72
		 	32
		esc 27
		*/
		
	});

	$(document.body).on('click', '.preview-frame-btn', function(event){
		$('.preview-frame').attr('src', '/pagebuilder/block/build?file=' + $('.code-name').eq(0).val());
	});
	
});