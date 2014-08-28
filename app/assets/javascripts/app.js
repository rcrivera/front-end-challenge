var app = angular.module('front-end-challenge', ['ngResource'])

app.config([
	"$httpProvider", function($httpProvider) {
		$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);