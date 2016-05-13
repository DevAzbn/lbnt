'use strict';

window.onerror = function(error, url, lineNumber, column, errorObj) {
	console.log('Error FECSS: ' + url + ':' + lineNumber + ':' + column + ': ' + JSON.stringify(error) + '\n' + JSON.stringify(errorObj));
	return;
}

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

function fecss_ScreenJS() {
	
	var ctrl = this;
	
	ctrl.screen = {
		w : 0,
		h : 0,
		type : 'xs',//sm,md,lg
		orientation : 'portrait',//landscape
	};
	
	ctrl.__resizefunctions = {
		'xs' : {
			'default' : [],
			'portrait' : [],
			'landscape' : [],
		},
		'sm' : {
			'default' : [],
			'portrait' : [],
			'landscape' : [],
		},
		'md' : {
			'default' : [],
			'portrait' : [],
			'landscape' : [],
		},
		'lg' : {
			'default' : [],
			'portrait' : [],
			'landscape' : [],
		},
	};
	
	ctrl.isXS = function() {
		return (ctrl.screen.w < 768);
	};
	
	ctrl.isSM = function() {
		return (ctrl.screen.w < 992 && ctrl.screen.w > 767);
	};
	
	ctrl.isMD = function() {
		return (ctrl.screen.w < 1200 && ctrl.screen.w > 991);
	};
	
	ctrl.isLG = function() {
		return (ctrl.screen.w > 1199);
	};
	
	ctrl.screenIs = function() {
		var result = 'noname';
		if(ctrl.isXS()) {
			result = 'xs';
		} else
		if(ctrl.isSM()) {
			result = 'sm';
		} else
		if(ctrl.isMD()) {
			result = 'md';
		} else
		if(ctrl.isLG()) {
			result = 'lg';
		}
		return result;
	};
	
	
	
	ctrl.isPortrait = function() {
		return (ctrl.screen.h > ctrl.screen.w);
	};
	
	ctrl.isLandscape = function() {
		return (ctrl.screen.w > ctrl.screen.h);
	};
	
	ctrl.orientationIs = function() {
		var result = 'noname';
		if(ctrl.isPortrait()) {
			result = 'portrait';
		} else
		if(ctrl.isLandscape()) {
			result = 'landscape';
		}
		return result;
	};
	
	ctrl.is = function(str) {
		return (str == ctrl.screenIs() || str == ctrl.orientationIs());
	};
	
	ctrl.onResize = function(scr, fnc) {
		if(scr.type) {
			var type = ctrl.__resizefunctions[scr.type];
			
			if(scr.orientation) {
				type[scr.orientation].push(fnc);
			} else {
				type.default.push(fnc);
			}
		}
	}
	
	ctrl.resizeCall = function(scr) {
		if(scr.type) {
			if(ctrl.__resizefunctions[scr.type].default) {
				for(var i = 0; i < ctrl.__resizefunctions[scr.type].default.length; i++) {
					var fnc = ctrl.__resizefunctions[scr.type].default[i];
					fnc(scr);
				}
			}
			if(ctrl.__resizefunctions[scr.type][scr.orientation]) {
				for(var i = 0; i < ctrl.__resizefunctions[scr.type][scr.orientation].length; i++) {
					var fnc = ctrl.__resizefunctions[scr.type][scr.orientation][i];
					fnc(scr);
				}
			}
		}
	}
	
	ctrl.setScreen = function() {
		ctrl.screen.w = $(window).outerWidth(true);
		ctrl.screen.h = $(window).outerHeight(true);
		ctrl.screen.type = ctrl.screenIs();
		ctrl.screen.orientation = ctrl.orientationIs();
		
		ctrl.resizeCall(ctrl.screen);
		console.log(ctrl.screen);
		
		return ctrl.screen;
	};
	
};

var screenJS = new fecss_ScreenJS();

$(window).on('resize', function(){
	screenJS.setScreen();
});

/*

screenJS.is(xs/sm/md/lg/portrait/landscape) - да/нет

screenJS.isXS() - да/нет
screenJS.isSM() - да/нет
screenJS.isMD() - да/нет
screenJS.isLG() - да/нет

screenJS.screenIs() - вернет xs/sm/md/lg

screenJS.isPortrait() - да/нет
screenJS.isLandscape() - да/нет

screenJS.orientationIs() - вернет portrait/landscape

//добавляет функцию, которая будет работать при смене на нужный размер и ориентацию экрана. Свойство type (xs/sm/md/lg) - обязательное
screenJS.onResize({type : 'lg',}, function(new_screen){
	
});
screenJS.onResize({type : 'xs', orientation : 'portrait'}, function(new_screen){
	
});


*/

