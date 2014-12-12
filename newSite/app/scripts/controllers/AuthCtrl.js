'use strict';

/*global App*/
/*global Firebase*/

App.controller('AuthCtrl',['$rootScope', '$window', '$location', '$route', function($rootScope, $window, $location, $route){
 	
	// create new fb 
  	var ref = new Firebase("https://no-anchor.firebaseio.com");
  	
	// login function
	$rootScope.loginUser = function(){
		console.log('login');
	
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
  
	// logout function
	$rootScope.logoutUser = function(){
		console.log('logout');
		ref.unauth();
	};
	
	var changePage = function(){
		// $location.path('/admin/blog');
		$window.location.assign('http://127.0.0.1:9000/#/admin/blog');
		$route.reload();
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
		console.log('auth ctrl: user authorized');
		// take to edit pages
		changePage();
	}
	};

}]);

  
