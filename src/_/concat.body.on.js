$(document.body).on("fecss.default",null,{},function(o){console.log("body trigger:fecss.default")}),$(document.body).on("fecss.init",null,{},function(o){console.log("body trigger:fecss.init")}),$(document.body).on("fecss.window.unload",null,{},function(o,n){console.log("body trigger:fecss.window.unload: "+JSON.stringify(n))}),$(document.body).on("fecss.ajax.success",null,{},function(o){console.log("body trigger:fecss.ajax.success")}),$(document.body).on("fecss.keydown",null,{},function(o,n){console.log("body trigger:fecss.keydown: "+JSON.stringify(n))}),$(document.body).on("DOMSubtreeModified",null,{},function(o,n){console.log("body trigger:DOMSubtreeModified: "+JSON.stringify(n))});
$(document.body).on("fecss.changeDOM",".fecss-change-dom",{},function(e,c){console.log(".fecss-change-dom trigger:fecss.changeDOM")}),$(document.body).on("DOMSubtreeModified",".fecss-change-dom",{},function(e,c){$(this).trigger("fecss.changeDOM")});
$(document.body).on("fecss.modal.show.after",null,{},function(e,o,t){e.preventDefault(),console.log("body trigger:fecss.modal.show.after")}),$(document.body).on("fecss.modal.hide.after",null,{},function(e,o,t){e.preventDefault(),console.log("body trigger:fecss.modal.hide.after")}),$(document.body).on("fecss.active.set",".fecss-modal .white-container",{},function(e,o,t){e.preventDefault(),console.log(".white-container trigger:fecss.active.set")}),$(document.body).on("fecss.active.unset",".fecss-modal .white-container",{},function(e,o,t){e.preventDefault(),console.log(".white-container trigger:fecss.active.unset")});

$(document.body).on("fecss.url-history.get",null,{},function(t,e,n,i){t.preventDefault(),$.get(e,{},function(t){var o=[];o=""!=n&&"undefined"!=typeof n&&"undefined"!=n?n.split(","):["div:div"];for(var r in o){var d=o[r].trim().split(":");$(d[0]).html($(t).find(d[1]).eq(0).html())}1==i&&window.history.pushState({href:e,target:n},null,e)})}),window.addEventListener("popstate",function(t){$(document.body).trigger("fecss.url-history.get",[window.location.pathname,t.state.target,!1])},!1);