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
			rocketCargoOne: 0,
			rocketCargoTwo: 0,
			rocketCargoThree: 0,
			hatchDropped: 0, 
			cargoDropped: 0,
			rocketHatchOne: 0,
			rocketHatchTwo: 0,
			rocketHatchThree: 0,
			stationCargo: 0,
			stationHatch: 0,
			loadingCargo: 0,
			loadingHatch: 0,
            total: 0,
            climbPoints: 0,
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
		

			vm.increaseRocketCargoOne1 = increaseRocketCargoOne1;
			vm.decreaseRocketCargoOne1 = decreaseRocketCargoOne1;
			vm.increaseRocketCargoTwo1 = increaseRocketCargoTwo1;
			vm.decreaseRocketCargoTwo1 = decreaseRocketCargoTwo1;
			vm.increaseRocketCargoThree1 = increaseRocketCargoThree1;
			vm.decreaseRocketCargoThree1 = decreaseRocketCargoThree1;
			vm.increaseRocketHatchOne1 = increaseRocketHatchOne1;
			vm.decreaseRocketHatchOne1 = decreaseRocketHatchOne1;
			vm.increaseRocketHatchTwo1 = increaseRocketHatchTwo1;
			vm.decreaseRocketHatchTwo1 = decreaseRocketHatchTwo1;
			vm.increaseRocketHatchThree1 = increaseRocketHatchThree1;
			vm.decreaseRocketHatchThree1 = decreaseRocketHatchThree1;
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

			vm.toggleclimbSuccess = toggleclimbSuccess;
            vm.toggleClimbAttempt = toggleClimbAttempt;
            vm.toggleDefending = toggleDefending;
            vm.toggleBreakdown = toggleBreakdown;
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


			function decreaseRocketCargoOne1() {
				if(vm.matchParts.rocketCargoOne - 1 >= 0) {
					vm.matchParts.rocketCargoOne -= 1;
				}
			}
        
            function increaseRocketCargoOne1() {
				vm.matchParts.rocketCargoOne += 1;
			}

			function decreaseRocketCargoTwo1() {
				if(vm.matchParts.rocketCargoTwo - 1 >= 0) {
					vm.matchParts.rocketCargoTwo -= 1;
				}
			}
        
            function increaseRocketCargoTwo1() {
				vm.matchParts.rocketCargoTwo += 1;
			}

			function decreaseRocketCargoThree1() {
				if(vm.matchParts.rocketCargoThree - 1 >= 0) {
					vm.matchParts.rocketCargoThree -= 1;
				}
			}
        
            function increaseRocketCargoThree1() {
				vm.matchParts.rocketCargoThree += 1;
			}

			function decreaseRocketHatchOne1() {
				if(vm.matchParts.rocketHatchOne - 1 >= 0) {
					vm.matchParts.rocketHatchOne -= 1;
				}
			}
        
            function increaseRocketHatchOne1() {
				vm.matchParts.rocketHatchOne += 1;
			}

			function decreaseRocketHatchTwo1() {
				if(vm.matchParts.rocketHatchTwo - 1 >= 0) {
					vm.matchParts.rocketHatchTwo -= 1;
				}
			}
        
            function increaseRocketHatchTwo1() {
				vm.matchParts.rocketHatchTwo += 1;
			}

			function decreaseRocketHatchThree1() {
				if(vm.matchParts.rocketHatchThree - 1 >= 0) {
					vm.matchParts.rocketHatchThree -= 1;
				}
			}
        
            function increaseRocketHatchThree1() {
				vm.matchParts.rocketHatchThree += 1;
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
					climbPoints: vm.matchParts.climbPoints,
					total: vm.matchParts.total,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					defending: vm.matchParts.defending,
					playStyle: vm.matchParts.playStyle.value,
					rocketLevel: vm.matchParts.rocketLevel.value,
					climbLevel: vm.matchParts.climbLevel.value,
                    breakdown: vm.matchParts.breakdown,
                    rocketCargoOnePoints: vm.matchParts.rocketCargoOne,
                    rocketCargoTwoPoints: vm.matchParts.rocketCargoTwo,
                    rocketCargoThreePoints: vm.matchParts.rocketCargoThree,
                    rocketHatchOnePoints: vm.matchParts.rocketHatchOne,
                    rocketHatchTwoPoints: vm.matchParts.rocketHatchTwo,
                    rocketHatchThreePoints: vm.matchParts.rocketHatchThree,
                    stationCargo: vm.matchParts.stationCargo,
                    stationHatch: vm.matchParts.stationHatch,
                    loadingCargo: vm.matchParts.loadingCargo,
                   	loadingHatch: vm.matchParts.loadingHatch,
                   	hatchesDropped: vm.matchParts.hatchDropped,
                   	cargoesDropped: vm.matchParts.cargoDropped,

				};

                
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;

                teleScore.cargo = (teleScore.stationCargo + teleScore.rocketCargoOnePoints + teleScore.rocketCargoTwoPoints + teleScore.rocketCargoThreePoints);

                teleScore.hatch = (teleScore.stationHatch + teleScore.rocketHatchOnePoints + teleScore.rocketHatchTwoPoints + teleScore.rocketHatchThreePoints);
                
                teleScore.cargoDropped = teleScore.cargoesDropped;
                teleScore.hatchDropped = teleScore.hatchesDropped;

				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
                console.log(vm.match.teleScore);
				$state.go('results');
                
			}

			function toggleclimbSuccess(){
				vm.matchParts.climbSuccess = !vm.matchParts.climbSuccess;
				didClimb();
			}

			function toggleClimbAttempt(){
				vm.matchParts.climbAttempt = !vm.matchParts.climbAttempt;
			}
        
            function toggleBreakdown(){
                vm.matchParts.breakdown = !vm.matchParts.breakdown;
            }

             function toggleDefending(){
                vm.matchParts.defending = !vm.matchParts.defending;
            }
	}
})();


