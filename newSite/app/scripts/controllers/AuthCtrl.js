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
			checkUser(authData);
		}
	}, {
	  remember: "sessionOnly"
	});
  };
  
  // check to make sure the user is an admin
  var checkUser = function(authData){
	console.log('check user', authData.uid); 
	// if the user isn't the admin  
	if(authData.uid != 'twitter:2361496574'){
		// logout the user
		ref.unauth();
	}else{
		// keep user logged in
		console.log('user authorized');
		//redirect user
	}
  };

}]);

  
