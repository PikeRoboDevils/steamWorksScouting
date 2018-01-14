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
			const now = new Date();


			/*
			cube constructor that holds an int for the number that corresponds for the number that it was picked up
			a time for when it was picked up
			a time for when it was delivered or Dropped
			a time difference between the pick up and delivered times
			and a delivered string which we will tell what kind of delivery happened
			*/
			function cube(cubeNumber, timePickedUp, timeDelivered, timeDifference, delivered){
				this.cubeNumber = cubeNumber,
				this.timePickedUp = timePickedUp,
				this.timeDelivered = timeDelivered,
				this.timeDifference = timeDifference,
				this.delivered = delivered
			}

			//array that will hold cubes
			var cubes = [];

			//vm.cubes[1].cubeNumber = 1;


			//keeps track of the amount of cubes we have
			var cubeNumber = 0;






			vm.match = MatchSvc.getMatch();
            vm.submit = submit;


			vm.matchProperties = {
				switch: 0,
				cubeDropped: 0,
				scale: 0,
                exchange: 0,
				autoRun: false,
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
			vm.decreaseCubeDropped1 = decreaseCubeDropped1;
			vm.increaseCubeDropped1 = increaseCubeDropped1;

			vm.toggleAutoRun = toggleAutoRun;


    	vm.validStartingPos = validStartingPos;
      vm.increaseExchange1 = increaseExchange1;
      vm.decreaseExchange1 = decreaseExchange1;
			vm.pickedUp = pickedUp;
			vm.pickedUpDecrease = pickedUpDecrease;

            init();

			function init() {
				//console.log(vm.cubes);
			}

			/***********************************************************
			* Picked up method
			*we increment our cubeNumber by 1
			* we take a snapshot of the timestamp
			* create a new cube in our array (use cubeNumber -1 so that we start at the 0 index)
			***********************************************************/
			function pickedUp(){
				//increment the amount of Cubes we have by 1
				cubeNumber++;
				//create a new cube, use cubeNumber -1 because we start with index 0
				cubes[cubeNumber-1] = new cube(cubeNumber,Date.now(),0,0,"");
				console.log(cubes[cubeNumber-1]);
			}

			/**************************************
			*this is for scout error if they did not met to add a cube we can delete the last cube added
			***************************************/
			function pickedUpDecrease(){

			// //we first check to make sure that cubeNumber is greater than 0, if so we delete
			if(cubeNumber >0){
				delete cubes[cubeNumber-1];
				cubeNumber--;
			}
}




			function decreaseSwitch1() {
				if(vm.matchProperties.switch - 1 >= 0) {
					vm.matchProperties.switch -= 1;
				}
			}

			function increaseSwitch1() {
				vm.matchProperties.switch += 1;
			}

			function decreaseCubeDropped1() {
				if(vm.matchProperties.cubeDropped - 1 >= 0) {
					vm.matchProperties.cubeDropped -= 1;
				}


			}

			function increaseCubeDropped1() {
				vm.matchProperties.cubeDropped += 1;
			}

			function decreaseScale1() {
				if(vm.matchProperties.scale - 1 >= 0) {
					vm.matchProperties.scale -= 1;
				}
			}



			function increaseScale1() {
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
					total: 0,
					autoRunPoints: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value
				};

				autoScore.autoRunPoints = vm.matchProperties.autoRun ? MatchSvc.constants.AUTOLINE_CONSTANT : 0;

				autoScore.total = autoScore.autoRunPoints;

                autoScore.cubes = autoScore.switchPoints + autoScore.scalePoints + autoScore.exchangePoints;

				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.teleOp');
			}

			function toggleAutoRun(){
				vm.matchProperties.autoRun = !vm.matchProperties.autoRun;
			}

		}
})();
