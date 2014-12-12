'use strict';

/*global App*/
/*global Firebase*/

App.controller('AdminCtrl',['$scope', '$rootScope', '$window', '$location', '$route', function($scope, $rootScope, $window, $location, $route){
 	
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

	
	// check to make sure the user is an admin
	var checkUser = function(authData){
		console.log('check user', authData.uid); 
		// if the user isn't the admin  
		if(authData.uid != 'twitter:2361496574'){
			// logout the user
			$rootScope.admin = {
	          'id' : '',
	        };
			ref.unauth();
		}else{
			// keep user logged in
			console.log('auth ctrl: user authorized');
			// set the currentUser in the rootscope
	        $rootScope.admin = {
	          'id' : authData.uid,
	        };
	        $scope.$apply()
		}
	};
  	
  	var blogPost = ref.child("blog");
  	var cDate = new Date();
/*
	blogPost.push({
	  header: 'Testing',
	  date: cDate,
	  text: 'this is test text'  
	});
*/

}]);

  
