(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('resultsCtrl', resultsCtrl);

	resultsCtrl.$inject = [];

	function resultsCtrl() {
		var vm = this;

		vm.foo='ONE BILLION POINTS FOR GRIFFINDOR';
	}
})();
