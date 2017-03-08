(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('resultsCtrl', resultsCtrl);

	resultsCtrl.$inject = ['deviceSvc', 'MatchSvc', '$ionicHistory', '$scope', '$state'];

	function resultsCtrl(deviceSvc, MatchSvc, $ionicHistory, $scope, $state) {
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});

		var vm = this;
		var service_id = '12ab';
    	var characteristic_id = '34cd';

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;
		vm.cancel = cancel;
		vm.device = deviceSvc.getDevice('scoutingDatabaseApp');

		vm.kpa = kpa;
		vm.total = total;
		vm.rankPoints = rankPoints;
		vm.rotor = rotor;
		vm.gears = gears;
		vm.isSubmitting = false;
		vm.buttonText = 'Submit';
		

		function kpa(){
			return (vm.match.autoScore.fuelPoints + vm.match.teleScore.fuelPoints).toFixed(2);
		}

		function gears(){
			return vm.match.autoScore.gearTotal + vm.match.teleScore.gearTotal;
		}

		function total(){
			return (vm.match.autoScore.total + vm.match.teleScore.total).toFixed(2);
		}

		function rotor(){
			return vm.match.autoScore.rotorTotal + vm.match.teleScore.rotorTotal;
		}

		function rankPoints(){
			return rank1() + rank2() + rank3();
		}

		function rank1(){
			if(vm.match.autoScore.fuelPoints + vm.match.autoScore.fuelPoints >= 40){
				return 1;
			}
			else {
				return 0;
			}
		}

		function rank2(){
			if(vm.match.finalScore.outcome == "win"){
				return 2;
			}
			else if(vm.match.finalScore.outcome == "tie"){
				return 1;
			}
			else if(vm.match.finalScore.outcome == "lose"){
				return 0;
			}
			else {
				return 0;
			}
		}

		function rank3(){
			if(vm.match.teleScore.rotorTotal + vm.match.autoScore.rotorTotal === 4){
				return 1;
			}
			else {
				return 0;
			}
		}

		function submit(){
			vm.isSubmitting = true;
			vm.buttonText = 'Submitting...';
			MatchSvc.updateMatch(vm.match);
			vm.match = MatchSvc.getMatch();

			ble.connect(
				vm.device.id,
				function(res){
					ble.write(
						vm.device.id,
						service_id,
						characteristic_id,
						btoa(JSON.stringify(vm.match)),
						function(response){
							if(response == 'OK'){
								ble.disconnect(vm.device.id);
								alert('Match submited!');
								$ionicHistory.clearCache()
								$state.go('app.welcome', {}, {reload: true});
							}
						},
						function(err){
							ble.disconnect(vm.device.id);
							vm.isSubmitting = false;
							vm.buttonText = 'Submit';
							alert("Error occured while trying to record your match. Please try again.");
						}
					);
				},
				function(err){
					vm.isSubmitting = false;
					vm.buttonText = 'Submit';
					alert('Something went wrong while trying to connect. Please try again');
				}
		    );
		}

		function cancel() {
			ble.disconnect(vm.device.id);
			vm.isSubmitting = false;
			vm.buttonText = 'Submit';
		}
	}
})();
