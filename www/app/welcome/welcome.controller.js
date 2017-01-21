(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('welcomeCtrl', welcomeCtrl);

	welcomeCtrl.$inject = [];

	function welcomeCtrl(){
		var vm = this;

		vm.matchProperties = {
			matchNumber: null,
			teamNumber: null,
            scoutName: null
		};

		vm.isFormValid = isFormValid;
		vm.submit = submit;

		function isFormValid() {
			var matchNumber = _.toString(vm.matchProperties.matchNumber),
				teamNumber = _.toString(vm.matchProperties.teamNumber),
                scoutName = (vm.matchProperties.teamScoutName);
                
			return !((matchNumber.length >= 2) && (teamNumber.length >= 2) && (scoutName.length >= 3));
		}

		function submit() {
			console.log(vm.matchProperties);
		}
	}
})();