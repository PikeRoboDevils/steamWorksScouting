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
				cargo: 0,
				dropped: 0,
				hatchPanel: 0,
				habLine: false,
				placement: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				initialLevel:  {
					id: 0,
					label: 'Level One',
					value: 'level1'
				},

				preLoad:  {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				sandStormType: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
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
			vm.initialLevel = [
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
			vm.preLoad = [
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
			vm. sandStormType = [
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
			vm.increaseCargo1 = increaseCargo1;

			
			vm.decreaseCargo1 = decreaseCargo1;
		
			vm.increaseHatch1 = increaseHatch1;
			
			vm.decreaseHatch1 = decreaseHatch1;
			vm.decreaseCubeDropped1 = decreaseCubeDropped1;
			vm.increaseCubeDropped1 = increaseCubeDropped1;
		
			vm.toggleAutoRun = toggleAutoRun;
           
           
            vm.validStartingPos = validStartingPos;
            vm.increaseExchange1 = increaseExchange1;
            vm.decreaseExchange1 = decreaseExchange1;

            init();

			function init() {
				console.log(vm.match);
			}

			function decreaseSwitch1() {
				if(vm.matchProperties.switch - 1 >= 0) {
					vm.matchProperties.switch -= 1;
				}
			}

			function decreaseCubeDropped1() {
				if(vm.matchProperties.cubeDropped - 1 >= 0) {
					vm.matchProperties.cubeDropped -= 1;
				}
			}

			function increaseCubeDropped1() {
				vm.matchProperties.cubeDropped += 1;
			}


			function increaseSwitch1() {
				vm.matchProperties.switch += 1;
			}

		

			function decreaseHatch1() {
				if(vm.matchProperties.scale - 1 >= 0) {
					vm.matchProperties.scale -= 1;
				}
			}

			

			function increaseHatch1() {
				vm.matchProperties.scale += 1;
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
                    //rotorpoints
					scalePoints: vm.matchProperties.scale,
                    //basepoints
					exchangePoints: vm.matchProperties.exchange,
                    dropped: vm.matchProperties.cubeDropped,
					total: 0,
					autoRunPoints: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value
				};

				autoScore.autoRunPoints = vm.matchProperties.autoRun ? MatchSvc.constants.AUTOLINE_CONSTANT : 0;
			
				autoScore.total = autoScore.autoRunPoints;
            
                autoScore.cubes = autoScore.switchPoints + autoScore.scalePoints + autoScore.exchangePoints + autoScore.dropped;

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
