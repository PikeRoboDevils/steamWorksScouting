(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('finalCtrl', finalCtrl);

	finalCtrl.$inject = ['MatchSvc', '$scope', '$state'];

	var LOW_FUEL_CONSTANT = (1/3),
			BASELINE_CONSTANT = 5;

	function finalCtrl(MatchSvc, $scope, $state){
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});

		var vm = this;

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;

		vm.matchParts	=	{
			red: false,
			yellow: false,
			tech: false,
			foul: false,
			broken: false,
			outcome: {
				value: null
			}
		}
			vm.toggleRed = toggleRed;
			vm.toggleYellow = toggleYellow;
			vm.toggleTech = toggleTech;
			vm.toggleFoul = toggleFoul;
			vm.isFormValid = isFormValid;

			init();

			function init() {
				console.log(vm.match);
			}

			function decreaseHighFuel() {
				if(vm.matchParts.highFuel - 1 >= 0) {
					vm.matchParts.highFuel -= 1;
				}
			}

			function increaseHighFuel() {
				vm.matchParts.highFuel += 1;
			}

			function decreaseLowFuel() {
				if(vm.matchParts.lowFuel - 1 >= 0) {
					vm.matchParts.lowFuel -= 1;
				}
			}

			function increaseLowFuel() {
				vm.matchParts.lowFuel += 1;
			}

			function toggleYellow(){
				vm.matchParts.yellow = !vm.matchParts.yellow;
			}

			function toggleRed(){
				vm.matchParts.red = !vm.matchParts.red;
			}

			function toggleTech(){
				vm.matchParts.tech = !vm.matchParts.tech;
			}

			function toggleFoul(){
				vm.matchParts.foul = !vm.matchParts.foul;
			}

			function isFormValid() {
				return _.isNull(vm.matchParts.outcome.value);
			}

			function submit() {
				var finalScore = {
					red: vm.matchParts.red,
					yellow: vm.matchParts.yellow,
					tech: vm.matchParts.tech,
					foul: vm.matchParts.foul,
					broken: vm.matchParts.broken,
					outcome: vm.matchParts.outcome.value
				};

				// finalScore.fuelPoints = (vm.matchParts.highFuel) + (vm.matchParts.lowFuel * LOW_FUEL_CONSTANT);
				// finalScore.basePoints += vm.matchParts.baseLine ? BASELINE_CONSTANT : 0;
				// finalScore.total = finalScore.fuelPoints + finalScore.basePoints;

				vm.match.finalScore = finalScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('app.results');
			}


	}
})();