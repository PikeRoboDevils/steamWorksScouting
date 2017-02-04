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
		var match = {};
		var cacheKey = 'match';
		var matchData = matchCache.get(cacheKey);
		var matchSvc = {
				beginMatch: beginMatch,
				getMatch: getMatch,
				updateMatch: updateMatch,
				hello: hello
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
			match = {};
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