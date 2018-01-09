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
				switch: 0,
				scale: 0,
				gears: 0,
                vault: 0,
				rotors: 0,
				autoRun: false,
				gearAttempt: false,
				gearSuccess: false,
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

			vm.increaseSwitch1 = increaseSwitch1;
			//vm.increaseSwitch5 = increaseSwitch5;
			vm.decreaseSwitch1 = decreaseSwitch1;
			//vm.decreaseSwitch5 = decreaseSwitch5;
			vm.increaseScale1 = increaseScale1;
			//vm.increaseScale5 = increaseScale5;
			vm.decreaseScale1 = decreaseScale1;
			//vm.decreaseScale5 = decreaseScale5;
			vm.toggleAutoRun = toggleAutoRun;
            vm.decreaseGears = decreaseGears;
            vm.increaseRotors = increaseRotors;
            vm.decreaseRotors = decreaseRotors;
            vm.validGearPos = validGearPos;
            vm.increaseVault1 = increaseVault1;
            vm.decreaseVault1 = decreaseVault1;

            init();

			function init() {
				console.log(vm.match);
			}

			function decreaseSwitch1() {
				if(vm.matchProperties.switch - 1 >= 0) {
					vm.matchProperties.switch -= 1;
				}
			}

			/*function decreaseHighFuel5() {
				if(vm.matchProperties.highFuel - 5 >= 0) {
					vm.matchProperties.highFuel -= 5;
				}
			} */

			function increaseSwitch1() {
				vm.matchProperties.switch += 1;
			}

			/*function increaseHighFuel5() {
				vm.matchProperties.highFuel += 5;
			} */

			function decreaseScale1() {
				if(vm.matchProperties.scale - 1 >= 0) {
					vm.matchProperties.scale -= 1;
				}
			}

			/*function decreaseLowFuel5() {
				if(vm.matchProperties.lowFuel - 5 >= 0) {
					vm.matchProperties.lowFuel -= 5;
				}
			} */

			function increaseScale1() {
				vm.matchProperties.scale += 1;
			}

			/* function increaseLowFuel5() {
				vm.matchProperties.lowFuel += 5;
			} */
            function decreaseVault1() {
				if(vm.matchProperties.vault - 1 >= 0) {
					vm.matchProperties.vault -= 1;
				}
                
                
			}
            function increaseVault1() {
				vm.matchProperties.vault += 1;
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
					autoRun: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value
				};

				autoScore.fuelPoints = (vm.matchProperties.highFuel) + (vm.matchProperties.lowFuel * MatchSvc.constants.AUTO_LOW_FUEL_CONSTANT);
				autoScore.basePoints += vm.matchProperties.autoRun ? MatchSvc.constants.BASELINE_CONSTANT : 0;
				autoScore.rotorPoints = vm.matchProperties.rotors * MatchSvc.constants.AUTO_ROTORS;
				autoScore.rotorTotal = vm.matchProperties.rotors;
				autoScore.gearTotal = vm.matchProperties.gearSuccess ? 1 : 0;
				autoScore.total = autoScore.fuelPoints + autoScore.basePoints + autoScore.rotorPoints;

				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.teleOp');
			}

			function toggleAutoRun(){
				vm.matchProperties.autoRun = !vm.matchProperties.autoRun;
			}
         	
		}     
})();