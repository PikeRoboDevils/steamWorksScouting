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
            parking: 0,
            exchangeCube: 0,
            vaultCube: 0,
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
				},
            powerUp: {
                id: 2,
                lable: 'None',
                value: 'NONE'
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

        vm.powerUps = [
            {
                id: 2,
                label: 'Boost',
                value: 'BOOST'
            },
            {
                id: 3,
                label: 'Force',
                value: 'FORCE'
            },
            {
                id: 4,
                label: 'Levitate',
                value: 'LEVITATE'
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
			vm.increaseExchangeCube1 = increaseExchangeCube1;
			vm.decreaseExchangeCube1 = decreaseExchangeCube1;
			vm.increaseVaultCube1 = increaseVaultCube1;
            vm.decreaseVaultCube1 = decreaseVaultCube1;
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
        
            function decreaseExchangeCube1() {
				if(vm.matchParts.exchangeCube - 1 >= 0) {
					vm.matchParts.exchangeCube -= 1;
				}
			}
        
            function increaseExchangeCube1() {
				vm.matchParts.exchangeCube += 1;
			}
            
        //makes sure that user can't exceed past 9 cubes delivered to the vault
			function increaseVaultCube1() {
                if (vm.matchParts.vaultCube - 8 <= 0) {
				vm.matchParts.vaultCube += 1;
                }
			}
        
            function decreaseVaultCube1() {
				if(vm.matchParts.vaultCube - 1 >= 0) {
					vm.matchParts.vaultCube -= 1;
				}
			}

			function decreaseScaleCube1() {
				if(vm.matchParts.scaleCube - 1 >= 0) {
					vm.matchParts.scaleCube -= 1;
				}
			}

			function increaseScaleCube1() {
				vm.matchParts.scaleCube += 1;
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
					vaultPoints: 0,
					climbPoints: 0,
					total: 0,
					parking: vm.matchParts.parking,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					playStyle: vm.matchParts.playStyle.value,
                    powerUp: vm.matchParts.powerUp.value,
                    switchCube: vm.matchParts.switchCube,
                    scaleCube: vm.matchParts.scaleCube,
                    exchangeCube: vm.matchParts.exchangeCube,
                    vaultCube: vm.matchParts.vaultCube
				};

               
                teleScore.vaultPoints = (vm.matchParts.vaultCube * MatchSvc.constants.TELE_VAULT_CUBE_CONSTANT);
                
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;
                
				teleScore.parking = (vm.matchParts.parking * MatchSvc.constants.TELE_PARKING_CONSTANT);

				teleScore.total = teleScore.vaultPoints + teleScore.climbPoints + teleScore.parking;
                
                teleScore.cubes = teleScore.switchCube + teleScore.scaleCube + teleScore.exchangeCube + teleScore.vaultCube;

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