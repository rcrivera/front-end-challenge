"use strict";

/* JShint config settings */
/* jshint -W097 */
/* global angular */

angular.module("yiftee.services").factory('pageService', [
'$http',
'$q',
function($http, $q){

	var pageService = {};
	var initPromise = $q.defer();
	
	pageService.initPromise = initPromise.promise;

	pageService.sendMessage = function(recipients, message){
		return $http({
		    url: '/programming_challenge/send',
		    method: "POST",
		    data: { 'recipients' : recipients, 'message' : message }
		});

	};

	pageService.autocomplete = function(){
		var contacts = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
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
		      			to_return.push({ value: contact['email'], name: contact['name']});
		      		};
		      		if ($.inArray(contact['phone'], included) < 0) {
		      			to_return.push({ value: contact['phone'], name: contact['name']});
		      		};
		      		return to_return;
		      	}
		      	else{
		      		var to_return = [];
		      		if (contact['email'].toLowerCase().indexOf(query) >= 0 && $.inArray(contact['email'], included) < 0) {
			      		to_return.push({ value: contact['email'], name: contact['name']});
			      	};
			      	if (contact['phone'].toLowerCase().indexOf(query) >= 0 && $.inArray(contact['phone'], included) < 0) {
			      		to_return.push({ value: contact['phone'], name: contact['name']});
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
		    nameKey: 'name',
		    valueKey: 'value',
		    source: contacts.ttAdapter(),
		    templates: {
			    suggestion: Handlebars.compile('<p><strong>{{name}}</strong> – {{value}}</p>')
			  }
		  }
		});		
	};

	pageService.addContact = function(event){
		var contact = event.item
		return $http({
		    url: '/programming_challenge/add',
		    method: "POST",
		    data: { 'contact' : contact }
		});
	};

	return pageService;

}]);