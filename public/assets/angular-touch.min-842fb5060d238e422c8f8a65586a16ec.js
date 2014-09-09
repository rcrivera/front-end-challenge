!function(n,e){"use strict";function t(n,e,t){o.directive(n,["$parse","$swipe",function(o,c){var i=75,a=.3,u=30;return function(r,s,l){function h(n){if(!f)return!1;var t=Math.abs(n.y-f.y);return n=(n.x-f.x)*e,g&&i>t&&n>0&&n>u&&a>t/n}var f,g,d=o(l[n]);c.bind(s,{start:function(n){f=n,g=!0},cancel:function(){g=!1},end:function(n,e){h(n)&&r.$apply(function(){s.triggerHandler(t),d(r,{$event:e})})}})}}])}var o=e.module("ngTouch",[]);o.factory("$swipe",[function(){function n(n){var e=n.touches&&n.touches.length?n.touches:[n];return n=n.changedTouches&&n.changedTouches[0]||n.originalEvent&&n.originalEvent.changedTouches&&n.originalEvent.changedTouches[0]||e[0].originalEvent||e[0],{x:n.clientX,y:n.clientY}}return{bind:function(e,t){var o,c,i,a,u=!1;e.on("touchstart mousedown",function(e){i=n(e),u=!0,c=o=0,a=i,t.start&&t.start(i,e)}),e.on("touchcancel",function(n){u=!1,t.cancel&&t.cancel(n)}),e.on("touchmove mousemove",function(e){if(u&&i){var r=n(e);o+=Math.abs(r.x-a.x),c+=Math.abs(r.y-a.y),a=r,10>o&&10>c||(c>o?(u=!1,t.cancel&&t.cancel(e)):(e.preventDefault(),t.move&&t.move(r,e)))}}),e.on("touchend mouseup",function(e){u&&(u=!1,t.end&&t.end(n(e),e))})}}}]),o.config(["$provide",function(n){n.decorator("ngClickDirective",["$delegate",function(n){return n.shift(),n}])}]),o.directive("ngClick",["$parse","$timeout","$rootElement",function(n,t,o){function c(n,e,t){for(var o=0;o<n.length;o+=2)if(Math.abs(n[o]-e)<h&&Math.abs(n[o+1]-t)<h)return n.splice(o,o+2),!0;return!1}function i(n){if(!(Date.now()-u>l)){var e=n.touches&&n.touches.length?n.touches:[n],t=e[0].clientX,e=e[0].clientY;1>t&&1>e||s&&s[0]===t&&s[1]===e||(s&&(s=null),"label"===n.target.tagName.toLowerCase()&&(s=[t,e]),c(r,t,e)||(n.stopPropagation(),n.preventDefault(),n.target&&n.target.blur()))}}function a(n){n=n.touches&&n.touches.length?n.touches:[n];var e=n[0].clientX,o=n[0].clientY;r.push(e,o),t(function(){for(var n=0;n<r.length;n+=2)if(r[n]==e&&r[n+1]==o){r.splice(n,n+2);break}},l,!1)}var u,r,s,l=2500,h=25,f="ng-click-active";return function(t,s,l){function h(){w=!1,s.removeClass(f)}var g,d,v,p,m=n(l.ngClick),w=!1;s.on("touchstart",function(n){w=!0,g=n.target?n.target:n.srcElement,3==g.nodeType&&(g=g.parentNode),s.addClass(f),d=Date.now(),n=n.touches&&n.touches.length?n.touches:[n],n=n[0].originalEvent||n[0],v=n.clientX,p=n.clientY}),s.on("touchmove",function(){h()}),s.on("touchcancel",function(){h()}),s.on("touchend",function(n){var t=Date.now()-d,f=n.changedTouches&&n.changedTouches.length?n.changedTouches:n.touches&&n.touches.length?n.touches:[n],m=f[0].originalEvent||f[0],f=m.clientX,m=m.clientY,b=Math.sqrt(Math.pow(f-v,2)+Math.pow(m-p,2));w&&750>t&&12>b&&(r||(o[0].addEventListener("click",i,!0),o[0].addEventListener("touchstart",a,!0),r=[]),u=Date.now(),c(r,f,m),g&&g.blur(),e.isDefined(l.disabled)&&!1!==l.disabled||s.triggerHandler("click",[n])),h()}),s.onclick=function(){},s.on("click",function(n,e){t.$apply(function(){m(t,{$event:e||n})})}),s.on("mousedown",function(){s.addClass(f)}),s.on("mousemove mouseup",function(){s.removeClass(f)})}}]),t("ngSwipeLeft",-1,"swipeleft"),t("ngSwipeRight",1,"swiperight")}(window,window.angular);