$('[data-toggle="tooltip"]').tooltip();
$(".arrow-slider").each(function(i){var e=$(this),t=e.find(".img-block .item"),r=(e.find(".text-content"),e.find(".title-block"),e.find(".arrow-block")),n=r.find(".point-line");t.each(function(i){$("<a/>",{"class":"item",html:'<span class="point" ></span>',href:"#image-"+i}).on("click.arrow-slider.point",function(i){console.log("click.arrow-slider.point");var e=$(this).index();n.find(".item").removeClass("active"),t.fadeOut("fast").removeClass("active"),$(this).addClass("active"),t.eq(e).fadeIn("fast").addClass("active")}).appendTo(n)}),r.on("click.arrow-slider.right",".btn-arrow.right",function(i){var e=n.find(".item"),t=e.filter(".active").eq(0).index(),r=e.eq(t).next(".item");r.size()?r.trigger("click"):e.eq(0).trigger("click")}),r.on("click.arrow-slider.left",".btn-arrow.left",function(i){var e=n.find(".item"),t=e.filter(".active").eq(0).index(),r=e.eq(t).prev(".item");r.size()?r.trigger("click"):e.eq(-1).trigger("click")}),e.hasClass("with-timer")&&e.data("fecss-timer",setInterval(function(){e.is(":hover")||r.find(".btn-arrow.right").trigger("click")},3e3)),n.find(".item.active").size()||n.find(".item").eq(0).trigger("click")});
$(document.body).on("click.fecss.can-close.close-btn",".can-close .close-btn",{},function(c){c.preventDefault(),console.log("body trigger:click.fecss.can-close.close-btn"),$(this).closest(".can-close").removeClass("active")});
$(function(){var e="noname-browser",r=navigator.userAgent.toLowerCase();-1!=r.indexOf("msie")&&(e="msie"),-1!=r.indexOf("trident")&&(e="msie"),-1!=r.indexOf("konqueror")&&(e="konqueror"),-1!=r.indexOf("firefox")&&(e="firefox"),-1!=r.indexOf("safari")&&(e="safari"),-1!=r.indexOf("chrome")&&(e="chrome"),-1!=r.indexOf("chromium")&&(e="chromium"),-1!=r.indexOf("opera")&&(e="opera"),-1!=r.indexOf("yabrowser")&&(e="yabrowser"),$("html").eq(0).addClass(e)});
$(document.body).on("click.fecss.fecss-collapse.collapser",".fecss-collapse .collapser",{},function(s){s.preventDefault(),console.log("body trigger:click.fecss.fecss-collapse.collapser");var c=$(this),e=c.closest(".fecss-collapse");e.toggleClass("active")});
$(document.body).on("click.fecss.imgresizer",".fecss-imgresizer",{},function(e){e.preventDefault(),console.log("body trigger:click.fecss.imgresizer");var t=$(this),i=parseInt(t.attr("data-max-width"))||1e3,a=parseInt(t.attr("data-max-height"))||1e3;t.jqfeDropImgOptimizer3({max_width:i,max_height:a,multiple:"multiple",callback:function(e){console.log(e.file),$(document.body).append('<img src="'+e.dataURL+'" title="'+e.file.name+'" />')}})});
$(".fecss-jscacher").each(function(){var c=$(this),a=c.attr("data-jscacher-filter")||"default",e=parseInt(c.attr("data-jscacher-ttl"))||6e4;c.attr("data-jscacher-cached",!1);var t=new jsCacher({filter:a,ttl:e});c.on("cacher-clear",function(a){c.attr("data-jscacher-cached",!1),t.clear()}),c.on("cacher-cache",function(e){c.attr("data-jscacher-cached",!1),t.cache(c.html()),c.attr("data-jscacher-cached",!0),console.log('.fecss-jscacher[data-jscacher-filter="'+a+'"] cacher-cache')}),c.on("cacher-load",function(e){var r=t.load();c.html(r.content).attr("data-jscacher-cached",!0),console.log('.fecss-jscacher[data-jscacher-filter="'+a+'"] cacher-load')}),c.on("cacher-check",function(a){var e=t.load();e.need_update?c.trigger("cacher-cache"):c.trigger("cacher-load")}).trigger("cacher-check")});
$(".fecss-jscart").each(function(){var t=$(this),a=t.attr("data-jscart-filter")||"default",r=new jsCart({filter:a});t.on("rebuild",function(a){t.find(".jscart-item").each(function(a){var e=$(this),c=e.attr("data-jscart-product"),s=e.attr("data-jscart-taste"),n=r.getItem(c,s);e.find("input.jscart-item-amount").attr("value",parseInt(n.amount)),e.find("div.jscart-item-amount, span.jscart-item-amount, a.jscart-item-amount").html(parseInt(n.amount));var d=r.calculate();t.attr("data-jscart-sum",d.sum).find(".jscart-sum").html(d.sum),t.find(".jscart-product").html(d.product),t.find(".jscart-amount").html(d.amount)})}),t.trigger("rebuild"),t.on("clear",function(a){r.clear(),t.trigger("rebuild")}),t.on("create-order",function(a){r.saveCart(function(a,e){$.getJSON("/json/_fecss-jscart/create-order.json",function(a){var e=a;r.saveOrder(e),r.clear(),t.trigger("rebuild")})})}),t.find(".jscart-item .jscart-add-btn").on("click.jscart",function(a){a.preventDefault();var e=$(this),c=e.attr("data-jscart-product"),s=e.attr("data-jscart-taste"),n=e.attr("data-jscart-cost"),d=e.attr("data-jscart-amount");(""==c||"underfined"==typeof c||null==c)&&(c=e.closest(".jscart-item").attr("data-jscart-product")),(""==s||"underfined"==typeof s||null==s)&&(s=e.closest(".jscart-item").attr("data-jscart-taste")),(""==n||"underfined"==typeof n||null==n)&&(n=e.closest(".jscart-item").attr("data-jscart-cost")),(""==d||"underfined"==typeof d||null==d||0==d)&&(d=e.closest(".jscart-item").attr("data-jscart-amount")),r.add(c,s,n,parseInt(d)),console.log("product "+c+" added to cart"),t.trigger("rebuild")}),t.find(".jscart-item .jscart-remove-btn").on("click.jscart",function(a){a.preventDefault();var e=$(this),c=e.attr("data-jscart-product"),s=e.attr("data-jscart-taste"),n=e.attr("data-jscart-cost"),d=e.attr("data-jscart-amount");(""==c||"underfined"==typeof c||null==c)&&(c=e.closest(".jscart-item").attr("data-jscart-product")),(""==s||"underfined"==typeof s||null==s)&&(s=e.closest(".jscart-item").attr("data-jscart-taste")),(""==n||"underfined"==typeof n||null==n)&&(n=e.closest(".jscart-item").attr("data-jscart-cost")),(""==d||"underfined"==typeof d||null==d||0==d)&&(d=e.closest(".jscart-item").attr("data-jscart-amount")),r.remove(c,s,parseInt(d)),console.log("product "+c+" removed from cart"),t.trigger("rebuild")}),t.find(".jscart-clear-btn").on("click.jscart",function(a){a.preventDefault(),t.trigger("clear")}),t.find(".jscart-create-order").on("click.jscart",function(a){a.preventDefault(),t.trigger("create-order")})});
$(".fecss-jsviewed").each(function(){var e=$(this),i=e.attr("data-jsviewed-filter")||"default",t=e.html(),r=new jsViewed({filter:i});e.on("rebuild",function(i){e.empty();var n=r.getAll();if(null!=n)for(var a in n){var l=n[a],c=t;for(var d in l)c=c.replace(new RegExp("%"+d+"%","ig"),l[d]);var f=$("<div/>",{html:c});f.appendTo(e)}}),e.trigger("rebuild"),e.on("create-view",{},function(e,t){r.add(t),console.log('.fecss-jsviewed[data-jsviewed-filter="'+i+'"] create-view')}),e.on("clear",function(i){r.clear(),e.trigger("rebuild")}),e.find(".jsviewed-clear-btn").on("click.jsviewed",function(i){i.preventDefault(),e.trigger("clear")}),function(){e.trigger("create-view",[{id:(new Date).getTime(),title:"some test"}])}()});
$(document.body).on("click.fecss.modal.show",".fecss-modal-btn",{},function(e){e.preventDefault(),console.log("body trigger:click.fecss.modal.show");var s=$(this),a=s.attr("href"),o=$(document.body).find(".fecss-modal "+a+".white-container"),c=o.closest(".fecss-modal");if(o.size()){var i=$(document.body).find(".fecss-modal .white-container.active:not(.in-bg)").eq(0);i.size()&&(i.addClass("in-bg"),i.closest(".fecss-modal").addClass("in-bg"),o.data("fecss-modal-prev",i.attr("id"))),c.addClass("active").removeClass("in-bg");var t=c.find(".black-container");t.css({top:$(document).scrollTop()+50+"px"}),o.addClass("active").removeClass("in-bg").trigger("fecss.active.set"),$(document.body).trigger("fecss.modal.show.after",[c,o])}}),$(document.body).on("click.fecss.modal.hide",".fecss-modal .white-container .hide-modal",{},function(e){e.preventDefault(),console.log("body trigger:click.fecss.modal.hide");var s=$(this),a=s.closest(".white-container"),o=s.closest(".fecss-modal");if(a.size()){a.removeClass("active").removeClass("in-bg");var c=$("#"+a.data("fecss-modal-prev"));if(c.size()){var i=c.closest(".fecss-modal");i.hasClass("active")?i.hasClass("in-bg")&&(o.removeClass("active").removeClass("in-bg"),i.removeClass("in-bg")):(o.removeClass("active"),i.addClass("active").removeClass("in-bg")),c.removeClass("in-bg")}else o.removeClass("active");a.data("fecss-modal-prev","").trigger("fecss.active.unset"),$(document.body).trigger("fecss.modal.hide.after",[o,a])}});
$(document.ready).on("click.fecss.go-to-top",".go-to-top",function(o){o.preventDefault(),$("html, body").animate({scrollTop:0},777)});
$(".line-gallery").each(function(e){var i=$(this);i.on("click.line-gallery.right",".btn-arrow.right",function(e){var t=i.find(".img-block .item"),n=t.filter(":visible");n.size()>1?(n.eq(0).hide().insertAfter(t.eq(-1)),n.eq(-1).next(".item").fadeIn("fast")):(n.eq(0).hide().insertAfter(t.eq(-1)),i.find(".img-block .item").eq(0).fadeIn("fast"))}),i.on("click.line-gallery.left",".btn-arrow.left",function(e){var t=i.find(".img-block .item"),n=t.filter(":visible");n.size()>1?(n.eq(-1).hide(),t.eq(-1).insertBefore(n.eq(0)).fadeIn("fast")):(n.eq(0).hide(),i.find(".img-block .item").eq(-1).insertBefore(i.find(".img-block .item").eq(0)).fadeIn("fast"))}),i.hasClass("with-timer")&&i.data("fecss-timer",setInterval(function(){i.is(":hover")||i.find(".btn-arrow.right").trigger("click")},3e3))});
$(window).load(function(e){$(".page-loader").attr("data-page-loader-next")?($(".b-welcome .show-from-left").addClass("active"),$(".page-loader").removeClass("active")):$(".page-loader").attr("data-page-loader-next",!0)}),$(document.body).on("click.fecss.page-loader.close-loader",".page-loader .close-loader",{},function(e){e.preventDefault(),console.log("body trigger:click.fecss.page-loader.close-loader"),$(".b-welcome .show-from-left").addClass("active"),$(".page-loader").removeClass("active")}),$(function(){setTimeout(function(){$(".page-loader").attr("data-page-loader-next")?($(".b-welcome .show-from-left").addClass("active"),$(".page-loader").removeClass("active")):$(".page-loader").attr("data-page-loader-next",!0)},1500)});
$(".scroll-container").each(function(t){var r,o=$(this),a=$(o.attr("data-target")+" .scroll-element").eq(0),i=a.find(".scroll-overflow").eq(0),e=o.find(".scroll-line"),l=e.find(".scroll");r=$("<div/>",{"class":"scroll-ball"}),r.appendTo(l.empty());var n=0;o.on("init",function(t){t.preventDefault(),console.log(".scroll-container init"),o.hasClass("horizontal")?(n=0,l.width(e.width()*(a.outerWidth(!0)/i.outerWidth(!0))),o.attr("data-ratio-h",i.outerWidth(!0)/e.outerWidth(!0)),l.draggable({axis:"x",containment:"parent",scroll:!1,drag:function(t,r){a.scrollLeft(r.position.left*o.attr("data-ratio-h"))}}),a.trigger("scroll")):o.hasClass("vertical")&&(n=1,l.height(e.height()*(a.outerHeight(!0)/i.outerHeight(!0))),o.attr("data-ratio-v",i.outerHeight(!0)/e.outerHeight(!0)),l.draggable({axis:"y",containment:"parent",scroll:!1,drag:function(t,r){a.scrollTop(r.position.top*o.attr("data-ratio-v"))}}),a.trigger("scroll"))}).trigger("init"),a.on("scroll",function(t){var i=0,s=0;0==n?(i=a.scrollLeft()/o.attr("data-ratio-h"),s=100*i/(e.outerWidth(!0)-l.outerWidth(!0)),l.css({left:i}),r.css({left:s+"%"})):1==n&&(i=a.scrollTop()/o.attr("data-ratio-v"),s=100*i/(e.outerHeight(!0)-l.outerHeight(!0)),l.css({top:i}),r.css({top:s+"%"}))})});
$(document.body).on("click.fecss.scrollto",".scrollto",{},function(t){t.preventDefault(),console.log("body trigger:click.fecss.scrollto");var o=$(this),l=$(o.attr("href")).eq(0),e=parseInt(o.attr("data-scrollto-diff"))||0,r=parseInt(o.attr("data-scrollto-speed"))||777;$("html, body").animate({scrollTop:l.offset().top+e},r)});

