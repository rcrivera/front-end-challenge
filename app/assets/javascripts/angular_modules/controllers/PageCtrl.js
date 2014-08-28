"use strict";

app.controller('PageCtrl', function ($scope, pageService) {
	var contacts = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: {
	    url: '/contacts.json',
	    filter: function(list) {
	      return $.map(list, function(contact) {
	        return { name: contact}; });
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


});