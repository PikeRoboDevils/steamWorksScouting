(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('welcomeCtrl', welcomeCtrl);

	welcomeCtrl.$inject = ['MatchSvc', '$state'];

	function welcomeCtrl(MatchSvc, $state){
		var vm = this;

		vm.matchProperties = {
			matchNumber: null,
			teamNumber: null,
            scoutName: null
		};

		vm.isFormValid = isFormValid;
		vm.submit = submit;
		vm.foobar = foobar;

		init();
	
		function init() {
			MatchSvc.beginMatch();
		}

		function isFormValid() {
			var matchNumber = _.toString(vm.matchProperties.matchNumber),
				teamNumber = _.toString(vm.matchProperties.teamNumber),
                scoutName = _.toString(vm.matchProperties.teamScoutName);
                
			return !((matchNumber.length >= 2) && (teamNumber.length >= 2) && (scoutName.length >= 3));
		}

		function foobar() {
			MatchSvc.hello();
		}

		function submit() {
			MatchSvc.updateMatch(vm.matchProperties);
			$state.go('app.auto');
		}
	}
})();