"use strict";

app.factory('pageService', ['$http', '$q', function($http, $q){
	var pageService = {};
	var initPromise = $q.defer();
	
	pageService.initPromise = initPromise.promise;

	pageService.sendMessage = function(recipients, message){
		var request = $http({
                    method: "post",
                    url: "/programming_challenge/send",
\                   data: {
                        recipients: recipients,
                        message: message
                    }
                });
 
                // Store the data-dump of the FORM scope.
                request.success(
                    function( html ) {
 
                        $scope.cfdump = html;
 
                    }
                );
		
	};

	pageService.autocomplete = function(input_text){
		
	};

	pageService.addContact = function(contact){
		
	};

	return pageService;
}]);