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

			vm.increaseHighFuel = increaseHighFuel;
			vm.decreaseHighFuel = decreaseHighFuel;
			vm.increaseLowFuel = increaseLowFuel;
			vm.decreaseLowFuel = decreaseLowFuel;
			vm.submit = submit;
			vm.toggleBaseline = toggleBaseline;
<<<<<<< Updated upstream
=======
            vm.increaseGears= increaseGears;
            vm.decreaseGears = decreaseGears;
            
>>>>>>> Stashed changes

			function decreaseHighFuel() {
				if(vm.matchProperties.highFuel - 1 >= 0) {
					vm.matchProperties.highFuel -= 1;
				}
			}

			function increaseHighFuel() {
				vm.matchProperties.highFuel += 1;
			}

			function decreaseLowFuel() {
				if(vm.matchProperties.lowFuel - 1 >= 0) {
					vm.matchProperties.lowFuel -= 1;
				}
			}

			function increaseLowFuel() {
				vm.matchProperties.lowFuel += 1;
			}
<<<<<<< Updated upstream
=======
            function increaseGears(){
                vm.matchProperties.gears += 1;
            }
    
            function decreaseGears(){
                if(vm.matchProperties.gears)
                vm.matchProperties.gears-=1;
            }
>>>>>>> Stashed changes

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