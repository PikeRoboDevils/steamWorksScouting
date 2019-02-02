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
				hatch: 0,
				cargo: 0,
				rocketCargo: 0,
				rocketHatch: 0,
				stationCargo: 0,
				stationHatch: 0,
				hatchDropped: 0,
				cargoDropped: 0,
				switch: 0,
				cubeDropped: 0,
				scale: 0,
                exchange: 0,
				autoRun: false,
				placement: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				sandstorm: {
					id: 1,
					label: 'Autonomous',
					value: 'AUTO'
				},
				preload: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				level: {
					id: 1,
					label: '1',
					value: 'ONE'

				}
			}

			vm.startingPositions = [
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
			vm.sandStormType = [
			{	id: 1,
				label: 'Autonomous',
				value: 'AUTO'
			},
			{	id: 2,
				label: 'Manual',
				value: 'MANUAL'
				}
			];
			vm.preLoadType = [
			{	id: 0,
				label: 'None',
				value: 'NONE'
			},
			{	id: 1,
				label: 'Cargo',
				value: 'CARGO'
			},
			{	id: 2,
				label: 'Hatch Panel',
				value: 'HATCH'
				}
			];
			vm.startLevel = [
			{	id: 1,
				label: '1',
				value: 'ONE'
			},
			{	id: 2,
				label: '2',
				value: 'TWO'
				}
			];



			vm.increaseHatch1 = increaseHatch1;
			vm.increaseRocketHatch1 = increaseRocketHatch1;
			vm.increaseStationHatch1 = increaseStationHatch1
			
			vm.decreaseHatch1 = decreaseHatch1;
			vm.decreaseRocketHatch1 = decreaseRocketHatch1;
			vm.decreaseStationHatch1 = decreaseStationHatch1;
		
			vm.increaseCargo1 = increaseCargo1;
			vm.increaseRocketCargo1 = increaseRocketCargo1;
			vm.increaseStationCargo1 = increaseStationCargo1;

			
			vm.decreaseCargo1 = decreaseCargo1;
			vm.decreaseRocketCargo1 = decreaseRocketCargo1;
			vm.decreaseStationCargo1 = decreaseStationCargo1;

			vm.decreaseHatchDropped1 = decreaseHatchDropped1;
			vm.increaseHatchDropped1 = increaseHatchDropped1;
			vm.decreaseCargoDropped1 = decreaseCargoDropped1;
			vm.increaseCargoDropped1 = increaseCargoDropped1;
		
			vm.toggleAutoRun = toggleAutoRun;
           
           
            vm.validStartingPos = validStartingPos;
            vm.increaseExchange1 = increaseExchange1;
            vm.decreaseExchange1 = decreaseExchange1;

            init();

			function init() {
				console.log(vm.match);
			}

			function decreaseHatch1() {
				if(vm.matchProperties.hatch - 1 >= 0) {
					vm.matchProperties.hatch -= 1;
				}
			}
			function increaseHatch1() {
				vm.matchProperties.hatch += 1;
			}

			function decreaseRocketHatch1() {
				if(vm.matchProperties.rocketHatch - 1 >= 0) {
					vm.matchProperties.rocketHatch -= 1;
				}
			}
			function increaseRocketHatch1() {
				vm.matchProperties.rocketHatch += 1;
			}

			function decreaseStationHatch1() {
				if(vm.matchProperties.stationHatch - 1 >= 0) {
					vm.matchProperties.stationHatch -= 1;
				}
			}
			function increaseStationHatch1() {
				vm.matchProperties.stationHatch += 1;
			}


			function decreaseHatchDropped1() {
				if(vm.matchProperties.hatchDropped - 1 >= 0) {
					vm.matchProperties.hatchDropped -= 1;
				}
			}

			function increaseHatchDropped1() {
				vm.matchProperties.hatchDropped += 1;
			}


			
		
			function increaseCargo1() {
				vm.matchProperties.cargo += 1;
			}
			function decreaseCargo1() {
				if(vm.matchProperties.cargo - 1 >= 0) {
					vm.matchProperties.cargo -= 1;
				}
			}

			function increaseRocketCargo1() {
				vm.matchProperties.rocketCargo += 1;
			}
			function decreaseRocketCargo1() {
				if(vm.matchProperties.rocketCargo - 1 >= 0) {
					vm.matchProperties.rocketCargo -= 1;
				}
			}

			function increaseStationCargo1() {
				vm.matchProperties.stationCargo += 1;
			}
			function decreaseStationCargo1() {
				if(vm.matchProperties.stationCargo - 1 >= 0) {
					vm.matchProperties.stationCargo -= 1;
				}
			}

			function decreaseCargoDropped1() {
				if(vm.matchProperties.cargoDropped - 1 >= 0) {
					vm.matchProperties.cargoDropped -= 1;
				}
			}

			function increaseCargoDropped1() {
				vm.matchProperties.cargoDropped += 1;
			}

			



            

            function decreaseExchange1() {
				if(vm.matchProperties.exchange - 1 >= 0) {
					vm.matchProperties.exchange-= 1;
				}
                
                
			}
            function increaseExchange1() {
				vm.matchProperties.exchange += 1;
			}
    
          

           
            

		

			function validStartingPos() {
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
                    //fuelpoints
					switchPoints: vm.matchProperties.switch,
					hatchPoints: vm.matchProperties.hatch,
					rocketHatchPoints: vm.matchProperties.rocketHatch,
					stationHatchPoints: vm.matchProperties.stationHatch,
                    //rotorpoints
					scalePoints: vm.matchProperties.scale,
					cargoPoints: vm.matchProperties.cargo,
					rocketCargoPoints: vm.matchProperties.rocketCargo,
					stationCargoPoints: vm.matchProperties.stationCargo,
                    //basepoints
					exchangePoints: vm.matchProperties.exchange,
                    hatchesDropped: vm.matchProperties.hatchDropped,
                    cargoesDropped: vm.matchProperties.cargoDropped,
					total: 0,
					autoRunPoints: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value,
					sandstorm: vm.matchProperties.sandstorm.value,
					preload: vm.matchProperties.preload.value,
					level: vm.matchProperties.level.value

				};

				autoScore.autoRunPoints = vm.matchProperties.autoRun ? MatchSvc.constants.AUTOLINE_CONSTANT : 0;
			
				autoScore.total = autoScore.autoRunPoints;
            
                autoScore.cubes = autoScore.switchPoints + autoScore.scalePoints + autoScore.exchangePoints + autoScore.dropped;

                autoScore.cargo = (autoScore.rocketCargoPoints + autoScore.stationCargoPoints);

                autoScore.hatch = (autoScore.rocketHatchPoints + autoScore.stationHatchPoints);

				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('teleOp');
                //console.log(vm.match);
			}

			function toggleAutoRun(){
				vm.matchProperties.autoRun = !vm.matchProperties.autoRun;
			}
         	
		}     
})();