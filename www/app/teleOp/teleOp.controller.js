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
			rocketCargo: 0,
			hatchDropped: 0, 
			cargoDropped: 0,
			rocketHatch: 0,
			stationCargo: 0,
			stationHatch: 0,
			loadingCargo: 0,
			loadingHatch: 0,
			switchCube: 0,
            cubeDropped: 0,
			scaleCube: 0,
            total: 0,
            vaultPoints: 0,
            climbPoints: 0,
            parking: 0,
            exchangeCube: 0,
            vaultCube: 0,
            outPortal: 0,
            levitatePoints: 0,
            outExchange: 0,
            breakdown: false,
			climbSuccess: false,
			defending: false,
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
                label: 'None',
                value: 'NONE'
            },

            foul: {
            	id: 5,
                label: 'None',
                value: 'NONE'
            },

            rocketLevel: {
            	id: 1,
                label: 'Level 1',
                value: 'level1'
               },
            climbLevel: {
            	id: 1,
                label: 'Level 1',
                value: 'level1'
               }
			};

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

		vm.rocketLevels = [
			{
				id: 1,
				label: 'Level 1',
				value: 'level1'
			},
			{
				id: 2,
				label: 'Level 2',
				value: 'level2'
			},
			{
				id: 3,
				label: 'Level 3',
				value: 'level3'
			}
		];
		vm.climbLevels = [
			{
				id: 1,
				label: 'Level 1',
				value: 'level1'
			},
			{
				id: 2,
				label: 'Level 2',
				value: 'level2'
			},
			{
				id: 3,
				label: 'Level 3',
				value: 'level3'
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
		vm.fouls = [
			{
				id: 1,
				label: 'Foul',
				value: 'FOUL'
			},
			{
				id: 2,
				label: 'Technical Foul',
				value: 'TECH'
			},
			{
				id: 3,
				label: 'Yellow Card',
				value: 'YELLOW CARD'
			},
			{
				id: 4,
				label: 'Red Card',
				value: 'RED CARD'
			},
			{
				id: 5,
				label: 'None',
				value: 'NONE'
			}
		];


			vm.increaseRocketCargo1 = increaseRocketCargo1;
			vm.decreaseRocketCargo1 = decreaseRocketCargo1;
			vm.increaseRocketHatch1 = increaseRocketHatch1;
			vm.decreaseRocketHatch1 = decreaseRocketHatch1;
			vm.increaseStationCargo1 = increaseStationCargo1;
			vm.decreaseStationCargo1 = decreaseStationCargo1;
			vm.increaseStationHatch1 = increaseStationHatch1;
			vm.decreaseStationHatch1 = decreaseStationHatch1;
			vm.increaseLoadingCargo1 = increaseLoadingCargo1;
			vm.decreaseLoadingCargo1 = decreaseLoadingCargo1;
			vm.increaseLoadingHatch1 = increaseLoadingHatch1;
			vm.decreaseLoadingHatch1 = decreaseLoadingHatch1;

			vm.increaseHatchDropped1 = increaseHatchDropped1;
			vm.decreaseHatchDropped1 = decreaseHatchDropped1;

			vm.increaseCargoDropped1 = increaseCargoDropped1;
			vm.decreaseCargoDropped1 = decreaseCargoDropped1;



 			vm.increaseSwitchCube1 = increaseSwitchCube1;

			vm.decreaseSwitchCube1 = decreaseSwitchCube1;
			vm.increaseScaleCube1 = increaseScaleCube1;
			vm.decreaseScaleCube1 = decreaseScaleCube1;
			vm.toggleclimbSuccess = toggleclimbSuccess;
            vm.decreaseCubeDropped1 = decreaseCubeDropped1;
            vm.increaseCubeDropped1 = increaseCubeDropped1;
			vm.increaseExchangeCube1 = increaseExchangeCube1;
			vm.decreaseExchangeCube1 = decreaseExchangeCube1;
			vm.increaseVaultCube1 = increaseVaultCube1;
            vm.decreaseVaultCube1 = decreaseVaultCube1;
            vm.increaseOutPortal1 = increaseOutPortal1;
            vm.decreaseOutPortal1 = decreaseOutPortal1;
            vm.increaseOutExchange1 = increaseOutExchange1;
            vm.decreaseOutExchange1 = decreaseOutExchange1;
            vm.toggleClimbAttempt = toggleClimbAttempt;
            vm.toggleDefending = toggleDefending;
            vm.toggleBreakdown = toggleBreakdown;
            vm.toggleLevitatePoints = toggleLevitatePoints;
            vm.didClimb = didClimb;
            vm.validClimbPos = validClimbPos;

			init();

			function init() {
				console.log(vm.match);
			}

			 

 			function decreaseCargoDropped1() {
				if(vm.matchParts.cargoDropped - 1 >= 0) {
					vm.matchParts.cargoDropped -= 1;
				}
			}
        
            function increaseCargoDropped1() {
				vm.matchParts.cargoDropped += 1;

			}


			 function decreaseLoadingHatch1() {
				if(vm.matchParts.loadingHatch - 1 >= 0) {
					vm.matchParts.loadingHatch -= 1;
				}
			}
        
            function increaseLoadingHatch1() {
				vm.matchParts.loadingHatch += 1;

			}
			

			function decreaseHatchDropped1() {
				if(vm.matchParts.hatchDropped - 1 >= 0) {
					vm.matchParts.hatchDropped -= 1;
				}
			}
        
            function increaseHatchDropped1() {
				vm.matchParts.hatchDropped += 1;

			}

			 function decreaseLoadingCargo1() {
				if(vm.matchParts.loadingCargo - 1 >= 0) {
					vm.matchParts.loadingCargo -= 1;
				}
			}
        
            function increaseLoadingCargo1() {
				vm.matchParts.loadingCargo += 1;
			}

			  function decreaseStationHatch1() {
				if(vm.matchParts.stationHatch - 1 >= 0) {
					vm.matchParts.stationHatch -= 1;
				}
			}
        
            function increaseStationHatch1() {
				vm.matchParts.stationHatch += 1;
			}


			 function decreaseStationCargo1() {
				if(vm.matchParts.stationCargo - 1 >= 0) {
					vm.matchParts.stationCargo -= 1;
				}
			}
        
            function increaseStationCargo1() {
				vm.matchParts.stationCargo += 1;
			}


			 function decreaseRocketCargo1() {
				if(vm.matchParts.rocketCargo - 1 >= 0) {
					vm.matchParts.rocketCargo -= 1;
				}
			}
        
            function increaseRocketCargo1() {
				vm.matchParts.rocketCargo += 1;
			}

			function decreaseRocketHatch1() {
				if(vm.matchParts.rocketHatch - 1 >= 0) {
					vm.matchParts.rocketHatch -= 1;
				}
			}
        
            function increaseRocketHatch1() {
				vm.matchParts.rocketHatch += 1;
			}


			function decreaseSwitchCube1() {
				if(vm.matchParts.switchCube - 1 >= 0) {
					vm.matchParts.switchCube -= 1;
				}
			}
        
            	function decreaseCubeDropped1() {
				if(vm.matchParts.cubeDropped - 1 >= 0) {
					vm.matchParts.cubeDropped -= 1;
				}
			}
        
            function increaseCubeDropped1() {
				vm.matchParts.cubeDropped += 1;
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

			function increaseOutPortal1() {
				vm.matchParts.outPortal += 1;
			}

			function decreaseOutPortal1() {
				if(vm.matchParts.outPortal - 1 >= 0) {
					vm.matchParts.outPortal -= 1;
				}
			}

			function increaseOutExchange1() {
				vm.matchParts.outExchange += 1;
			}

			function decreaseOutExchange1() {
				if(vm.matchParts.outExchange - 1 >= 0) {
					vm.matchParts.outExchange -= 1;
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
					vaultPoints: vm.matchParts.vaultPoints,
					climbPoints: vm.matchParts.climbPoints,
					total: vm.matchParts.total,
					parking: vm.matchParts.parking,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					defending: vm.matchParts.defending,
					playStyle: vm.matchParts.playStyle.value,
					rocketLevel: vm.matchParts.rocketLevel.value,
					climbLevel: vm.matchParts.climbLevel.value,
                    foul: vm.matchParts.foul.value,
                    breakdown: vm.matchParts.breakdown,
                    rocketCargo: vm.matchParts.rocketCargo,
                    rocketHatch: vm.matchParts.rocketHatch,
                    stationCargo: vm.matchParts.stationCargo,
                    stationHatch: vm.matchParts.stationHatch,
                    loadingCargo: vm.matchParts.loadingCargo,
                   	loadingHatch: vm.matchParts.loadingHatch,
                   	hatchesDropped: vm.matchParts.hatchDropped,
                   	cargoesDropped: vm.matchParts.cargoDropped,

                    //powerUp: vm.matchParts.powerUp.value,
                    switchCube: vm.matchParts.switchCube,
                    scaleCube: vm.matchParts.scaleCube,
                    exchangeCube: vm.matchParts.exchangeCube,
                    vaultCube: vm.matchParts.vaultCube,
                    outExchange: vm.matchParts.outExchange,
                    dropped: vm.matchParts.cubeDropped,
                    outPortal: vm.matchParts.outPortal,
                    levitation: vm.matchParts.levitatePoints
				};

               
                teleScore.vaultPoints = (vm.matchParts.vaultCube * MatchSvc.constants.TELE_VAULT_CUBE_CONSTANT);
                
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;
                
				teleScore.parking = (vm.matchParts.parking * MatchSvc.constants.TELE_PARKING_CONSTANT);
                
                teleScore.levitation = vm.matchParts.levitatePoints;

				teleScore.total = teleScore.vaultPoints + teleScore.climbPoints + teleScore.parking + teleScore.levitation;

                teleScore.cargo = (teleScore.stationCargo + teleScore.rocketCargo);

                teleScore.hatch = (teleScore.stationHatch + teleScore.rocketHatch);

                teleScore.fouls = teleScore.foul;
                
                teleScore.cubes = (teleScore.switchCube + teleScore.scaleCube);
                
                teleScore.extraCubes = teleScore.exchangeCube + teleScore.vaultCube;
                
                 teleScore.cargoDropped = teleScore.cargoesDropped;
                teleScore.hatchDropped = teleScore.hatchesDropped;

                //these cubes are left over, maybe put in another category?: teleScore.outPortal + teleScore.outExchange

				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
                console.log(vm.match.teleScore);
				$state.go('results');
               // console.log(teleScore.total);
               // console.log("telescore vault points: " + teleScore.vaultPoints);
                
			}

			function toggleclimbSuccess(){
				vm.matchParts.climbSuccess = !vm.matchParts.climbSuccess;
				didClimb();
			}

			function toggleClimbAttempt(){
				vm.matchParts.climbAttempt = !vm.matchParts.climbAttempt;
			}
        
            function toggleLevitatePoints(){
                vm.matchParts.levitatePoints = 30;
                
            }
        
            function toggleBreakdown(){
                vm.matchParts.breakdown = !vm.matchParts.breakdown;
            }

             function toggleDefending(){
                vm.matchParts.defending = !vm.matchParts.defending;
            }
	}
})();
