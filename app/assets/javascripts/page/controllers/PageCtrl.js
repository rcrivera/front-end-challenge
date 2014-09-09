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
			$('#sending_gif').show();
			pageService.sendMessage($('#recipients').tagsinput('items'),$scope.message).success(function(response){
				$('#sending_gif').hide();
		  	if(response.meta.code == 200){
		  		$scope.clear();
				  alert('Your message was sent successfully.');
		  	}
		  	else{
		  		alert('Dude! Try sending your message later.');
		  	}
    	});
		};

		$scope.clear = function(){
			$scope.message = "";
			$('#recipients').tagsinput('removeAll');
		};

}]);