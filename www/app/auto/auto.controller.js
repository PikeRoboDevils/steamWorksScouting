(function() {
	'use strict';
	angular
		.module('steamWorks')
		.controller('autoCtrl', autoCtrl);

		autoCtrl.$inject = [];

		var LOW_FUEL_CONSTANT = (1/3),
			BASELINE_CONSTANT = 5;

		function autoCtrl() {
			var vm = this;

			vm.matchProperties = {
				highFuel: 0,
				lowFuel: 0,
				gears: 0,
				baseLine: false
			}

			vm.increaseProp = increaseProp;
			vm.decreaseProp = decreaseProp;
			vm.submit = submit;
			vm.toggleBaseline = toggleBaseline;

			function decreaseProp(prop) {
				if(vm.matchProperties[prop] - 1 >= 0) {
					vm.matchProperties[prop] -= 1;
				}
			}

			function increaseProp(prop) {
				vm.matchProperties[prop] += 1;
			}

			function submit() {
				var results = {
					fuelPoints: 0,
					gearPoints: 0,
					basePoints: 0,
					total: 0
				};

				results.fuelPoints = (vm.matchProperties.highFuel) + (vm.matchProperties.lowFuel * LOW_FUEL_CONSTANT);
				results.basePoints += vm.matchProperties.baseLine ? BASELINE_CONSTANT : 0;
				results.total = results.fuelPoints + results.basePoints;

				console.log(results);
			}

			function toggleBaseline(){
				vm.matchProperties.baseLine = !vm.matchProperties.baseLine;
			}
		}
})();