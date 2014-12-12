'use strict';

/*global App*/
/*global Firebase*/

App.controller('AdminCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	// create new fb 
	var ref = new Firebase('https://no-anchor.firebaseio.com');
  	
	// login function
	$rootScope.loginUser = function(){
		console.log('login');
	
		// twitter login auth
		ref.authWithOAuthPopup('twitter', function(error, authData) {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				console.log('Authenticated successfully with payload:', authData);
				checkUser(authData);
			}
		}, {
			remember: 'sessionOnly'
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
		if(authData.uid !== 'twitter:2361496574'){
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
	        $scope.$apply();
		}
	};
	
	$scope.addBlogPost = function(user){

		console.log('addPost');
		
		var blogPost = ref.child('blog');
		
		var cDate = new Date();
		console.log(user, cDate);
		
		var m = cDate.getMonth();
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
		var d = months[m] + ' ' + cDate.getDate() + ', ' + cDate.getFullYear();
		console.log(d);
		
		blogPost.push({
			header: user.header,
			time: d,
			text: user.text,
			tags: user.tags  
		});
		
	};

}]);