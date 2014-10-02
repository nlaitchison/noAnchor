$(function(){

	console.log('running');


	// FOOTER CONTACTS

	$(".flag").click(
		function(event) {
			console.log('flag', this.id);

			var country = '#'+this.id;

			$.get('contacts-template.html', function(htmlArg){

				console.log('get');

				$("#contacts-container").empty();

				var source = $(htmlArg).find(country).html();
				var template = Handlebars.compile(source);
				var context = {title: "My New Post", body: "This is my first post!"}
				var html = template(context);
				$("#contacts-container").append(html);

			});
		}
	);

	// NAVIGATION PAGE POSITION BAR

	// when the user is scrolling
	window.onscroll = function (e) {

		// get the page height
		var height = $( 'body' ).height();
		// console.log('height', height);

		// get the position the user has scrolled too
		var pos = $(document).scrollTop();
		// console.log('pos', pos);

		// get the size of the nav bar
		var width = $('#bar-container').width();
		// console.log('width', width);

		// calculate the width of the red bar
		var leftPos = (pos * (width+120)) / height;
		// console.log(leftPos);

		// adjust the width of the bar
		$('.bar').css("width", leftPos);

	};


	// MENU FUNCTIONS

	// var to check if menu is open
	var menuOpen = false;

	// when the menu btn is clicked
	$("#menu-btn").click(
		function() {
			console.log('click');
			// check to see if it's open
			if(!menuOpen){
				// if it is, open the menu
				$(".mobile-header nav").addClass( "open" );
				// set var
				menuOpen = true;
			}
			// if not
			else if(menuOpen){
				// close the menu
				$(".mobile-header nav").removeClass( "open" );
				// set var
				menuOpen = false;
			}

		}
	);

	// when an option in the mobile/collapsing nav is clicked
	$(".mobile-header nav li a").click(
		function() {
			console.log('nav');
			// make sure the menu is actually open
			if(menuOpen){
				// then close the menu
				$(".mobile-header nav").removeClass( "open" );
				// set var
				menuOpen = false;
			}
		}
	);


	// Companies Hover Effects

	$(".company.supply").hover(
		function() {
			console.log('over');
			$(".company.supply .company-text").addClass( "current" );
		}, function() {
			console.log('off');
			$(".company.supply .company-text").removeClass( "current" );
		}
	);

	$(".company.rentals").hover(
		function() {
			console.log('over');
			$(".company.rentals .company-text").addClass( "current" );
		}, function() {
			console.log('off');
			$(".company.rentals .company-text").removeClass( "current" );
		}
	);

	$(".company.tools").hover(
		function() {
			console.log('over');
			$(".company.tools .company-text").addClass( "current" );
		}, function() {
			console.log('off');
			$(".company.tools .company-text").removeClass( "current" );
		}
	);

	$(".company.energy").hover(
		function() {
			console.log('over');
			$(".company.energy .company-text").addClass( "current" );
		}, function() {
			console.log('off');
			$(".company.energy .company-text").removeClass( "current" );
		}
	);


	// SMOOTH SCROLLING

	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
  	});

});