'use strict';

var App = angular.module('newSiteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]);
App.config(function ($routeProvider) {
$routeProvider
  .when('/', {
    templateUrl: 'views/landing.html',
    controller: 'LandingCtrl'
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl'
  })
    .when('/blog', {
    templateUrl: 'views/blog.html',
    controller: 'BlogCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

App.run(['$rootScope', '$location', function($rootScope, $location){

	console.log('running');

	// Create a callback which logs the current auth state
	function authDataCallback(authData) {
	  if (authData) {
		$rootScope.admin = {
          'id' : authData.uid,
        };
        // $scope.$apply();
	    console.log('app: User ' + authData.uid + ' is logged in with ' + authData.provider);
	  } else {
		$rootScope.admin = {
          'id' : '',
        };
	    console.log('app: User is logged out');
	  }
	}
	
	// Register the callback to be fired every time auth state changes
	var ref = new Firebase('https://no-anchor.firebaseio.com');
	ref.onAuth(authDataCallback);
	
}]);

/*
App.directive('fadeLogo', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window);
      var handler = function() {
        scope.scroll = windowEl.scrollTop();
      }
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});
*/

App.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


App.directive('fadeLogo', function ($window, $document) {
return {
    link: function ($scope, element, attrs) {
		// element.addClass('blur');
        var height = element[0].offsetHeight;
        console.log('h', height);
        
/*
        var document = $document[0];
		var test = $window.innerHeight;
*/
		// console.log(test);
		
		
/*
		var cat = angular.element('#landing').height;
		console.log('cat', cat);
*/
			
/*
		$window.onscroll = function (e) {
		
			console.log('meow');
			// var scrollHeight = document.body.scrollHeight;
			// console.log(scrollHeight);

		};
*/

    }
};
});