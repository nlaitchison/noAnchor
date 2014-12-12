'use strict';

/*global App*/
/*global Firebase*/

App.controller('AdminCtrl',['$rootScope','$location', function($rootScope, $location){
	
	function authDataCallback(authData) {
	  if (authData) {
	    console.log('admin logged in');
	  } else {
	    console.log('admin is logged out');
	    $location.path('/admin');
	    
	  }
	}
	
	// check for user
	authDataCallback();

}]);

  
