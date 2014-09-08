"use strict";

/* JShint config settings */
/* jshint -W097 */
/* global angular */

angular.module("page.controllers").controller("PageCtrl", [
	'$scope',
	'$log',
	'$window',
	'$interval',
	'$http',
	'$modal',
	'$location',
	'$anchorScroll',
	'pageService',
	function($scope, $log, $window, $interval, $http, $modal, $location, $anchorScroll, pageService){
		$scope.pageService = pageService;

		pageService.autocomplete();

		$('#recipients').on('beforeItemAdd', function(event) {
		  pageService.addContact(event).success(function(response){
		  	if(response.meta.code != 200){
				  $('#recipients').tagsinput('remove', event.item);
				  alert('Invalid input: ' + event.item +'\nPlease enter valid email or phone number.');
		  	};
    	});

		});
		 
		$scope.send_message = function(){
			$scope.message = 'This is message';
			$scope.recipients = $('#recipients').val();
		};

}]);