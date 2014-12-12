'use strict';

var App = angular.module('newSiteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
App.config(function ($routeProvider) {
$routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

App.run(['$firebaseSimpleLogin', '$rootScope','$location', '$firebase', 'FireUser', function($firebaseSimpleLogin, $rootScope, $location, $firebase, FireUser){

    //reference to firebase
    var db = new Firebase('https://bandmate.firebaseio.com');
    //sets up simple login
    $rootScope.loginObject = $firebaseSimpleLogin(db);

    // if a user is logged in then
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user){

      // get the logged in users id that is stored in firebase
      var userId = user.provider + user.id;

      // then get this user from firebase and set it to the rootscope
      $rootScope.currentUser = FireUser(userId);

      // set the rootscope so user info can be displayed in views
      $rootScope.currentUser.id = userId;
      // $rootScope.currentUser.name = user.name;
      $rootScope.currentUser.imgUrl = user.profile_image_url;

      // check the location
      // if the location is the landing page and a user is logged in
      // go to the studio page
      if($location.path() === '/'){
        $location.path('/studio/' + $rootScope.currentUser.id);
      }

      console.log('root', $rootScope.currentUser.id);

    });

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


App.service('anchorSmoothScroll', function ($document, $window) {

	var document = $document[0];
	var window = $window;
	
	function getCurrentPagePosition(window, document) {
	    // Firefox, Chrome, Opera, Safari
	    if (window.pageYOffset) return window.pageYOffset;
	    // Internet Explorer 6 - standards mode
	    if (document.documentElement && document.documentElement.scrollTop)
	        return document.documentElement.scrollTop;
	    // Internet Explorer 6, 7 and 8
	    if (document.body.scrollTop) return document.body.scrollTop;
	    return 0;
	}
	
	function getElementY(document, element) {
	    var y = element.offsetTop;
	    var node = element;
	    while (node.offsetParent && node.offsetParent != document.body) {
	        node = node.offsetParent;
	        y += node.offsetTop;
	    }
	    return y;
	}
	
	this.scrollDown = function (startY, stopY, speed, distance) {
	
	    var timer = 0;
	
	    var step = Math.round(distance / 25);
	    var leapY = startY + step;
	
	    for (var i = startY; i < stopY; i += step) {
	        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	        leapY += step;
	        if (leapY > stopY) leapY = stopY;
	        timer++;
	    }
	};
	
	this.scrollUp = function (startY, stopY, speed, distance) {
	
	    var timer = 0;
	
	    var step = Math.round(distance / 25);
	    var leapY = startY - step;
	
	    for (var i = startY; i > stopY; i -= step) {
	        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	        leapY -= step;
	        if (leapY < stopY) leapY = stopY;
	        timer++;
	    }
	};
	
	this.scrollToTop = function (stopY) {
	    scrollTo(0, stopY);
	};
	
	this.scrollTo = function (elementId, speed) {
	    // This scrolling function
	    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
	
	    var element = document.getElementById(elementId);
	
	    if (element) {
	        var startY = getCurrentPagePosition(window, document);
	        var stopY = getElementY(document, element);
	
	        var distance = stopY > startY ? stopY - startY : startY - stopY;
	
	        if (distance < 100) {
	            this.scrollToTop(stopY);
	
	        } else {
	
	            var defaultSpeed = Math.round(distance / 100);
	            speed = speed || (defaultSpeed > 20 ? 20 : defaultSpeed);
	
	            if (stopY > startY) {
	                this.scrollDown(startY, stopY, speed, distance);
	            } else {
	                this.scrollUp(startY, stopY, speed, distance);
	            }
	        }
	
	    }
	
	};

});
