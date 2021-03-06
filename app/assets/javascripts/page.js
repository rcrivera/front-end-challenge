"use strict";

var pageApp = angular.module('pageApp', [
	'page.controllers',
	'page.directives',
	'yiftee.directives',
	'yiftee.services',
	'yiftee.filters',
	'ngRoute',
]);

angular.module("page.controllers", ['ui.bootstrap']);
angular.module("page.directives", []);
angular.module("yiftee.services", []);
angular.module("yiftee.filters", []);
angular.module("yiftee.directives", []);

pageApp.config([
"$httpProvider",
function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

}]);


pageApp.run(function() {
  FastClick.attach(document.body);
});