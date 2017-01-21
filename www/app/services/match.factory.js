(function() {
	'use strict';

	angular
		.module('steamWorks')
		.factory('MatchSvc', MatchSvc);

	MatchSvc.$inject = ['CacheFactory'];

	function MatchSvc(CacheFactory) {
		var match = {},
			matchCache = CacheFactory.get('matchCache'),
			cacheKey = 'match',
			matchData = matchCache.get(cacheKey),
			matchSvc = {
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
			matchCache.removeAll();
		}

		function updateMatch(newProperties) {
			match = _.merge(match, newProperties);
			// matchCache.clearAll();
			matchCache.put(cacheKey, match);
		}


		function hello() {
			console.log('Hello World!');
		}
	}
})();