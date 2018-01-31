(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('resultsCtrl', resultsCtrl);

	resultsCtrl.$inject = ['deviceSvc', 'MatchSvc', '$ionicHistory', '$scope', '$state', 'ngProgressFactory'];

	function resultsCtrl(deviceSvc, MatchSvc, $ionicHistory, $scope, $state, ngProgressFactory) {
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

		vm.cubes = cubes;
		vm.total = total;
		vm.climb = climb;
        vm.fouls = fouls;
		vm.isSubmitting = false;
		vm.buttonText = 'Submit';


		$scope.progressbar = ngProgressFactory.createInstance();
		$scope.progressbar.setHeight('8px');
		$scope.progressbar.setColor('#387ef5');
		// $scope.progressbar.setParent(document.querySelector('#progressBar'));

		function cubes(){
			return vm.match.autoScore.cubes + vm.match.teleScore.cubes;
		}

		function climb(){
			return vm.match.teleScore.climbPoints;
		} 

		function total(){
			return vm.match.autoScore.total + vm.match.teleScore.total;
		}
        
        function fouls() {
            return (vm.match.teleScore.fouls);
        }


		function submit(){
			$scope.progressbar.start();
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
								vm.isSubmitting = false;
								vm.buttonText = 'Submit';
								$scope.progressbar.complete();
								alert('Match submited!');
								$ionicHistory.clearCache()
								$state.go('app.welcome', {}, {reload: true});
							}
						},
						function(err){
							$scope.progressbar.reset();
							ble.disconnect(vm.device.id);
							vm.isSubmitting = false;
							vm.buttonText = 'Submit';
							alert("Error occured while trying to record your match. Please try again.");
						}
                    
					);
				},
				function(err){
					$scope.progressbar.reset();
					vm.isSubmitting = false;
					vm.buttonText = 'Submit';
					alert('Something went wrong while trying to connect. Please try again');
                    
				}
              
		    );
		}
        
        
		function cancel() {
			$scope.progressbar.reset();
			vm.isSubmitting = false;
			vm.buttonText = 'Submit';
			ble.disconnect(vm.device.id);
		}
	}
})();
