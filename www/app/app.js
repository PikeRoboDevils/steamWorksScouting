// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('steamWorks', ['ionic', 'angular-cache'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  // Caches
    // CacheFactory.destroyAll();
    // CacheFactory.clearAll();
    var matchCache;
    if (!CacheFactory.get('matchCache')) {
      matchCache = CacheFactory('matchCache', {
        storageMode: 'localStorage',
        maxAge: 60 * 60 * 1000, // 1hr
        deleteOnExpire: 'aggressive'
      });
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('app', {
    url: '/steamWorks',
    abstract: true,
    templateUrl: 'app/tabs.template.html'
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'app-welcome': {
        templateUrl: 'app/welcome/welcome.template.html',
        controller: 'welcomeCtrl',
        controllerAs: 'welcomeCtrl'
      }
    }
  })

  .state('app.auto', {
    url: '/auto',
    views: {
      'app-auto': {
        templateUrl: 'app/auto/auto.template.html',
        controller: 'autoCtrl',
        controllerAs: 'autoCtrl'
      }
    }
  })

  .state('app.teleOp', {
    url: '/teleOp',
    views: {
      'app-teleOp' : {
        templateUrl: 'app/teleOp/teleOp.template.html',
        controller: 'teleOpCtrl',
        controllerAs: 'teleOpCtrl'
      }
    }
  })

  .state('app.final', {
    url: '/final',
    views: {
      'app-final': {
        templateUrl: 'app/final/final.template.html',
        controller: 'finalCtrl',
        controllerAs: 'finalCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/steamWorks/welcome');

});
