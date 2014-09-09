!function(n,t,a){"use strict";t.module("ngAnimate",["ng"]).factory("$$animateReflow",["$$rAF","$document",function(n,t){var a=t[0].body;return function(t){return n(function(){a.offsetWidth+1;t()})}}]).config(["$provide","$animateProvider",function(e,i){function r(n){for(var t=0;t<n.length;t++){var a=n[t];if(a.nodeType==c)return a}}function o(n){return t.element(r(n))}function s(n,t){return r(n)==r(t)}var u=t.noop,l=t.forEach,f=i.$$selectors,c=1,v="$$ngAnimateState",d="ng-animate",m={running:!0};e.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document",function(n,a,e,c,g,C){function p(n){if(n){var t=[],i={},r=n.substr(1).split(".");(e.transitions||e.animations)&&t.push(a.get(f[""]));for(var o=0;o<r.length;o++){var s=r[o],u=f[s];u&&!i[s]&&(t.push(a.get(u)),i[s]=!0)}return t}}function y(n,a,e){function i(n,t){var a=n[t],e=n["before"+t.charAt(0).toUpperCase()+t.substr(1)];return a||e?("leave"==t&&(e=a,a=null),$.push({event:t,fn:a}),y.push({event:t,fn:e}),!0):void 0}function r(t,a,i){function r(n){if(a){if((a[n]||u)(),++c<o.length)return;a=null}i()}var o=[];l(t,function(n){n.fn&&o.push(n)});var c=0;l(o,function(t,i){var o=function(){r(i)};switch(t.event){case"setClass":a.push(t.fn(n,s,f,o));break;case"addClass":a.push(t.fn(n,s||e,o));break;case"removeClass":a.push(t.fn(n,f||e,o));break;default:a.push(t.fn(n,o))}}),a&&0===a.length&&i()}var o=n[0];if(o){var s,f,c="setClass"==a,v=c||"addClass"==a||"removeClass"==a;t.isArray(e)&&(s=e[0],f=e[1],e=s+" "+f);var d=n.attr("class"),m=d+" "+e;if(S(m)){var g=u,C=[],y=[],h=u,b=[],$=[],D=(" "+m).replace(/\s+/g,".");return l(p(D),function(n){var t=i(n,a);!t&&c&&(i(n,"addClass"),i(n,"removeClass"))}),{node:o,event:a,className:e,isClassBased:v,isSetClassOperation:c,before:function(n){g=n,r(y,C,function(){g=u,n()})},after:function(n){h=n,r($,b,function(){h=u,n()})},cancel:function(){C&&(l(C,function(n){(n||u)(!0)}),g(!0)),b&&(l(b,function(n){(n||u)(!0)}),h(!0))}}}}}function h(n,a,e,i,r,o,s){function u(t){var i="$animate:"+t;b&&b[i]&&b[i].length>0&&g(function(){e.triggerHandler(i,{event:n,className:a})})}function f(){u("before")}function c(){u("after")}function m(){u("close"),s&&g(function(){s()})}function C(){C.hasBeenRun||(C.hasBeenRun=!0,o())}function p(){if(!p.hasBeenRun){p.hasBeenRun=!0;var t=e.data(v);t&&(h&&h.isClassBased?$(e,a):(g(function(){var t=e.data(v)||{};N==t.index&&$(e,a,n)}),e.data(v,t))),m()}}var h=y(e,n,a);if(!h)return C(),f(),c(),void p();a=h.className;var b=t.element._data(h.node);b=b&&b.events,i||(i=r?r.parent():e.parent());var w=e.data(v)||{},S=w.active||{},k=w.totalActive||0,x=w.last,B=h.isClassBased?w.disabled||x&&!x.isClassBased:!1;if(B||D(e,i))return C(),f(),c(),void p();var F=!1;if(k>0){var M=[];if(h.isClassBased){if("setClass"==x.event)M.push(x),$(e,a);else if(S[a]){var E=S[a];E.event==n?F=!0:(M.push(E),$(e,a))}}else if("leave"==n&&S["ng-leave"])F=!0;else{for(var R in S)M.push(S[R]),$(e,R);S={},k=0}M.length>0&&l(M,function(n){n.cancel()})}if(!h.isClassBased||h.isSetClassOperation||F||(F="addClass"==n==e.hasClass(a)),F)return f(),c(),void m();"leave"==n&&e.one("$destroy",function(){var n=t.element(this),a=n.data(v);if(a){var e=a.active["ng-leave"];e&&(e.cancel(),$(n,"ng-leave"))}}),e.addClass(d);var N=A++;k++,S[a]=h,e.data(v,{last:h,active:S,index:N,totalActive:k}),f(),h.before(function(t){var i=e.data(v);t=t||!i||!i.active[a]||h.isClassBased&&i.active[a].event!=n,C(),t===!0?p():(c(),h.after(p))})}function b(n){var a=r(n);if(a){var e=t.isFunction(a.getElementsByClassName)?a.getElementsByClassName(d):a.querySelectorAll("."+d);l(e,function(n){n=t.element(n);var a=n.data(v);a&&a.active&&l(a.active,function(n){n.cancel()})})}}function $(n,t){if(s(n,c))m.disabled||(m.running=!1,m.structural=!1);else if(t){var a=n.data(v)||{},e=t===!0;!e&&a.active&&a.active[t]&&(a.totalActive--,delete a.active[t]),(e||!a.totalActive)&&(n.removeClass(d),n.removeData(v))}}function D(n,t){if(m.disabled)return!0;if(s(n,c))return m.disabled||m.running;do{if(0===t.length)break;var a=s(t,c),e=a?m:t.data(v),i=e&&(!!e.disabled||e.running||e.totalActive>0);if(a||i)return i;if(a)return!0}while(t=t.parent());return!0}var A=0;c.data(v,m),C.$$postDigest(function(){C.$$postDigest(function(){m.running=!1})});var w=i.classNameFilter(),S=w?function(n){return w.test(n)}:function(){return!0};return{enter:function(t,a,e,i){this.enabled(!1,t),n.enter(t,a,e),C.$$postDigest(function(){t=o(t),h("enter","ng-enter",t,a,e,u,i)})},leave:function(t,a){b(t),this.enabled(!1,t),C.$$postDigest(function(){h("leave","ng-leave",o(t),null,null,function(){n.leave(t)},a)})},move:function(t,a,e,i){b(t),this.enabled(!1,t),n.move(t,a,e),C.$$postDigest(function(){t=o(t),h("move","ng-move",t,a,e,u,i)})},addClass:function(t,a,e){t=o(t),h("addClass",a,t,null,null,function(){n.addClass(t,a)},e)},removeClass:function(t,a,e){t=o(t),h("removeClass",a,t,null,null,function(){n.removeClass(t,a)},e)},setClass:function(t,a,e,i){t=o(t),h("setClass",[a,e],t,null,null,function(){n.setClass(t,a,e)},i)},enabled:function(n,t){switch(arguments.length){case 2:if(n)$(t);else{var a=t.data(v)||{};a.disabled=!0,t.data(v,a)}break;case 1:m.disabled=!n;break;default:n=!m.disabled}return!!n}}}]),i.register("",["$window","$sniffer","$timeout","$$animateReflow",function(e,i,o,s){function f(n,t){T&&T(),L.push(t),T=s(function(){l(L,function(n){n()}),L=[],T=null,G={}})}function v(n,a){var e=r(n);n=t.element(e),X.push(n);var i=Date.now()+a;V>=i||(o.cancel(Q),V=i,Q=o(function(){d(X),X=[]},a,!1))}function d(n){l(n,function(n){var t=n.data(H);t&&(t.closeAnimationFn||u)()})}function m(n,t){var a=t?G[t]:null;if(!a){var i,r,o,s,u=0,f=0,v=0,d=0;l(n,function(n){if(n.nodeType==c){var t=e.getComputedStyle(n)||{};o=t[M+I],u=Math.max(g(o),u),s=t[M+O],i=t[M+W],f=Math.max(g(i),f),r=t[R+W],d=Math.max(g(r),d);var a=g(t[R+I]);a>0&&(a*=parseInt(t[R+j],10)||1),v=Math.max(a,v)}}),a={total:0,transitionPropertyStyle:s,transitionDurationStyle:o,transitionDelayStyle:i,transitionDelay:f,transitionDuration:u,animationDelayStyle:r,animationDelay:d,animationDuration:v},t&&(G[t]=a)}return a}function g(n){var a=0,e=t.isString(n)?n.split(/\s*,\s*/):[];return l(e,function(n){a=Math.max(parseFloat(n)||0,a)}),a}function C(n){var t=n.parent(),a=t.data(q);return a||(t.data(q,++J),a=J),a+"-"+r(n).getAttribute("class")}function p(n,t,a,e){var i=C(t),r=i+" "+a,o=G[r]?++G[r].total:0,s={};if(o>0){var l=a+"-stagger",f=i+" "+l,c=!G[f];c&&t.addClass(l),s=m(t,f),c&&t.removeClass(l)}e=e||function(n){return n()},t.addClass(a);var v=t.data(H)||{},d=e(function(){return m(t,r)}),g=d.transitionDuration,p=d.animationDuration;if(0===g&&0===p)return t.removeClass(a),!1;t.data(H,{running:v.running||0,itemIndex:o,stagger:s,timings:d,closeAnimationFn:u});var y=v.running>0||"setClass"==n;return g>0&&h(t,a,y),p>0&&s.animationDelay>0&&0===s.animationDuration&&b(t),!0}function y(n){return"ng-enter"==n||"ng-move"==n||"ng-leave"==n}function h(n,t,a){y(t)||!a?r(n).style[M+O]="none":n.addClass(K)}function b(n){r(n).style[R]="none 0s"}function $(n){var t=M+O,a=r(n);a.style[t]&&a.style[t].length>0&&(a.style[t]=""),n.removeClass(K)}function D(n){var t=R,a=r(n);a.style[t]&&a.style[t].length>0&&(a.style[t]="")}function A(n,t,a,e){function i(){t.off(h,o),t.removeClass(f),B(t,a);var n=r(t);for(var e in $)n.style.removeProperty($[e])}function o(n){n.stopPropagation();var t=n.originalEvent||n,a=t.$manualTimeStamp||t.timeStamp||Date.now(),i=parseFloat(t.elapsedTime.toFixed(U));Math.max(a-y,0)>=p&&i>=g&&e()}var s=r(t),u=t.data(H);if(-1==s.getAttribute("class").indexOf(a)||!u)return void e();var f="";l(a.split(" "),function(n,t){f+=(t>0?" ":"")+n+"-active"});var c=u.stagger,d=u.timings,m=u.itemIndex,g=Math.max(d.transitionDuration,d.animationDuration),C=Math.max(d.transitionDelay,d.animationDelay),p=C*z,y=Date.now(),h=N+" "+E,b="",$=[];if(d.transitionDuration>0){var D=d.transitionPropertyStyle;-1==D.indexOf("all")&&(b+=P+"transition-property: "+D+";",b+=P+"transition-duration: "+d.transitionDurationStyle+";",$.push(P+"transition-property"),$.push(P+"transition-duration"))}if(m>0){if(c.transitionDelay>0&&0===c.transitionDuration){var A=d.transitionDelayStyle;b+=P+"transition-delay: "+w(A,c.transitionDelay,m)+"; ",$.push(P+"transition-delay")}c.animationDelay>0&&0===c.animationDuration&&(b+=P+"animation-delay: "+w(d.animationDelayStyle,c.animationDelay,m)+"; ",$.push(P+"animation-delay"))}if($.length>0){var S=s.getAttribute("style")||"";s.setAttribute("style",S+" "+b)}t.on(h,o),t.addClass(f),u.closeAnimationFn=function(){i(),e()};var k=m*(Math.max(c.animationDelay,c.transitionDelay)||0),x=(C+g)*_,F=(k+x)*z;return u.running++,v(t,F),i}function w(n,t,a){var e="";return l(n.split(","),function(n,i){e+=(i>0?",":"")+(a*t+parseInt(n,10))+"s"}),e}function S(n,t,a,e){return p(n,t,a,e)?function(n){n&&B(t,a)}:void 0}function k(n,t,a,e){return t.data(H)?A(n,t,a,e):(B(t,a),void e())}function x(n,t,a,e){var i=S(n,t,a);if(!i)return void e();var r=i;return f(t,function(){$(t,a),D(t),r=k(n,t,a,e)}),function(n){(r||u)(n)}}function B(n,t){n.removeClass(t);var a=n.data(H);a&&(a.running&&a.running--,a.running&&0!==a.running||n.removeData(H))}function F(n,a){var e="";return n=t.isArray(n)?n:n.split(/\s+/),l(n,function(n,t){n&&n.length>0&&(e+=(t>0?" ":"")+n+a)}),e}var M,E,R,N,P="";n.ontransitionend===a&&n.onwebkittransitionend!==a?(P="-webkit-",M="WebkitTransition",E="webkitTransitionEnd transitionend"):(M="transition",E="transitionend"),n.onanimationend===a&&n.onwebkitanimationend!==a?(P="-webkit-",R="WebkitAnimation",N="webkitAnimationEnd animationend"):(R="animation",N="animationend");var T,I="Duration",O="Property",W="Delay",j="IterationCount",q="$$ngAnimateKey",H="$$ngAnimateCSS3Data",K="ng-animate-block-transitions",U=3,_=1.5,z=1e3,G={},J=0,L=[],Q=null,V=0,X=[];return{enter:function(n,t){return x("enter",n,"ng-enter",t)},leave:function(n,t){return x("leave",n,"ng-leave",t)},move:function(n,t){return x("move",n,"ng-move",t)},beforeSetClass:function(n,t,a,e){var i=F(a,"-remove")+" "+F(t,"-add"),r=S("setClass",n,i,function(e){var i=n.attr("class");n.removeClass(a),n.addClass(t);var r=e();return n.attr("class",i),r});return r?(f(n,function(){$(n,i),D(n),e()}),r):void e()},beforeAddClass:function(n,t,a){var e=S("addClass",n,F(t,"-add"),function(a){n.addClass(t);var e=a();return n.removeClass(t),e});return e?(f(n,function(){$(n,t),D(n),a()}),e):void a()},setClass:function(n,t,a,e){a=F(a,"-remove"),t=F(t,"-add");var i=a+" "+t;return k("setClass",n,i,e)},addClass:function(n,t,a){return k("addClass",n,F(t,"-add"),a)},beforeRemoveClass:function(n,t,a){var e=S("removeClass",n,F(t,"-remove"),function(a){var e=n.attr("class");n.removeClass(t);var i=a();return n.attr("class",e),i});return e?(f(n,function(){$(n,t),D(n),a()}),e):void a()},removeClass:function(n,t,a){return k("removeClass",n,F(t,"-remove"),a)}}}])}])}(window,window.angular);