(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('endCtrl', endCtrl);

	endCtrl.$inject = ['MatchSvc', '$state'];

	function endCtrl(MatchSvc, $state) {
		var vm = this;

		vm.match = MatchSvc.getMatch();
		}
	})();