/*! jQuery UI - v1.11.4 - 2016-02-28
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, draggable.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.11.4",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},

	uniqueId: (function() {
		var uuid = 0;

		return function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + ( ++uuid );
				}
			});
		};
	})(),

	removeUniqueId: function() {
		return this.each(function() {
			if ( /^ui-id-\d+$/.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /^(input|select|textarea|button|object)$/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}

// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	disableSelection: (function() {
		var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
		};
	})(),

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {
	add: function( module, option, set ) {
		var i,
			proto = $.ui[ module ].prototype;
		for ( i in set ) {
			proto.plugins[ i ] = proto.plugins[ i ] || [];
			proto.plugins[ i ].push( [ option, set[ i ] ] );
		}
	},
	call: function( instance, name, args, allowDisconnected ) {
		var i,
			set = instance.plugins[ name ];

		if ( !set ) {
			return;
		}

		if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
			return;
		}

		for ( i = 0; i < set.length; i++ ) {
			if ( instance.options[ set[ i ][ 0 ] ] ) {
				set[ i ][ 1 ].apply( instance.element, args );
			}
		}
	}
};


/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;


/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */


var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

var mouse = $.widget("ui.mouse", {
	version: "1.11.4",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("." + this.widgetName);
		if ( this._mouseMoveDelegate ) {
			this.document
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		this._mouseMoved = false;

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};

		this.document
			.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if ( this._mouseMoved ) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);

			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {
				return this._mouseUp( event );
			}
		}

		if ( event.which || event.button ) {
			this._mouseMoved = true;
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		this.document
			.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		mouseHandled = false;
		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});


/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */


