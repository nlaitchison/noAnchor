'use strict';

/*global App*/
/*global Firebase*/

App.controller('AuthCtrl',['$rootScope', function($rootScope){

  // login function
  $rootScope.loginUser = function(){
  	console.log('login');
  	
  	// create new fb 
	var ref = new Firebase("https://no-anchor.firebaseio.com");
	
	// twitter login auth
	ref.authWithOAuthPopup("twitter", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
	}, {
	  remember: "sessionOnly"
	});
  };

}]);

  
