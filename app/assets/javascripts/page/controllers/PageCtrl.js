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
		$scope.recipients = "";

		var contacts = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('display'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  remote: {
		    url: '/programming_challenge/autocomplete?q=%QUERY',
		    filter: function(list) {
		    	var query = list['response']['query'];
		    	var included = $('#recipients').tagsinput('items');
		      return $.map(list['response']['contacts'], function(contact) {
		      	if (contact['name'].toLowerCase().indexOf(query) >= 0 ) {
		      		var to_return = [];
		      		if ($.inArray(contact['email'], included) < 0) {
		      			to_return.push({ value: contact['email'], display: contact['name']});
		      		};
		      		if ($.inArray(contact['phone'], included) < 0) {
		      			to_return.push({ value: contact['phone'], display: contact['name']});
		      		};
		      		return to_return;
		      	}
		      	else{
		      		var to_return = [];
		      		if (contact['email'].toLowerCase().indexOf(query) >= 0 && $.inArray(contact['email'], included) < 0) {
			      		to_return.push({ value: contact['email'], display: contact['name']});
			      	};
			      	if (contact['phone'].toLowerCase().indexOf(query) >= 0 && $.inArray(contact['phone'], included) < 0) {
			      		to_return.push({ value: contact['phone'], display: contact['name']});
			      	};
			      	return to_return;
		      	}
		      });
		    }
		  }
		});

		contacts.initialize();

		$('#recipients').tagsinput({
		  typeaheadjs: {
		    name: 'contacts',
		    displayKey: 'display',
		    valueKey: 'value',
		    source: contacts.ttAdapter(),
		    templates: {
			    suggestion: Handlebars.compile('<p><strong>{{display}}</strong> – {{value}}</p>')
			  }
		  }
		});

		$scope.send_message = function(){
			$scope.message = 'This is message';
			$scope.recipients = $('#recipients').val();
		};

}]);