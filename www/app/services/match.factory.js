(function() {
	'use strict';

	angular
		.module('steamWorks')
		.factory('MatchSvc', MatchSvc);

	MatchSvc.$inject = [];

	function MatchSvc() {
	
	   
	    var calcs = {
	    	AUTO_LOW_FUEL_CONSTANT: (1/3),
	    	TELE_LOW_FUEL_CONSTANT: (1/9),
			TELE_HIGH_FUEL_CONSTANT: (1/3),
			CLIMB_CONSTANT: 50,
			CLIMB: 50,
			TELE_ROTORS: 40,
			BASELINE_CONSTANT: 5,
			AUTO_ROTORS: 60
	    }

		var match = {};
	
		var matchSvc = {
				beginMatch: beginMatch,
				getMatch: getMatch,
				updateMatch: updateMatch,
				hello: hello,
				constants: calcs
			};

		return matchSvc;

		function getMatch() {
			

			return match;
		}

		function beginMatch() {
			angular.copy([], match);
			
		}

		function updateMatch(newProperties) {
			match = _.merge(match, newProperties);
			
		}


		}
	}
})();