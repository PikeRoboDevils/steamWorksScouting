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
				//rotors: 0,
				autoRun: false,
				//gearAttempt: false,
				//gearSuccess: false,
				placement: {
					id: 0,
					label: 'None',
					value: 'NONE'
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

			vm.increaseSwitch1 = increaseSwitch1;
			
			vm.decreaseSwitch1 = decreaseSwitch1;
		
			vm.increaseScale1 = increaseScale1;
			
			vm.decreaseScale1 = decreaseScale1;
		
			vm.toggleAutoRun = toggleAutoRun;
           
           
            vm.validStartingPos = validStartingPos;
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


			function increaseSwitch1() {
				vm.matchProperties.switch += 1;
			}

		

			function decreaseScale1() {
				if(vm.matchProperties.scale - 1 >= 0) {
					vm.matchProperties.scale -= 1;
				}
			}

			

			function increaseScale1() {
				vm.matchProperties.scale += 1;
			}

            function decreaseVault1() {
				if(vm.matchProperties.vault - 1 >= 0) {
					vm.matchProperties.vault -= 1;
				}
                
                
			}
            function increaseVault1() {
				vm.matchProperties.vault += 1;
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
					switchPoints: 0,
                    //rotorpoints
					scalePoints: 0,
                    //basepoints
					exchangePoints: 0,
					
					
				
					total: 0,
					autoRunPoints: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value
				};

				/* autoScore.fuelPoints = (vm.matchProperties.highFuel) + (vm.matchProperties.lowFuel * MatchSvc.constants.AUTO_LOW_FUEL_CONSTANT); */
				autoScore.autoRunPoints += vm.matchProperties.autoRun ? MatchSvc.constants.AUTOLINE_CONSTANT : 0;
				/*autoScore.rotorPoints = vm.matchProperties.rotors * MatchSvc.constants.AUTO_ROTORS; */
				//autoScore.rotorTotal = vm.matchProperties.rotors;
				//autoScore.gearTotal = vm.matchProperties.gearSuccess ? 1 : 0;
                //autoRunPoints == basePoints
				autoScore.total = autoScore.autoRunPoints;

				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.teleOp');
			}

			function toggleAutoRun(){
				vm.matchProperties.autoRun = !vm.matchProperties.autoRun;
			}
         	
		}     
})();