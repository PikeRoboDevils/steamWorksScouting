(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('finalCtrl', finalCtrl);

	finalCtrl.$inject = [];

	function finalCtrl(){
		var vm = this;
		vm.matchParts	=	{
			// highFuel: 0,
			// lowFuel: 0,
			// gears: 0,
			// baseLine: false,
			red: false,
			yellow: false,
			tech: false,
			foul: false,
			win: false,
			lose: false,
			tie: false
		}

			// vm.increaseHighFuel = increaseHighFuel;
			// vm.decreaseHighFuel = decreaseHighFuel;
			// vm.increaseLowFuel = increaseLowFuel;
			// vm.decreaseLowFuel = decreaseLowFuel;
			// vm.submit = submit;
			// vm.toggleBaseline = toggleBaseline;
			vm.toggleRed = toggleRed;
			vm.toggleYellow = toggleYellow;
			vm.toggleTech = toggleTech;
			vm.toggleFoul = toggleFoul;
			vm.toggleWin = toggleWin;
			vm.toggleLose = toggleLose;
			vm.toggleTie = toggleTie;

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

			// function submit() {
			// 	var results = {
			// 		fuelPoints: 0,
			// 		gearPoints: 0,
			// 		basePoints: 0,
			// 		total: 0
			// 	};

			// 	results.fuelPoints = (vm.matchParts.highFuel) + (vm.matchParts.lowFuel * LOW_FUEL_CONSTANT);
			// 	results.basePoints += vm.matchParts.baseLine ? BASELINE_CONSTANT : 0;
			// 	results.total = results.fuelPoints + results.basePoints;
			// 	console.log(results);
			// }

			function toggleYellow(){
				vm.matchParts.yellow = !vm.matchParts.yellow;
			}

			function toggleRed(){
				vm.matchParts.red = !vm.matchParts.red;
			}

			function toggleTech(){
				vm.matchParts.tech = !vm.matchParts.tech;
			}

			function toggleFoul(){
				vm.matchParts.foul = !vm.matchParts.foul;
			}

			function toggleWin(){
				vm.matchParts.win = !vm.matchParts.win;
			}

			function toggleLose(){
				vm.matchParts.lose = !vm.matchParts.lose;
			}

			function toggleTie(){
				vm.matchParts.tie = !vm.matchParts.tie;
			}

	}
})();