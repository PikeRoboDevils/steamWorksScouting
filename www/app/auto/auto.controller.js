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
				rocketCargoTwo: 0,
				rocketCargoOne: 0,
				rocketCargoThree: 0,
				rocketHatchTwo: 0,
				rocketHatchOne: 0,
				rocketHatchThree: 0,
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
			vm.increaseRocketHatchOne1 = increaseRocketHatchOne1;
			vm.increaseRocketHatchTwo1 = increaseRocketHatchTwo1;
			vm.increaseRocketHatchThree1 = increaseRocketHatchThree1;
			vm.increaseStationHatch1 = increaseStationHatch1
			
			vm.decreaseHatch1 = decreaseHatch1;
			vm.decreaseRocketHatchOne1 = decreaseRocketHatchOne1;
			vm.decreaseRocketHatchTwo1 = decreaseRocketHatchTwo1;
			vm.decreaseRocketHatchThree1 = decreaseRocketHatchThree1;
			vm.decreaseStationHatch1 = decreaseStationHatch1;
		
			vm.increaseCargo1 = increaseCargo1;
			vm.increaseRocketCargoOne1 = increaseRocketCargoOne1;
			vm.increaseRocketCargoTwo1 = increaseRocketCargoTwo1;
			vm.increaseRocketCargoThree1 = increaseRocketCargoThree1;
			vm.increaseStationCargo1 = increaseStationCargo1;

			
			vm.decreaseCargo1 = decreaseCargo1;
			vm.decreaseRocketCargoOne1 = decreaseRocketCargoOne1;
			vm.decreaseRocketCargoTwo1 = decreaseRocketCargoTwo1;
			vm.decreaseRocketCargoThree1 = decreaseRocketCargoThree1;
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

			function decreaseRocketHatchOne1() {
				if(vm.matchProperties.rocketHatchOne - 1 >= 0) {
					vm.matchProperties.rocketHatchOne -= 1;
				}
			}
			function decreaseRocketHatchTwo1() {
				if(vm.matchProperties.rocketHatchTwo - 1 >= 0) {
					vm.matchProperties.rocketHatchTwo -= 1;
				}
			}
			function decreaseRocketHatchThree1() {
				if(vm.matchProperties.rocketHatchThree - 1 >= 0) {
					vm.matchProperties.rocketHatchThree -= 1;
				}
			}
			function increaseRocketHatchOne1() {
				vm.matchProperties.rocketHatchOne += 1;
			}
			function increaseRocketHatchTwo1() {
				vm.matchProperties.rocketHatchTwo += 1;
			}
			function increaseRocketHatchThree1() {
				vm.matchProperties.rocketHatchThree += 1;
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

			function increaseRocketCargoOne1() {
				vm.matchProperties.rocketCargoOne += 1;
			}
			function increaseRocketCargoTwo1() {
				vm.matchProperties.rocketCargoTwo += 1;
			}
			function increaseRocketCargoThree1() {
				vm.matchProperties.rocketCargoThree += 1;
			}

			function decreaseRocketCargoOne1() {
				if(vm.matchProperties.rocketCargoOne - 1 >= 0) {
					vm.matchProperties.rocketCargoOne -= 1;
				}
			}
			function decreaseRocketCargoTwo1() {
				if(vm.matchProperties.rocketCargoTwo - 1 >= 0) {
					vm.matchProperties.rocketCargoTwo -= 1;
				}
			}
			function decreaseRocketCargoThree1() {
				if(vm.matchProperties.rocketCargoThree - 1 >= 0) {
					vm.matchProperties.rocketCargoThree -= 1;
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

      function decreaseRocketHatchOne1() {
        if(vm.matchProperties.rocketHatchOne - 1 >= 0) {
          vm.matchProperties.rocketHatchOne -= 1;
        }
      }
      function decreaseRocketHatchTwo1() {
        if(vm.matchProperties.rocketHatchTwo - 1 >= 0) {
          vm.matchProperties.rocketHatchTwo -= 1;
        }
      }
      function decreaseRocketHatchThree1() {
        if(vm.matchProperties.rocketHatchThree - 1 >= 0) {
          vm.matchProperties.rocketHatchThree -= 1;
        }
      }
      function increaseRocketHatchOne1() {
        vm.matchProperties.rocketHatchOne += 1;
      }
      function increaseRocketHatchTwo1() {
        vm.matchProperties.rocketHatchTwo += 1;
      }
      function increaseRocketHatchThree1() {
        vm.matchProperties.rocketHatchThree += 1;
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

      function increaseRocketCargoOne1() {
        vm.matchProperties.rocketCargoOne += 1;
      }
      function increaseRocketCargoTwo1() {
        vm.matchProperties.rocketCargoTwo += 1;
      }
      function increaseRocketCargoThree1() {
        vm.matchProperties.rocketCargoThree += 1;
      }

      function decreaseRocketCargoOne1() {
        if(vm.matchProperties.rocketCargoOne - 1 >= 0) {
          vm.matchProperties.rocketCargoOne -= 1;
        }
      }
      function decreaseRocketCargoTwo1() {
        if(vm.matchProperties.rocketCargoTwo - 1 >= 0) {
          vm.matchProperties.rocketCargoTwo -= 1;
        }
      }
      function decreaseRocketCargoThree1() {
        if(vm.matchProperties.rocketCargoThree - 1 >= 0) {
          vm.matchProperties.rocketCargoThree -= 1;
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
					rocketHatchTwoPoints: vm.matchProperties.rocketHatchTwo,
					rocketHatchOnePoints: vm.matchProperties.rocketHatchOne,
					rocketHatchThreePoints: vm.matchProperties.rocketHatchThree,
					stationHatchPoints: vm.matchProperties.stationHatch,
                    //rotorpoints
					scalePoints: vm.matchProperties.scale,
					cargoPoints: vm.matchProperties.cargo,
					rocketCargoTwoPoints: vm.matchProperties.rocketCargoTwo,
					rocketCargoOnePoints: vm.matchProperties.rocketCargoOne,
					rocketCargoThreePoints: vm.matchProperties.rocketCargoThree,
					stationCargoPoints: vm.matchProperties.stationCargo,

          switchPoints: vm.matchProperties.switch,
          hatchPoints: vm.matchProperties.hatch,
          rocketHatchTwoPoints: vm.matchProperties.rocketHatchTwo,
          rocketHatchOnePoints: vm.matchProperties.rocketHatchOne,
          rocketHatchThreePoints: vm.matchProperties.rocketHatchThree,
          stationHatchPoints: vm.matchProperties.stationHatch,
                    //rotorpoints
          scalePoints: vm.matchProperties.scale,
          cargoPoints: vm.matchProperties.cargo,
          rocketCargoTwoPoints: vm.matchProperties.rocketCargoTwo,
          rocketCargoOnePoints: vm.matchProperties.rocketCargoOne,
          rocketCargoThreePoints: vm.matchProperties.rocketCargoThree,
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

        autoScore.cargo = (autoScore.rocketCargoOnePoints + autoScore.rocketCargoTwoPoints + autoScore.rocketCargoThreePoints + autoScore.stationCargoPoints);

       autoScore.hatch = (autoScore.rocketHatchOnePoints + autoScore.rocketHatchTwoPoints + autoScore.rocketHatchThreePoints+ autoScore.stationHatchPoints);


                autoScore.hatch = (autoScore.rocketHatchOnePoints + autoScore.rocketHatchTwoPoints + autoScore.rocketHatchThreePoints+ autoScore.stationHatchPoints);

                autoScore.hatchDropped = autoScore.hatchesDropped;


                autoScore.cargoDropped = autoScore.cargoesDropped;

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

