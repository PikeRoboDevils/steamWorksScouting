(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('teleOpCtrl', teleOpCtrl, '$state');

	teleOpCtrl.$inject = ['$state'];
    
    	var LOW_FUEL_CONSTANT = (1/3),
			BASELINE_CONSTANT = 5;


	function teleOpCtrl($state){
		var vm = this;
		vm.matchParts	=	{
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

			function decreaseHighFuel() {
				if(vm.matchParts.highFuel - 1 >= 0) {
					vm.matchParts.highFuel -= 1;
				}
			}

			function increaseHighFuel() {
				vm.matchParts.highFuel += 1;
			}

			function decreaseLowFuel() {
				if(vm.matchParts.lowFuel - 1 >= 0) {
					vm.matchParts.lowFuel -= 1;
				}
			}

			function increaseLowFuel() {
				vm.matchParts.lowFuel += 1;
			}

			function submit() {
				var results = {
					fuelPoints: 0,
					gearPoints: 0,
					basePoints: 0,
					total: 0
				};

				results.fuelPoints = (vm.matchParts.highFuel) + (vm.matchParts.lowFuel * LOW_FUEL_CONSTANT);
				results.basePoints += vm.matchParts.baseLine ? BASELINE_CONSTANT : 0;
				results.total = results.fuelPoints + results.basePoints;
				console.log(results);
                
                $state.go('app.final');
			}
            
            

			function toggleBaseline(){
				vm.matchParts.baseLine = !vm.matchParts.baseLine;
			}

	}
})();