(function() {
	'use strict';
	angular
		.module('steamWorks')
		.controller('autoCtrl', autoCtrl);

		autoCtrl.$inject = ['MatchSvc', '$scope', '$state'];

		function autoCtrl(MatchSvc, $scope, $state) {
			$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
			    viewData.enableBack = true;
			});
			
			var vm = this;
        
			vm.match = MatchSvc.getMatch();
            vm.submit = submit;
           

			vm.matchProperties = {
				highFuel: 0,
				lowFuel: 0,
				gears: 0,
				rotors: 0,
				baseLine: false,
				gearAttempt: false,
				placement: {
					id: 0,
					label: 'None',
					value: 'NONE'
				}
			}

			vm.gearPositions = [
				{
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				{
					id: 1,
					label: 'Left',
					value: 'LEFT'
				},
				{
					id: 2,
					label: 'Center',
					value: 'CENTER'
				},
				{
					id: 3,
					label: 'Right',
					value: 'RIGHT'
				}
			];

			vm.increaseHighFuel1 = increaseHighFuel1;
			vm.increaseHighFuel5 = increaseHighFuel5;
			vm.decreaseHighFuel1 = decreaseHighFuel1;
			vm.decreaseHighFuel5 = decreaseHighFuel5;
			vm.increaseLowFuel1 = increaseLowFuel1;
			vm.increaseLowFuel5 = increaseLowFuel5;
			vm.decreaseLowFuel1 = decreaseLowFuel1;
			vm.decreaseLowFuel5 = decreaseLowFuel5;
			vm.toggleBaseline = toggleBaseline;
            vm.increaseGears= increaseGears;
            vm.decreaseGears = decreaseGears;
            vm.increaseRotors = increaseRotors;
            vm.decreaseRotors = decreaseRotors;
            vm.hasGears = hasGears;
            vm.validGearPos = validGearPos;

            init();

			function init() {
				console.log(vm.match);
			}

			function decreaseHighFuel1() {
				if(vm.matchProperties.highFuel - 1 >= 0) {
					vm.matchProperties.highFuel -= 1;
				}
			}

			function decreaseHighFuel5() {
				if(vm.matchProperties.highFuel - 5 >= 0) {
					vm.matchProperties.highFuel -= 5;
				}
			}

			function increaseHighFuel1() {
				vm.matchProperties.highFuel += 1;
			}

			function increaseHighFuel5() {
				vm.matchProperties.highFuel += 5;
			}

			function decreaseLowFuel1() {
				if(vm.matchProperties.lowFuel - 1 >= 0) {
					vm.matchProperties.lowFuel -= 1;
				}
			}

			function decreaseLowFuel5() {
				if(vm.matchProperties.lowFuel - 5 >= 0) {
					vm.matchProperties.lowFuel -= 5;
				}
			}

			function increaseLowFuel1() {
				vm.matchProperties.lowFuel += 1;
			}

			function increaseLowFuel5() {
				vm.matchProperties.lowFuel += 5;
			}

            function increaseGears(){
                if(vm.matchProperties.gears < 12){
                	vm.matchProperties.gears++;
                }
            }
    
            function decreaseGears(){
                if(vm.matchProperties.gears > 0){
                vm.matchProperties.gears--;
            	}
            	gearValueChange();
            }

            function increaseRotors(){
                if(vm.matchProperties.rotors < 4){
                	vm.matchProperties.rotors++;
                }
            }
    
            function decreaseRotors(){
                if(vm.matchProperties.rotors > 0){
                	vm.matchProperties.rotors--;
                }
            }

            function hasGears() {
				return vm.matchProperties.gears > 0;
			}

			function gearValueChange() {
				if(!hasGears()) {
					vm.matchProperties.placement = {
					id: 0,
					label: 'None',
					value: 'NONE'
				};
				}
			}

			function validGearPos() {
            	var answer = true;
            	if(vm.matchProperties.gears >= 1){
            		if(vm.matchProperties.placement.value === 'NONE') {
            			answer = false;
            		}
            	}


            	return answer;
            }

			function submit() {
				var autoScore = {
					fuelPoints: 0,
					rotorPoints: 0,
					basePoints: 0,
					gearTotal: 0,
					gearAttempt: vm.matchProperties.gearAttempt,
					rotorTotal: 0,
					total: 0,
					baseLine: vm.matchProperties.baseLine,
					placement: vm.matchProperties.placement.value
				};

				autoScore.fuelPoints = (vm.matchProperties.highFuel) + (vm.matchProperties.lowFuel * MatchSvc.constants.AUTO_LOW_FUEL_CONSTANT);
				autoScore.basePoints += vm.matchProperties.baseLine ? MatchSvc.constants.BASELINE_CONSTANT : 0;
				autoScore.rotorPoints = vm.matchProperties.rotors * MatchSvc.constants.AUTO_ROTORS;
				autoScore.rotorTotal = vm.matchProperties.rotors;
				autoScore.gearTotal = vm.matchProperties.gears;
				autoScore.total = autoScore.fuelPoints + autoScore.basePoints + autoScore.rotorPoints;

				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.teleOp');
			}

			function toggleBaseline(){
				vm.matchProperties.baseLine = !vm.matchProperties.baseLine;
			}
         	
		}     
})();