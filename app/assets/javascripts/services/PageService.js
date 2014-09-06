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
		

	};

	pageService.autocomplete = function(input_text){
		
		
	};

	pageService.addContact = function(contact){
		
		
	};

	return pageService;

}]);