$(document.body).on("click.fecss.url-history",".url-history",{},function(t){t.preventDefault();var e=$(this),r=e.attr("href"),o=e.attr("data-target");o&&"undefined"!=typeof o&&"undefined"!=o||(o="title:title, body:body");var d=!0;$(document.body).trigger("fecss.url-history.get",[r,o,d])});
$(document.body).on("click.fecss.rolling-image-btn",".rolling-image-btn",{},function(i){i.preventDefault();var e=$(this),a=e.attr("data-img-id"),t=$(".rolling-image");t.find(".img-item").removeClass("on-top"),t.removeClass("active"),t.find(".img-item").filter(a).addClass("on-top"),t.addClass("active"),$(".rolling-image-btn").prop("disabled","disabled"),setTimeout(function(){t.removeClass("active"),$(".rolling-image-btn").prop("disabled",!1)},6e3)});
$(document.body).on("fecss.b-project-container.item.setActive",".b-project-container",{},function(e,t,n){e.preventDefault();var i=$(this),c=i.find(".project-slide"),o=i.find(".nav-control .item-cell");c.removeClass("active"),setTimeout(function(){c.eq(t).addClass("active")},600),o.find(".item").removeClass("active"),o.find(".item").eq(t).addClass("active"),n&&n()}),$(document.body).on("click.fecss.b-project-container.nav-control.item",".b-project-container .nav-control .item",{},function(e,t){e.preventDefault();var n=$(this);n.closest(".b-project-container").trigger("fecss.b-project-container.item.setActive",[n.index(),t])}),$(document.body).on("fecss.b-project-container.init",".b-project-container",{},function(e){e.preventDefault();var t=$(this),n=t.find(".project-slide"),i=t.find(".nav-control .item-cell");screenJS.isXS()||t.css({height:$(window).outerHeight(!0)}),i.empty(),n.each(function(e){$(this),$("<a/>",{"class":"item",href:"#project-slide-"+e,html:"<span>0"+(e+1)+"</span>"}).appendTo(i)});var c=i.outerHeight(!0),o=(t.outerHeight(!0)-c)/2;i.parent().css({height:c+"px",top:o+"px",bottom:o+"px"}),i.find("a.item").eq(0).trigger("click.fecss.b-project-container.nav-control.item")});
$(function(){});

