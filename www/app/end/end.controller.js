(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('endCtrl', endCtrl);

	endCtrl.$inject = ['MatchSvc', '$scope', '$state'];

	function endCtrl(MatchSvc, $scope, $state) {
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});

		var vm = this;

		vm.match = MatchSvc.getMatch();
		}
	})();