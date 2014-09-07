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

		var contacts = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  remote: {
		    url: '/programming_challenge/autocomplete?q=%QUERY',
		    filter: function(list) {
		      return $.map(list['response']['contacts'], function(contact) {
		        return { name: contact['name']}; });
		    }
		  }
		});

		contacts.initialize();

		$('#recipients').tagsinput({
		  typeaheadjs: {
		    name: 'contacts',
		    displayKey: 'name',
		    valueKey: 'name',
		    source: contacts.ttAdapter()
		  }
		});

		$scope.send_message = function(){
			$scope.message = 'This is message';
			$scope.recipients = $('#recipients').val();
		};

}]);