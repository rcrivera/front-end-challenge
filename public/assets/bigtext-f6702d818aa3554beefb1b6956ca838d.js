!function(t,e){"use strict";function n(t,e,n,i,s,r,o){var a;if(o="number"==typeof o?o:0,t.css(n,i+r),a=t.width(),a>=e){if(t.css(n,""),a===e)return{match:"exact",size:parseFloat((parseFloat(i)-.1).toFixed(3))};var c=e-o,l=a-e;return{match:"estimate",size:parseFloat((parseFloat(i)-("word-spacing"===n&&o&&c>l?0:s)).toFixed(3))}}return a}function i(t,i,s,r,o){var a=t.clone(!0).addClass("bigtext-cloned").css({fontFamily:t.css("font-family"),textTransform:t.css("text-transform"),wordSpacing:t.css("word-spacing"),letterSpacing:t.css("letter-spacing"),position:"absolute",left:c.DEBUG_MODE?0:-9999,top:c.DEBUG_MODE?0:-9999}).appendTo(document.body),l=[],u=[],d=[],p=[];return i.css("float","left").each(function(){var t,i,a=e(this),u=c.test.noFractionalFontSize?[8,4,1]:[8,4,1,.1];if(a.hasClass(c.EXEMPT_CLASS))return l.push(null),p.push(null),void d.push(!1);var f=2,g=parseFloat(a.css("font-size")),S=(a.width()/g).toFixed(6);i=parseInt(s/S,10)-f;t:for(var h=0,_=u.length;_>h;h++)e:for(var b=1,E=10;E>=b;b++){if(i+b*u[h]>r){i=r;break t}if(t=n(a,s,"font-size",i+b*u[h],u[h],"px",t),"number"!=typeof t){if(i=t.size,"exact"===t.match)break t;break e}}p.push(s/i),i>r?(l.push(r),d.push(!1)):o&&o>i?(l.push(o),d.push(!0)):(l.push(i),d.push(!1))}).each(function(t){var i,r=e(this),o=0,a=1;if(r.hasClass(c.EXEMPT_CLASS))return void u.push(null);r.css("font-size",l[t]+"px");for(var d=1,p=3;p>d;d+=a)if(i=n(r,s,"word-spacing",d,a,"px",i),"number"!=typeof i){o=i.size;break}r.css("font-size",""),u.push(o)}).removeAttr("style"),c.DEBUG_MODE?a.css({"background-color":"rgba(255,255,255,.4)"}):a.remove(),{fontSizes:l,wordSpacings:u,ratios:p,minFontSizes:d}}var s=0,r=e("head"),o=t.BigText,a=e.fn.bigtext,c={DEBUG_MODE:!1,DEFAULT_MIN_FONT_SIZE_PX:10,DEFAULT_MAX_FONT_SIZE_PX:528,GLOBAL_STYLE_ID:"bigtext-style",STYLE_ID:"bigtext-id",LINE_CLASS_PREFIX:"bigtext-line",EXEMPT_CLASS:"bigtext-exempt",noConflict:function(n){return n&&(e.fn.bigtext=a,t.BigText=o),c},test:{noFractionalFontSize:function(){if(!("getComputedStyle"in t&&"body"in document))return!0;var n,i=e("<div/>").css({position:"absolute","font-size":"14.1px"}).appendTo(document.body).get(0);return"object"==typeof t.getComputedStyle&&(n=t.getComputedStyle(i,null)),n?"14px"===n.getPropertyValue("font-size"):!0}()},init:function(){e("#"+c.GLOBAL_STYLE_ID).length||r.append(c.generateStyleTag(c.GLOBAL_STYLE_ID,[".bigtext * { white-space: nowrap; } .bigtext > * { display: block; }",".bigtext ."+c.EXEMPT_CLASS+", .bigtext ."+c.EXEMPT_CLASS+" * { white-space: normal; }"]))},bindResize:function(n,i){e.throttle?e(t).unbind(n).bind(n,e.throttle(100,i)):(e.fn.smartresize&&(n="smartresize."+n),e(t).unbind(n).bind(n,i))},getStyleId:function(t){return c.STYLE_ID+"-"+t},generateStyleTag:function(t,n){return e("<style>"+n.join("\n")+"</style>").attr("id",t)},clearCss:function(t){var n=c.getStyleId(t);e("#"+n).remove()},generateCss:function(t,e,n,i){var s=[];c.clearCss(t);for(var r=0,o=e.length;o>r;r++)s.push("#"+t+" ."+c.LINE_CLASS_PREFIX+r+" {"+(i[r]?" white-space: normal;":"")+(e[r]?" font-size: "+e[r]+"px;":"")+(n[r]?" word-spacing: "+n[r]+"px;":"")+"}");return c.generateStyleTag(c.getStyleId(t),s)},jQueryMethod:function(t){return c.init(),t=e.extend({minfontsize:c.DEFAULT_MIN_FONT_SIZE_PX,maxfontsize:c.DEFAULT_MAX_FONT_SIZE_PX,childSelector:"",resize:!0},t||{}),this.each(function(){var n=e(this).addClass("bigtext"),o=n.width(),a=n.attr("id"),l=t.childSelector?n.find(t.childSelector):n.children();a||(a="bigtext-id"+s++,n.attr("id",a)),t.resize&&c.bindResize("resize.bigtext-event-"+a,function(){c.jQueryMethod.call(e("#"+a),t)}),c.clearCss(a),l.addClass(function(t,e){return[e.replace(new RegExp("\\b"+c.LINE_CLASS_PREFIX+"\\d+\\b"),""),c.LINE_CLASS_PREFIX+t].join(" ")});var u=i(n,l,o,t.maxfontsize,t.minfontsize);r.append(c.generateCss(a,u.fontSizes,u.wordSpacings,u.minFontSizes))}),this.trigger("bigtext:complete")}};e.fn.bigtext=c.jQueryMethod,t.BigText=c}(this,jQuery);