(function() {
	'use strict';

	angular
		.module('steamWorks')
		.factory('MatchSvc', MatchSvc);

	MatchSvc.$inject = ['CacheFactory'];

	function MatchSvc(CacheFactory) {
		var matchCache;
	    if (!CacheFactory.get('matchCache')) {
	      matchCache = CacheFactory('matchCache', {
	        storageMode: 'localStorage',
	        maxAge: 60 * 60 * 1000, // 1hr
	        deleteOnExpire: 'aggressive'
	      });
	    }
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
		var cacheKey = 'match';
		var matchData = matchCache.get(cacheKey);
		var matchSvc = {
				beginMatch: beginMatch,
				getMatch: getMatch,
				updateMatch: updateMatch,
				hello: hello,
				constants: calcs
			};

		return matchSvc;

		function getMatch() {
			if(!_.isEmpty(matchData)) {
				console.log("Found data in cache");
				match = matchData;
			} else {
				console.log("No data in cache");
				matchCache.put(cacheKey, match);
			}

			return match;
		}

		function beginMatch() {
			matchCache.remove(cacheKey);
			CacheFactory.destroyAll();
    		CacheFactory.clearAll();
			match = {};
			matchCache.put(cacheKey, match);
		}

		function updateMatch(newProperties) {
			match = _.merge(match, newProperties);
			matchCache.put(cacheKey, match);
		}


		function hello() {
			console.log('Hello World!');
		}
	}
})();