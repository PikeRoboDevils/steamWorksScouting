(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('teleOpCtrl', teleOpCtrl, '$state');

	teleOpCtrl.$inject = ['MatchSvc', '$scope', '$state'];

	function teleOpCtrl(MatchSvc, $scope, $state){
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});
		
		var vm = this;

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;

		vm.matchParts	=	{
			switchCube: 0,
			scaleCube: 0,
			gears: vm.match.autoScore.gearTotal,
			rotors: vm.match.autoScore.rotorTotal,
			climbSuccess: false,
			climbAttempt: false,
			climbPosition: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
			playStyle: {
				id: 1,
				label: 'Offensive',
				value: 'OFFENSIVE'
				}
			}

		vm.climbPositions = [
			{
				id: 0,
				label: 'None',
				value: 'NONE'
			},
			{
				id: 1,
				label: 'Outside',
				value: 'OUTSIDE'
			},
			{
				id: 2,
				label: 'Middle',
				value: 'MIDDLE'
			}
		];

		vm.playStyles = [
			{
				id: 1,
				label: 'Offensive',
				value: 'OFFENSIVE'
			},
			{
				id: 2,
				label: 'Defensive',
				value: 'DEFENSIVE'
			}
		];

			vm.increaseSwitchCube1 = increaseSwitchCube1;
			vm.decreaseSwitchCube1 = decreaseSwitchCube1;
			vm.increaseScaleCube1 = increaseScaleCube1;
			vm.decreaseScaleCube1 = decreaseScaleCube1;
			vm.toggleclimbSuccess = toggleclimbSuccess;
			vm.increaseGears = increaseGears;
			vm.decreaseGears = decreaseGears;
			vm.increaseRotors = increaseRotors;
            vm.decreaseRotors = decreaseRotors;
            vm.toggleClimbAttempt = toggleClimbAttempt;
            vm.didClimb = didClimb;
            vm.validClimbPos = validClimbPos;

			init();

			function init() {
				console.log(vm.match);
			}

			function decreaseSwitchCube1() {
				if(vm.matchParts.switchCube - 1 >= 0) {
					vm.matchParts.switchCube -= 1;
				}
			}

			function increaseSwitchCube1() {
				vm.matchParts.switchCube += 1;
			}

			function decreaseScaleCube1() {
				if(vm.matchParts.scaleCube - 1 >= 0) {
					vm.matchParts.lowFuel -= 1;
				}
			}

			function increaseScaleCube1() {
				vm.matchParts.scaleCube += 1;
			}

			function increaseGears(){
                if(vm.matchParts.gears < 12){
                	vm.matchParts.gears++;
                }
            }
    
            function decreaseGears(){
                if(vm.matchParts.gears > vm.match.autoScore.gearTotal){
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

            function hasClimbed(){
            	return vm.matchParts.climbSuccess;
            }

            function didClimb(){
            	if(!hasClimbed()) {
            		vm.matchParts.climbPosition = {
            			id: 0,
					label: 'None',
					value: 'NONE'
				};
            	}
            }

            function validClimbPos() {
            	var answer = true;
            	if(vm.matchParts.climbSuccess){
            		if(vm.matchParts.climbPosition.value === 'NONE') {
            			answer = false;
            		}
            	}


            	return answer;
            }

			function submit() {
				var teleScore = {
					switchPoints: 0,
					scalePoints: 0,
					vaultPoints: 0,
					climbPoints: 0,
					total: 0,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					climbPosition: vm.matchParts.climbPosition.value,
					playStyle: vm.matchParts.playStyle.value
				};

				teleScore.switchPoints = (vm.matchParts.switchCube * MatchSvc.constants.TELE_SWITCH_CUBE_CONSTANT);
				teleScore.scalePoints = (vm.matchParts.scaleCube * MatchSvc.constants.TELE_SCALE_CUBE_CONSTANT);
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;
				teleScore.rotorPoints = (vm.matchParts.rotors - vm.match.autoScore.rotorTotal) * MatchSvc.constants.TELE_ROTORS;
				teleScore.gearTotal = vm.matchParts.gears - vm.match.autoScore.gearTotal;
				teleScore.rotorTotal = (vm.matchParts.rotors - vm.match.autoScore.rotorTotal);
				teleScore.total = teleScore.fuelPoints + teleScore.climbPoints + teleScore.rotorPoints;

				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.results');
			}

			function toggleclimbSuccess(){
				vm.matchParts.climbSuccess = !vm.matchParts.climbSuccess;
				didClimb();
			}

			function toggleClimbAttempt(){
				vm.matchParts.climbAttempt = !vm.matchParts.climbAttempt;
			}

	}
})();