'use strict';

/*global App*/
/*global Firebase*/

App.controller('AdminCtrl',['$scope', '$rootScope', '$firebase', function($scope, $rootScope, $firebase){
	
	// create new fb 
	var ref = new Firebase('https://no-anchor.firebaseio.com');

	// get blog posts from fb
	var refBlog = ref.child('blog');
	var posts = $firebase(refBlog);
	$scope.blog = posts.$asArray();

	console.log('blog', $scope.blog);
  	
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

	$scope.obj = {};

	
	$scope.addBlogPost = function(post){
		post.previewImg = '';
		
		// var blogPost = ref.child('blog');
		
		var cDate = new Date();		
		var m = cDate.getMonth();
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
		var d = months[m] + ' ' + cDate.getDate() + ', ' + cDate.getFullYear();
		// console.log(d);
		console.log(post);

		post.tags = post.tags.split(',');
		console.log(post.tags);

		console.log($scope.obj.flow.files[0].file);
		// console.log($flow.files[0]);

		var fileReader = new FileReader();
  		fileReader.readAsDataURL($scope.obj.flow.files[0].file);
  		// console.log($scope.objs);
  		// fileReader.readAsDataURL($scope.objs.flow.files[1].file);
  		fileReader.onload = function (event) {
            console.log('file data', event.target.result);
            post.previewImg = event.target.result;
			

        // console.log('meow:', p);
		
			refBlog.push({
				header: post.header,
				previewImg: post.previewImg + '',
				time: d,
				text: post.text,
				tags: post.tags  
			});

        };
		
	};

	$scope.deleteBlogPost = function(id){
		console.log('delete', id);

		posts.$remove(id);
	};

}]);