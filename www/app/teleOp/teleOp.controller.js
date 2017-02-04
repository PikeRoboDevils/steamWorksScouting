(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('teleOpCtrl', teleOpCtrl, '$state');

	teleOpCtrl.$inject = ['MatchSvc', '$state'];

	var LOW_FUEL_CONSTANT = (1/9),
		HIGH_FUEL_CONSTANT = (1/3),
		CLIMB_CONSTANT = 50,
		CLIMB = 50,
		ROTORS = 40;

	function teleOpCtrl(MatchSvc, $state){
		var vm = this;

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;

		vm.matchParts	=	{
			highFuel: 0,
			lowFuel: 0,
			gears: 0,
			rotors: vm.match.autoScore.rotorTotal,
			climb: false
		}

			vm.increaseHighFuel1 = increaseHighFuel1;
			vm.increaseHighFuel5 = increaseHighFuel5;
			vm.decreaseHighFuel1 = decreaseHighFuel1;
			vm.decreaseHighFuel5 = decreaseHighFuel5;
			vm.increaseLowFuel1 = increaseLowFuel1;
			vm.increaseLowFuel5 = increaseLowFuel5;
			vm.increaseLowFuel20 = increaseLowFuel20;
			vm.decreaseLowFuel1 = decreaseLowFuel1;
			vm.decreaseLowFuel5 = decreaseLowFuel5;
			vm.toggleClimb = toggleClimb;
			vm.increaseGears = increaseGears;
			vm.decreaseGears = decreaseGears;
			vm.increaseRotors = increaseRotors;
            vm.decreaseRotors = decreaseRotors;

			init();

			function init() {
				console.log(vm.match);
			}

			function decreaseHighFuel1() {
				if(vm.matchParts.highFuel - 1 >= 0) {
					vm.matchParts.highFuel -= 1;
				}
			}

			function decreaseHighFuel5() {
				if(vm.matchParts.highFuel - 5 >= 0) {
					vm.matchParts.highFuel -= 5;
				}
			}

			function increaseHighFuel1() {
				vm.matchParts.highFuel += 1;
			}

			function increaseHighFuel5() {
				vm.matchParts.highFuel += 5;
			}

			function decreaseLowFuel1() {
				if(vm.matchParts.lowFuel - 1 >= 0) {
					vm.matchParts.lowFuel -= 1;
				}
			}

			function decreaseLowFuel5() {
				if(vm.matchParts.lowFuel - 5 >= 0) {
					vm.matchParts.lowFuel -= 5;
				}
			}

			function increaseLowFuel1() {
				vm.matchParts.lowFuel += 1;
			}

			function increaseLowFuel5() {
				vm.matchParts.lowFuel += 5;
			}

			function increaseLowFuel20() {
				vm.matchParts.lowFuel += 20;
			}

			function increaseGears(){
                if(vm.matchParts.gears < 12){
                	vm.matchParts.gears++;
                }
            }
    
            function decreaseGears(){
                if(vm.matchParts.gears > 0){
                	vm.matchParts.gears--;
                }
            }

			function increaseRotors(){
                if(vm.matchParts.rotors < 4){
                	vm.matchParts.rotors++;
                }
            }
    
            function decreaseRotors(){
                if(vm.matchParts.rotors > vm.match.autoScore.rotorTotal){
                	vm.matchParts.rotors--;
                }
            }

			function submit() {
				var teleScore = {
					fuelPoints: 0,
					rotorPoints: 0,
					gearTotal: 0,
					rotorTotal: 0,
					basePoints: 0,
					total: 0,
					climb: vm.matchParts.climb
				};

				teleScore.fuelPoints = (vm.matchParts.highFuel * HIGH_FUEL_CONSTANT) + (vm.matchParts.lowFuel * LOW_FUEL_CONSTANT);
				teleScore.basePoints += vm.matchParts.climb ? CLIMB_CONSTANT : 0;
				teleScore.rotorPoints = (vm.matchParts.rotors - vm.match.autoScore.rotorTotal) * ROTORS;
				teleScore.gearTotal = vm.matchParts.gears;
				teleScore.rotorTotal = (vm.matchParts.rotors - vm.match.autoScore.rotorTotal);
				teleScore.total = teleScore.fuelPoints + teleScore.basePoints;
				
				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.final');
			}

			function toggleClimb(){
				vm.matchParts.climb = !vm.matchParts.climb;
			}

	}
})();