$(document.body).on("fecss.b-news-item-header.init",".b-news-item-header",{},function(e){e.preventDefault();var i=$(this),n=i.find(".news-item-img-cont");screenJS.isXS()||n.css({height:$(window).outerHeight(!0)})});
$(function(){$(".owl-carousel").size()&&$(".owl-carousel").owlCarousel({loop:!0,margin:0,items:4,animateIn:!0,animateOut:!0,autoplay:!1,responsiveClass:!0,responsive:{0:{items:1,nav:!0},768:{items:2,nav:!1},992:{items:3,nav:!1,loop:!1},1200:{items:4,nav:!1,loop:!1}}})}),$(function(){$(document.body).trigger("fecss.wheel-block.set")});
$(function(){$(document.body).on("click.fecss.b-about-cont.close-btn",".b-about-cont .close-btn",{},function(e){e.preventDefault();var o=$(this),t=o.closest(".b-about-cont");t.css({top:"-120%"}).removeClass("active"),screenJS.isXS()||screenJS.isSM()||($(".page-container").removeClass("blur"),$(".b-top-menu").removeClass("blur"))}),$(".b-about-cont .close-btn").trigger("click.fecss.b-about-cont.close-btn")});
$(function(){$(document.body).on("click.fecss.go-to-header",".go-to-header.scrollto",{},function(e){e.preventDefault(),$(".wheel-block").removeClass("active").filter('[data-wheel-step="0"]').addClass("active"),$(document.body).attr("data-wheel-step",0),$(".b-project-container").trigger("fecss.b-project-container.item.setActive",[0])})});
$(function(){$(document.body).on("click.fecss.order-service-btn",".b-top-menu .order-service-btn",{},function(e){e.preventDefault();var t=$(".b-order-service").eq(0);$("html, body").animate({scrollTop:t.offset().top},777,function(){t.addClass("active"),$(document.body).attr("data-wheel-step",t.attr("data-wheel-step"))})}),$(document.body).on("click.fecss.show-b-about-cont",".b-top-menu .show-b-about-cont",{},function(e){e.preventDefault();var t=$(".b-about-cont").eq(0);t.addClass("active"),screenJS.isXS()||screenJS.isSM()||($(".page-container").addClass("blur"),$(".b-top-menu").addClass("blur"))}),$(document.body).on("click.fecss.mobile-menu.menu-btn",".mobile-menu .menu-btn",{},function(e){e.preventDefault(),$(".page-container").toggleClass("blur")})});
$(function(){if((screenJS.isMD()||screenJS.isLG())&&$(".wheel-block").size()){var e,t=0,l=function(t){t?setTimeout(function(){e=!1},t):e=!1};l(),$(".wheel-block").each(function(e){$(this).attr("data-wheel-step",e)}),$(".wheel-block.with-child-wheel").each(function(e){var t=$(this);t.find(".wheel-block-child").each(function(e){var t=$(this);t.attr("data-wheel-step",e)})}),$(document.body).on("fecss.wheel-block.set",null,{},function(e,t){e.preventDefault(),console.log("body trigger:fecss.wheel-block.set: "+JSON.stringify(t)),t.diff=parseInt(t.diff),t.step=t.step||-1;var a,i,s;if(a=$(".wheel-block.active"),a.size())if(i=parseInt(a.attr("data-wheel-step")),a.hasClass("with-child-wheel")){var o,c=a.find(".wheel-block-child.active");parseInt(c.attr("data-wheel-step"));if(t.diff>0?o=c.prev(".wheel-block-child"):t.diff<0&&(o=c.next(".wheel-block-child")),o.size()){var n=a.find(".nav-control .item-cell");n.find("a.item").eq(parseInt(o.attr("data-wheel-step"))).trigger("click.fecss.b-project-container.nav-control.item",[function(){l(451)}])}else t.diff>0?s=a.prev(".wheel-block"):t.diff<0&&(s=a.next(".wheel-block")),s.size()?$("html, body").animate({scrollTop:s.offset().top},777,function(){a.size()&&a.removeClass("active"),s.addClass("active"),$(document.body).attr("data-wheel-step",s.attr("data-wheel-step")),l()}):l()}else t.diff>0?s=a.prev(".wheel-block"):t.diff<0?s=a.next(".wheel-block"):t.step>-1&&(s=$('.wheel-block[data-wheel-step="'+t.step+'"]')),s.size()?$("html, body").animate({scrollTop:s.offset().top},777,function(){a.size()&&a.removeClass("active"),s.addClass("active"),$(document.body).attr("data-wheel-step",s.attr("data-wheel-step")),l()}):l();else s=$('.wheel-block[data-wheel-step="0"]'),s.addClass("active"),$(document.body).attr("data-wheel-step",s.attr("data-wheel-step")),l()}).trigger("fecss.wheel-block.set",[{step:t}]),$(document.body).on("wheel mousewheel DOMMouseScroll MozMousePixelScroll",function(t){if($(document.body).hasClass("is-mainpage")&&t.preventDefault(),!e){e=!0;var l=-t.originalEvent.deltaY||t.originalEvent.detail||t.originalEvent.wheelDelta;$(document.body).trigger("fecss.wheel-block.set",[{diff:l}])}})}});
$(function(){$(document.body).on("click.fecss.b-project-filters.type-filters.a",".b-project-filters .type-filters a",{},function(e){e.preventDefault();var t=$(this);$(".b-project-filters .type-filters a").removeClass("active"),t.addClass("active")})});
$(function(){$(document.body).on("click.fecss.b-service-header.type-filters.a",".b-service-header .type-filters a",{},function(e){e.preventDefault();var t=$(this),r=t.attr("data-filter");$(".b-service-header .type-filters a").removeClass("active"),t.addClass("active");var i=$(".b-service-body"),a=i.find(".text-tabber .item");a.filter(".active").removeClass("active"),a.filter('[data-filter="'+r+'"]').addClass("active")}),$(function(){var e=window.location.hash.split("#");e[1]?$('.b-service-header .type-filters a[data-filter="'+e[1]+'"]').eq(0).trigger("click.fecss.b-service-header.type-filters.a"):screenJS.isXS()?$(".b-service-header .type-filters a").eq(2).trigger("click.fecss.b-service-header.type-filters.a"):$(".b-service-header .type-filters a").eq(0).trigger("click.fecss.b-service-header.type-filters.a")})});