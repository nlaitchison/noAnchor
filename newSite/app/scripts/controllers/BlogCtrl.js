'use strict';

/*global App*/
/*global Firebase*/

App.controller('BlogCtrl',['$scope', '$firebase', function($scope, $firebase){
	
	// create new fb 
	var ref = new Firebase('https://no-anchor.firebaseio.com/blog');
  	
  	var posts = $firebase(ref);
	
	// if ref points to a data collection
	$scope.blog = posts.$asArray();
	console.log($scope.blog);

}]);