$.widget("ui.draggable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function() {

		if ( this.options.helper === "original" ) {
			this._setPositionRelative();
		}
		if (this.options.addClasses){
			this.element.addClass("ui-draggable");
		}
		if (this.options.disabled){
			this.element.addClass("ui-draggable-disabled");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "handle" ) {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function() {
		if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
			this.destroyOnClear = true;
			return;
		}
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {
		var o = this.options;

		this._blurActiveElement( event );

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

		return true;

	},

	_blockFrames: function( selector ) {
		this.iframeBlocks = this.document.find( selector ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css( "position", "absolute" )
				.appendTo( iframe.parent() )
				.outerWidth( iframe.outerWidth() )
				.outerHeight( iframe.outerHeight() )
				.offset( iframe.offset() )[ 0 ];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function( event ) {
		var document = this.document[ 0 ];

		// Only need to blur if the event occurred on the draggable itself, see #10527
		if ( !this.handleElement.is( event.target ) ) {
			return;
		}

		// support: IE9
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {

			// Support: IE9, IE10
			// If the <body> is blurred, IE will switch windows, see #9520
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {

				// Blur any element that currently has focus, see #4261
				$( document.activeElement ).blur();
			}
		} catch ( error ) {}
	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css( "position" );
		this.scrollParent = this.helper.scrollParent( true );
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function() {
				return $( this ).css( "position" ) === "fixed";
			}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets( event );

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition( event, false );
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Reset helper's right/bottom css if they're set and set explicit width/height instead
		// as this prevents resizing of elements with right/bottom set (see #7772)
		this._normalizeRightBottom();

		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function( event ) {
		this.offset = {
			top: this.positionAbs.top - this.margins.top,
			left: this.positionAbs.left - this.margins.left,
			scroll: false,
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset()
		};

		this.offset.click = {
			left: event.pageX - this.offset.left,
			top: event.pageY - this.offset.top
		};
	},

	_mouseDrag: function(event, noPropagation) {
		// reset any necessary cached properties (see #5009)
		if ( this.hasFixedAncestor ) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition( event, true );
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if (this._trigger("drag", event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		this.helper[ 0 ].style.left = this.position.left + "px";
		this.helper[ 0 ].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
			dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function( event ) {
		this._unblockFrames();

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if ( this.handleElement.is( event.target ) ) {
			// The interaction is over; whether or not the click resulted in a drag, focus the element
			this.element.focus();
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {
		return this.options.handle ?
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
			true;
	},

	_setHandleClassName: function() {
		this.handleElement = this.options.handle ?
			this.element.find( this.options.handle ) : this.element;
		this.handleElement.addClass( "ui-draggable-handle" );
	},

	_removeHandleClassName: function() {
		this.handleElement.removeClass( "ui-draggable-handle" );
	},

	_createHelper: function(event) {

		var o = this.options,
			helperIsFunction = $.isFunction( o.helper ),
			helper = helperIsFunction ?
				$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
				( o.helper === "clone" ?
					this.element.clone().removeAttr( "id" ) :
					this.element );

		if (!helper.parents("body").length) {
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
		}

		// http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;

	},

	_setPositionRelative: function() {
		if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
			this.element[ 0 ].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = { left: +obj[0], top: +obj[1] || 0 };
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function( element ) {
		return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
			document = this.document[ 0 ];

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};

	},

	_getRelativeOffset: function() {
		if ( this.cssPosition !== "relative" ) {
			return { top: 0, left: 0 };
		}

		var p = this.element.position(),
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
			left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
		};

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"), 10) || 0),
			top: (parseInt(this.element.css("marginTop"), 10) || 0),
			right: (parseInt(this.element.css("marginRight"), 10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var isUserScrollable, c, ce,
			o = this.options,
			document = this.document[ 0 ];

		this.relativeContainer = null;

		if ( !o.containment ) {
			this.containment = null;
			return;
		}

		if ( o.containment === "window" ) {
			this.containment = [
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment === "document") {
			this.containment = [
				0,
				0,
				$( document ).width() - this.helperProportions.width - this.margins.left,
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment.constructor === Array ) {
			this.containment = o.containment;
			return;
		}

		if ( o.containment === "parent" ) {
			o.containment = this.helper[ 0 ].parentNode;
		}

		c = $( o.containment );
		ce = c[ 0 ];

		if ( !ce ) {
			return;
		}

		isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

		this.containment = [
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
			( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
			( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
		];
		this.relativeContainer = c;
	},

	_convertPositionTo: function(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
			)
		};

	},

	_generatePosition: function( event, constrainPosition ) {

		var containment, co, top, left,
			o = this.options,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
			pageX = event.pageX,
			pageY = event.pageY;

		// Cache the scroll
		if ( !scrollIsRootNode || !this.offset.scroll ) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		// If we are not dragging yet, we won't check for options
		if ( constrainPosition ) {
			if ( this.containment ) {
				if ( this.relativeContainer ){
					co = this.relativeContainer.offset();
					containment = [
						this.containment[ 0 ] + co.left,
						this.containment[ 1 ] + co.top,
						this.containment[ 2 ] + co.left,
						this.containment[ 3 ] + co.top
					];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

			if ( o.axis === "y" ) {
				pageX = this.originalPageX;
			}

			if ( o.axis === "x" ) {
				pageY = this.originalPageY;
			}
		}

		return {
			top: (
				pageY -																	// The absolute mouse position
				this.offset.click.top	-												// Click offset (relative to the element)
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
			),
			left: (
				pageX -																	// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if ( this.destroyOnClear ) {
			this.destroy();
		}
	},

	_normalizeRightBottom: function() {
		if ( this.options.axis !== "y" && this.helper.css( "right" ) !== "auto" ) {
			this.helper.width( this.helper.width() );
			this.helper.css( "right", "auto" );
		}
		if ( this.options.axis !== "x" && this.helper.css( "bottom" ) !== "auto" ) {
			this.helper.height( this.helper.height() );
			this.helper.css( "bottom", "auto" );
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function( type, event, ui ) {
		ui = ui || this._uiHash();
		$.ui.plugin.call( this, type, [ event, ui, this ], true );

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if ( /^(drag|start|stop)/.test( type ) ) {
			this.positionAbs = this._convertPositionTo( "absolute" );
			ui.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call( this, type, event, ui );
	},

	plugins: {},

	_uiHash: function() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add( "draggable", "connectToSortable", {
	start: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.sortables = [];
		$( draggable.options.connectToSortable ).each(function() {
			var sortable = $( this ).sortable( "instance" );

			if ( sortable && !sortable.options.disabled ) {
				draggable.sortables.push( sortable );

				// refreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each( draggable.sortables, function() {
			var sortable = this;

			if ( sortable.isOver ) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css( "position" ),
					top: sortable.placeholder.css( "top" ),
					left: sortable.placeholder.css( "left" )
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {
				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger( "deactivate", event, uiSortable );
			}
		});
	},
	drag: function( event, ui, draggable ) {
		$.each( draggable.sortables, function() {
			var innermostIntersecting = false,
				sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if ( sortable._intersectsWith( sortable.containerCache ) ) {
				innermostIntersecting = true;

				$.each( draggable.sortables, function() {
					// Copy over variables that sortable's _intersectsWith uses
					this.positionAbs = draggable.positionAbs;
					this.helperProportions = draggable.helperProportions;
					this.offset.click = draggable.offset.click;

					if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
						innermostIntersecting = false;
					}

					return innermostIntersecting;
				});
			}

			if ( innermostIntersecting ) {
				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if ( !sortable.isOver ) {
					sortable.isOver = 1;

					// Store draggable's parent in case we need to reappend to it later.
					draggable._parent = ui.helper.parent();

					sortable.currentItem = ui.helper
						.appendTo( sortable.element )
						.data( "ui-sortable-item", true );

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function() {
						return ui.helper[ 0 ];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[ 0 ];
					sortable._mouseCapture( event, true );
					sortable._mouseStart( event, true, true );

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left -
						sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top -
						sortable.offset.parent.top;

					draggable._trigger( "toSortable", event );

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});

					// hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if ( sortable.currentItem ) {
					sortable._mouseDrag( event );
					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui.position = sortable.position;
				}
			} else {
				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if ( sortable.isOver ) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger( "out", event, sortable._uiHash( sortable ) );
					sortable._mouseStop( event, true );

					// restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if ( sortable.placeholder ) {
						sortable.placeholder.remove();
					}

					// Restore and recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways. (#8809, #10669)
					ui.helper.appendTo( draggable._parent );
					draggable._refreshOffsets( event );
					ui.position = draggable._generatePosition( event, true );

					draggable._trigger( "fromSortable", event );

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function( event, ui, instance ) {
		var t = $( "body" ),
			o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._opacity) {
			$(ui.helper).css("opacity", o._opacity);
		}
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function( event, ui, i ) {
		if ( !i.scrollParentNotHidden ) {
			i.scrollParentNotHidden = i.helper.scrollParent( false );
		}

		if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function( event, ui, i  ) {

		var o = i.options,
			scrolled = false,
			scrollParent = i.scrollParentNotHidden[ 0 ],
			document = i.document[ 0 ];

		if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
			if ( !o.axis || o.axis !== "x" ) {
				if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if ( !o.axis || o.axis !== "y" ) {
				if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}

		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}

		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function( event, ui, i ) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
			var $t = $(this),
				$o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(), height: $t.outerHeight(),
					top: $o.top, left: $o.left
				});
			}
		});

	},
	drag: function( event, ui, inst ) {

		var ts, bs, ls, rs, l, r, t, b, i, first,
			o = inst.options,
			d = o.snapTolerance,
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--){

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
				if (inst.snapElements[i].snapping) {
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left;
				}
			}

			first = (ts || bs || ls || rs);

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			}
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		}

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function( event, ui, instance ) {
		var min,
			o = instance.options,
			group = $.makeArray($(o.stack)).sort(function(a, b) {
				return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
			});

		if (!group.length) { return; }

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function(i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", (min + group.length));
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui.helper).css("zIndex", o._zIndex);
		}
	}
});

var draggable = $.ui.draggable;



}));

$(document).ready(function() {
	
	
$(document.body).on('fecss.default',	null, {}, function(event) {
	console.log('body trigger:fecss.default');
});

$(document.body).on('fecss.init',		null, {}, function(event) {
	console.log('body trigger:fecss.init');
});

$(document.body).on('fecss.window.unload',		null, {}, function(event, _event) {
	console.log('body trigger:fecss.window.unload: ' + JSON.stringify(_event));
});

$(document.body).on('fecss.ajax.success',		null, {}, function(event) {
	console.log('body trigger:fecss.ajax.success');
});

$(document.body).on('fecss.keydown',		null, {}, function(event, _event) {
	console.log('body trigger:fecss.keydown: ' + JSON.stringify(_event));
});

$(document.body).on('DOMSubtreeModified',		null, {}, function(event, _event) {
	console.log('body trigger:DOMSubtreeModified: ' + JSON.stringify(_event));
});

$(document.body).on('fecss.changeDOM',		'.fecss-change-dom', {}, function(event, _event) {
	console.log('.fecss-change-dom trigger:fecss.changeDOM');
});

$(document.body).on('DOMSubtreeModified',		'.fecss-change-dom', {}, function(event, _event) {
	$(this).trigger('fecss.changeDOM');
});


$(document.body).on('fecss.modal.show.after', null, {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('body trigger:fecss.modal.show.after');
	
	
	
});

$(document.body).on('fecss.modal.hide.after', null, {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('body trigger:fecss.modal.hide.after');
	
	
	
});

$(document.body).on('fecss.active.set', '.fecss-modal .white-container', {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('.white-container trigger:fecss.active.set');
	
	
	
});

$(document.body).on('fecss.active.unset', '.fecss-modal .white-container', {}, function(event, modal, wc){
	event.preventDefault();
	
	console.log('.white-container trigger:fecss.active.unset');
	
	
	
});


	
	$(document.body).on('fecss.url-history.get', null, {}, function(event, href, target, addToHistory){
		event.preventDefault();
		
		$.get(href, {}, function(data) {
			// Обновление только текстового содержимого в сером блоке
			var t_arr = [];
			
			if(target != '' && typeof target != 'undefined' && target != 'undefined') {
				t_arr = target.split(',');
			} else {
				t_arr = ['div:div'];
			}
			for(var k in t_arr) {
				var item = t_arr[k].trim().split(':');
				$(item[0]).html($(data).find(item[1]).eq(0).html());
			}
			
			// Если был выполнен клик в меню - добавляем запись в стек истории сеанса
			// Если была нажата кнопка назад/вперед, добавлять записи в историю не надо
			
			if(addToHistory == true) {
				// Добавляем запись в историю, используя pushState
				window.history.pushState({href : href, target : target}, null, href);
			}
		});
		
	});
	
	window.addEventListener('popstate', function(event) {
		//alert(JSON.stringify(event.state));
		$(document.body).trigger('fecss.url-history.get', [window.location.pathname, event.state.target, false]);
	}, false);
	
	
		
	$('[data-toggle="tooltip"]').tooltip();
	

	$('.arrow-slider').each(function(index){
		
		var block = $(this);
		var imgs = block.find('.img-block .item');
		var content = block.find('.text-content');
		var title_block = block.find('.title-block');
		var arrow_block = block.find('.arrow-block');
		var point_line = arrow_block.find('.point-line');
		//var counter = block.find('.info-block .counter');
		//var position = counter.find('.position');
		
		imgs.each(function(index){
			//$(this).attr('data-index', index+1);
			$('<a/>',{
				class : 'item',
				html : '<span class="point" ></span>',
				href : '#image-' + index,
			})
			.on('click.arrow-slider.point',function(event){
				console.log('click.arrow-slider.point');
				var i = $(this).index();
				point_line.find('.item').removeClass('active');
				imgs.fadeOut('fast').removeClass('active');
				$(this).addClass('active');
				imgs.eq(i).fadeIn('fast').addClass('active');
			})
			.appendTo(point_line);
		});
		/*
		imgs.eq(0).each(function(index){
			$(this).addClass('active');
			//counter.find('.position').html(index+1);
			//counter.find('.form').html(imgs.size());
		});
		*/
		arrow_block.on('click.arrow-slider.right', '.btn-arrow.right', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).next('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(0).trigger('click');
			}
		});
		arrow_block.on('click.arrow-slider.left', '.btn-arrow.left', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).prev('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(-1).trigger('click');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					arrow_block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
		if(point_line.find('.item.active').size()) {
			
		} else {
			point_line.find('.item').eq(0).trigger('click');
		}
		
	});
	

$(document.body).on('click.fecss.can-close.close-btn', '.can-close .close-btn', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.can-close.close-btn');
	
	$(this).closest('.can-close').removeClass('active');
});


/*
start .fecss document-ready
*/

$(
	function() {
		var res = 'noname-browser';
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('msie') != -1) res = 'msie';
		if (userAgent.indexOf('trident') != -1) res = 'msie';
		if (userAgent.indexOf('konqueror') != -1) res = 'konqueror';
		if (userAgent.indexOf('firefox') != -1) res = 'firefox';
		if (userAgent.indexOf('safari') != -1) res = 'safari';
		if (userAgent.indexOf('chrome') != -1) res = 'chrome';
		if (userAgent.indexOf('chromium') != -1) res = 'chromium';
		if (userAgent.indexOf('opera') != -1) res = 'opera';
		if (userAgent.indexOf('yabrowser') != -1) res = 'yabrowser';
		
		$('html').eq(0).addClass(res);
	}
);

$(
	function() {
		$(document.body).bind('keydown', function(event){
			event.stopPropagation();
			
			$(document.body).trigger('fecss.keydown', [{
				alt : event.altKey,
				ctrl : event.ctrlKey,
				shift : event.shiftKey,
				meta : event.metaKey,
				key : event.which,
				liter : String.fromCharCode(event.which),
			}]);
		});
	}
);

/*
end .fecss document-ready
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

/*
var urlL = new jsURLHistory();

setTimeout(function(){
	urlL.go2('/testovy1',{id:1,});
},3000);

setTimeout(function(){
	urlL.go2('/testovy2',{id:2,});
},6000);

setTimeout(function(){
	urlL.go2('/testovy3',{id:3,});
},9000);

setTimeout(function(){
	urlL.back();
},13000);

setTimeout(function(){
	urlL.back();
},16000);

setTimeout(function(){
	urlL.back();
},19000);

// http://xozblog.ru/demo/history-api-demo/pushState/script.js
window.addEventListener('popstate', function(event) {
	alert(JSON.stringify(event.state));
}, false);
*/

$(document.body).on('click.fecss.fecss-collapse.collapser', '.fecss-collapse .collapser', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.fecss-collapse.collapser');
	
	var btn = $(this);
	var collapse = btn.closest('.fecss-collapse');
	collapse.toggleClass('active');
	
});

/*
$('.fecss-imguploader').jqfeDropImgOptimizer3({
	max_width:800,
	max_height:800,
	callback:function(dataURL){		
		$(document.body).append('<img src="' + dataURL + '" />');
	}
});
*/
$(document.body).on('click.fecss.imgresizer', '.fecss-imgresizer', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.imgresizer');
	
	var btn = $(this);
	//var href = btn.attr('href');
	var max_w = parseInt(btn.attr('data-max-width')) || 1000;
	var max_h = parseInt(btn.attr('data-max-height')) || 1000;
	
	btn.jqfeDropImgOptimizer3({
		max_width : max_w,
		max_height : max_h,
		'multiple' : 'multiple',
		callback:function(result){ // {result:, file:}
			console.log((result.file));
			$(document.body).append('<img src="' + result.dataURL + '" title="' + result.file.name + '" />');
		}
	})

});

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



$(document.body).on('click.fecss.modal.show', '.fecss-modal-btn', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.modal.show');
	
	var btn = $(this);
	var href = btn.attr('href');
	
	var wc = $(document.body).find('.fecss-modal ' + href + '.white-container');
	var modal = wc.closest('.fecss-modal');
	
	if(wc.size()) {
		
		var _prev = $(document.body).find('.fecss-modal .white-container.active:not(.in-bg)').eq(0);
		if(_prev.size()) {
			_prev.addClass('in-bg');
			_prev.closest('.fecss-modal').addClass('in-bg');
			wc.data('fecss-modal-prev', _prev.attr('id'));
		}
		
		//if(!modal.hasClass('active')) {
			modal.addClass('active').removeClass('in-bg');
		//}
		
		var bc = modal.find('.black-container');
		bc.css({top : $(document).scrollTop() + 50 + 'px',});
		
		wc.addClass('active').removeClass('in-bg').trigger('fecss.active.set');
		
		$(document.body).trigger('fecss.modal.show.after', [modal, wc]);
		
	}
});

$(document.body).on('click.fecss.modal.hide', '.fecss-modal .white-container .hide-modal', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.modal.hide');
	
	var btn = $(this);
	var wc = btn.closest('.white-container');
	var modal = btn.closest('.fecss-modal');
	
	if(wc.size()) {
		
		wc.removeClass('active').removeClass('in-bg');
		
		var _prev = $('#' + wc.data('fecss-modal-prev'));
		if(_prev.size()) {
			
			var _prev_modal = _prev.closest('.fecss-modal');
			
			if(_prev_modal.hasClass('active')) {
				if(!_prev_modal.hasClass('in-bg')) {
					
				} else {
					modal.removeClass('active').removeClass('in-bg');
					_prev_modal.removeClass('in-bg');
				}
			} else {
				modal.removeClass('active');
				_prev_modal.addClass('active').removeClass('in-bg');
			}
			
			_prev.removeClass('in-bg');
			
		} else {
			modal.removeClass('active');
		}
		
		wc.data('fecss-modal-prev', '').trigger('fecss.active.unset');
		
		$(document.body).trigger('fecss.modal.hide.after', [modal, wc]);
		
	}
	
});


/*
start .got-to-top document-ready
*/

$(document.ready).on('click.fecss.go-to-top', '.go-to-top', function(event){
	event.preventDefault();
	
	$('html, body').animate({
		scrollTop : 0
	}, 777);
});

/*
end .got-to-top document-ready
*/


	$('.line-gallery').each(function(index){
		
		var block = $(this);
		
		//var arrow_block = block.find('.arrow-block');

		block.on('click.line-gallery.right', '.btn-arrow.right', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				vis.eq(-1).next('.item').fadeIn('fast');
			} else {
				vis.eq(0).hide().insertAfter(imgs.eq(-1));
				block.find('.img-block .item').eq(0).fadeIn('fast');
			}
		});
		block.on('click.line-gallery.left', '.btn-arrow.left', function(event){
			var imgs = block.find('.img-block .item');
			var vis = imgs.filter(':visible');
			if(vis.size() > 1) {
				vis.eq(-1).hide();
				imgs.eq(-1).insertBefore(vis.eq(0)).fadeIn('fast');
			} else {
				vis.eq(0).hide();
				block.find('.img-block .item').eq(-1).insertBefore(block.find('.img-block .item').eq(0)).fadeIn('fast');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
	});
	
$(window).load(function(event){
	$('.page-loader').removeClass('active');
});

$(document.body).on('click.fecss.page-loader.close-loader', '.page-loader .close-loader', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.page-loader.close-loader');
	
	$('.page-loader').removeClass('active');
});
	
	$('.scroll-container').each(function(index){
		
		var block = $(this);
		var target = $(block.attr('data-target') + ' .scroll-element').eq(0);
		var otarget = target.find('.scroll-overflow').eq(0);
		var line = block.find('.scroll-line');
		var scroll = line.find('.scroll');
		var scroll_ball;
		scroll_ball = $('<div/>', {
			class:'scroll-ball',
		});
		scroll_ball.appendTo(scroll.empty());
		var type = 0;
		
		block.on('init', function(event){
			event.preventDefault();
			
			console.log('.scroll-container init');
			
			if(block.hasClass('horizontal')) {
				type = 0;
				
				scroll.width(line.width() * (target.outerWidth(true) / otarget.outerWidth(true)));
				
				block.attr('data-ratio-h', (otarget.outerWidth(true) / (line.outerWidth(true))));
				
				scroll.draggable({
					axis:'x',
					containment : 'parent',
					scroll:false,
					drag:function(event, ui){
						target.scrollLeft(ui.position.left * block.attr('data-ratio-h'));
					},
				});
				
				target.trigger('scroll');
				
			} else if(block.hasClass('vertical')) {
				type = 1;
				
				scroll.height(line.height() * (target.outerHeight(true) / otarget.outerHeight(true)));
				
				block.attr('data-ratio-v', (otarget.outerHeight(true) / (line.outerHeight(true))));
				
				scroll.draggable({
					axis:'y',
					containment : 'parent',
					scroll:false,
					drag:function(event, ui){
						target.scrollTop(ui.position.top * block.attr('data-ratio-v'));
					},
				});
				
				target.trigger('scroll');
				
			}
		}).trigger('init');
		
		target.on('scroll', function(event){
			var pos = 0;
			var _pos = 0;
			if(type == 0) {
				pos = target.scrollLeft() / block.attr('data-ratio-h');
				_pos = pos * 100 / (line.outerWidth(true) - scroll.outerWidth(true));
				
				scroll.css({'left':pos});
				scroll_ball.css({'left':_pos + '%'});
			} else if(type == 1) {
				pos = target.scrollTop() / block.attr('data-ratio-v');
				_pos = pos * 100 / (line.outerHeight(true) - scroll.outerHeight(true));
				
				scroll.css({'top':pos});
				scroll_ball.css({'top':_pos + '%'});
			}
		});
		
	});
	

$(document.body).on('click.fecss.scrollto', '.scrollto', {}, function(event){
	event.preventDefault();
	
	console.log('body trigger:click.fecss.scrollto');
	
	var btn = $(this);
	
	var el = $(btn.attr('href')).eq(0);
	var diff = parseInt(btn.attr('data-scrollto-diff')) || 0;
	var speed = parseInt(btn.attr('data-scrollto-speed')) || 777;
	
	$('html, body').animate({
		scrollTop: (el.offset().top + diff)
	}, speed);
});

	
	/*
	$('.touchswipe').swipe({
		// http://labs.rampinteractive.co.uk/touchSwipe/demos/
		
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			console.log('.touchswipe swipe ' + direction);
		},
		//swipeLeft ...
		
		threshold:20
	});
	*/
	
	
	$(document.body).on('click.fecss.url-history', '.url-history', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var href = btn.attr('href');
		var target = btn.attr('data-target');
		
		if(typeof target != 'undefined' && target != 'undefined') {
			//href = target;
		} else {
			target = 'title:title, body:body';
		}
		
		var addToHistory = true;
		
		$(document.body).trigger('fecss.url-history.get', [href, target, addToHistory]);
	});
	
$(document.body).on('click.fecss.rolling-image-btn', '.rolling-image-btn', {}, function(event){
	event.preventDefault();
	
	var btn = $(this);
	var id = btn.attr('data-img-id');
	
	var ri = $('.rolling-image');
	
	ri.find('.img-item').removeClass('on-top')
	ri.removeClass('active');
	ri.find('.img-item').filter(id).addClass('on-top');
	ri.addClass('active');
	
	$('.rolling-image-btn').prop('disabled', 'disabled');
	
	setTimeout(function(){
		ri.removeClass('active');
		$('.rolling-image-btn').prop('disabled', false);
	}, 6000);
	
});
$(document.body).on('fecss.b-project-container.item.setActive', '.b-project-container', {}, function(event, _index){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	slides.removeClass('active');
	slides.eq(_index).addClass('active');
	
	nav.find('.item').removeClass('active');
	nav.find('.item').eq(_index).addClass('active');
	
});

$(document.body).on('click.fecss.b-project-container.nav-control.item', '.b-project-container .nav-control .item', {}, function(event){
	event.preventDefault();
	
	var btn = $(this);
	
	btn.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index()]);
	
});

$(document.body).on('fecss.b-project-container.init', '.b-project-container', {}, function(event){
	event.preventDefault();
	
	var block = $(this);
	var slides = block.find('.project-slide');
	var nav = block.find('.nav-control .item-cell');
	
	block.css({
		height : $(window).outerHeight(true),
	})
	
	nav.empty();
	
	slides.each(function(_index){
		var s = $(this);
		
		var item = $('<a/>', {
			class : 'item',
			href : '#project-slide-' + _index,
		})
			.appendTo(nav);
	});
	
	var h = nav.outerHeight(true);
	var top_value = (block.outerHeight(true) - h) / 2;
	nav.parent().css({
		height : h +'px',
		top : top_value +'px',
		bottom : top_value +'px',
	})
	
	nav.find('a.item').eq(0).trigger('click.fecss.b-project-container.nav-control.item');
	
});



$(function(){
	
	$(document.body).on('click.fecss.go-to-header', '.go-to-header.scrollto', {}, function(event){
		event.preventDefault();
		
		$('.wheel-block')
			.removeClass('active')
			.filter('[data-wheel-step="0"]')
				.addClass('active')
		;
		$(document.body).attr('data-wheel-step', 0);
		
	});
	
});


$(function(){
	
	/*
	$(document.body).on('click.fecss.order-service-btn', '.b-top-menu .site-menu .order-service-btn', {}, function(event){
		event.preventDefault();
		
		var block = $('.b-order-service').eq(0);
		
		$('html, body').animate({
			scrollTop: (block.offset().top)
		}, 777, function() {
			block.addClass('active');
			$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
		});
		
	});
	*/
	
});

$(function() {
	
	if(device.desktop() && $('.wheel-block').size()) {
		var scrolling = false;
		var _step = 0;
		
		$('.wheel-block').each(function(index){
			$(this).attr('data-wheel-step', index);
		});
		
		
		$('.wheel-block.with-child-wheel').each(function(index){
			var _b = $(this);
			_b.find('.wheel-block-child').each(function(_index){
				var __b = $(this);
				__b.attr('data-wheel-step', _index);
			});
		});
		
		
		
		
		$(document.body).on('fecss.wheel-block.set', null, {}, function(event, param){
			event.preventDefault();
			
			scrolling = true;
			
			console.log('body trigger:fecss.wheel-block.set: ' + JSON.stringify(param));
			
			param.diff = parseInt(param.diff);
			param.step = param.step || -1;
			
			var active, active_step, block;
			
			active = $('.wheel-block.active');
			
			if(active.size()) {
				
				active_step = parseInt(active.attr('data-wheel-step'));
				
				if(active.hasClass('with-child-wheel')) { // .wheel-block-child 
					
					//.closest('.b-project-container').trigger('fecss.b-project-container.item.setActive', [btn.index()]);
					
					var block_child;
					var active_child = active.find('.wheel-block-child.active');
					var active_child_step = parseInt(active_child.attr('data-wheel-step'));
					
					console.log('body trigger:fecss.wheel-block.set: (wheel-block-child) ' + JSON.stringify(param));
					
					if(param.diff > 0) {
						
						block_child = active_child.prev('.wheel-block-child');
						
					} else if(param.diff < 0) {
						
						block_child = active_child.next('.wheel-block-child');
						
					}
					
					if(block_child.size()) {
						
						//active.trigger('fecss.b-project-container.item.setActive', [parseInt(block_child.attr('data-wheel-step'))]);
						
						var nav = active.find('.nav-control .item-cell');
						nav.find('a.item').eq(parseInt(block_child.attr('data-wheel-step'))).trigger('click.fecss.b-project-container.nav-control.item');
						
						scrolling = false;
						
					} else {
						
						if(param.diff > 0) {
							
							block = active.prev('.wheel-block');
							
						} else if(param.diff < 0) {
							
							block = active.next('.wheel-block');
							
						}
						
						if(block.size()) {
							
							$('html, body').animate({
								scrollTop: (block.offset().top)
							}, 777, function() {
								if(active.size()) {
									active.removeClass('active');
								}
								block.addClass('active');
								$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
								scrolling = false;
							});
							
						} else {
							
							scrolling = false;
							
						}
						
					}
					
				} else {
					
					if(param.diff > 0) {
						
						block = active.prev('.wheel-block');
						
					} else if(param.diff < 0) {
						
						block = active.next('.wheel-block');
						
					} else if(param.step > -1) {
						
						block = $('.wheel-block[data-wheel-step="' + param.step + '"]');
						
					}
					
					if(block.size()) {
						
						$('html, body').animate({
							scrollTop: (block.offset().top)
						}, 777, function() {
							if(active.size()) {
								active.removeClass('active');
							}
							block.addClass('active');
							$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
							scrolling = false;
						});
						
					} else {
						
						scrolling = false;
						
					}
					
				}
				
			} else {
				
				block = $('.wheel-block[data-wheel-step="0"]');
				
				block.addClass('active');
				$(document.body).attr('data-wheel-step', block.attr('data-wheel-step'));
				
				scrolling = false;
				
			}
			
		})
			.trigger('fecss.wheel-block.set', [{
				step : _step,
			}])
		;
		
		
		$(document).on("wheel mousewheel DOMMouseScroll", function(event) {
			event.preventDefault();
			
			if(scrolling) {
				return;
			} else {
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			
			/*
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			} else { 
				$(document.body).trigger('fecss.wheel-block.set', [{diff:event.originalEvent.wheelDelta}]);
			}
			*/
		});
	
	}
	
});

$(function(){
	
	$(document.body).on('click.fecss.b-project-filters.type-filters.a', '.b-project-filters .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-project-filters .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});


$(function(){
	
	$(document.body).on('click.fecss.b-service-header.type-filters.a', '.b-service-header .type-filters a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		
		$('.b-service-header .type-filters a').removeClass('active');
		btn.addClass('active');
		
	});
	
});

	
	$(window).on('resize',function(event){
		
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

	
	$(
		function() {
			
			$('.scroll-container').trigger('init');
			console.log('window-resize .scroll-container init');
			
		}
	);
	
$(function(){
	
	$('.b-project-container').trigger('fecss.b-project-container.init');
	
});

$(function(){
	
	$('.project-slide').each(function(index){
		
		var block = $(this);
		var param = JSON.parse(block.attr('data-slide-param')||'{}');
		
		block.css({
			'height' : (block.outerWidth(true) / param.ratio),
			'background-image' : 'url(' + param.img + ')',
		})
		
	});
	
});


	
	$(function(){
		
		if(device.desktop()) {
			
			$('.b-project-list .project-cont').css({
				height : $(window).outerHeight(true),
			});
			
		}
		
	});


$(function(){
	
	$('.b-project-body').css({
		height : $(window).outerHeight(true),
	})
	
});

	}).trigger('resize');
	
	$(window).on('scroll',function(){
		
/*
start .go-to-top window-scroll
*/

$(
	function() {
		
		var pos = $(document).scrollTop();
		
		var gototop = $('.go-to-top');
		if(gototop.hasClass('active')) {
			if(pos < 200) {
				gototop.removeClass('active');
			}
		} else {
			if(pos > 200) {
				gototop.addClass('active');
			}
		}
		
	}
);

/*
end .go-to-top window-scroll
*/

	}).trigger('scroll');
	
	$('body').on('changeClass',function(){
		
	$('.line-gallery').each(function(index){
		
		var block = $(this);
		var body = $('body').eq(0);
		var c = 3;
		
		if(body.hasClass('window-width-xs')) {
			c = block.attr('data-xs-vis') || 1;
		} else
		if(body.hasClass('window-width-sm')) {
			c = block.attr('data-sm-vis') || 2;
		} else
		if(body.hasClass('window-width-md')) {
			c = block.attr('data-md-vis') || 3;
		} else
		if(body.hasClass('window-width-lg')) {
			c = block.attr('data-lg-vis') || 3;
		}
		
		var imgs = block.find('.img-block .item');//.hide();
		for(var i = (c); i < imgs.size(); i++) {
			imgs.eq(i).hide();
		}
		for(var i = 0; i < c; i++) {
			if(imgs.eq(i).is(':hidden')) {
				imgs.eq(i).fadeIn('fast');
			}
		}
		
	});
	
	});
	
		
	
	window.onbeforeunload = function(event) {
		//alert(event.target.URL);
		$('body').trigger('fecss.window.unload', [event]);
		return;//return false;
	}
	
	$(document.body).trigger('fecss.init');
	
});