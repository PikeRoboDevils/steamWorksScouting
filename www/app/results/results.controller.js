(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('resultsCtrl', resultsCtrl);

	resultsCtrl.$inject = ['MatchSvc', '$scope', '$state'];

	function resultsCtrl(MatchSvc, $scope, $state) {
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});

		var vm = this;

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;

		// vm.foo='ONE BILLION POINTS FOR GRIFFINDOR';

		vm.kpa = kpa;
		vm.total = total;
		vm.rankPoints = rankPoints;
		vm.rotor = rotor;
		vm.gears = gears;
		

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
			return rank1() + rank2() + rank4();
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
		// function rank3{
		// 	if(vm.match.finalScore.outcome = "tie"){
		// 		return 1;
		// 	}
		// }
		function rank4(){
			if(vm.match.teleScore.rotorTotal + vm.match.autoScore.rotorTotal === 4){
				return 1;
			}
			else {
				return 0;
			}
		}

		function submit(){
			MatchSvc.updateMatch(vm.match);
			$state.go('app.end');
		}
	}
})();
