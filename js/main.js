$(function(){

	console.log('running');

	// MENU FUNCTIONS

	// // var to check if about is open
	var aboutOpen = false;
	var contactOpen = false;

	// when the menu btn is clicked
	$("li.about").click(
		function() {
			console.log('click');
			// check to see if it's open
			if(!aboutOpen && !contactOpen){
				//if it is, open about
				$("#overlay-container").css('z-index', '1');
				$("header").addClass( "blur" );
				$("#overlay").addClass( "gradient" );
				$(".about-no-anchor").addClass( "opacity" );

				//set var
				aboutOpen = true;
			}
			else if(!aboutOpen && contactOpen ){
				$(".contact-no-anchor").removeClass( "opacity" );
				$(".about-no-anchor").addClass( "opacity" );

				// set var
				aboutOpen = true;
				contactOpen = false;
			}
			else if(aboutOpen && !contactOpen){
				// close about
				$("header").removeClass( "blur" );
				$("#overlay").removeClass( "gradient" );
				$(".about-no-anchor").removeClass( "opacity" );
				$("#overlay-container").css('z-index', '-1');
				// set var
				aboutOpen = false;
			}

		}
	);

	$("li.contact").click(
		function() {
			console.log('click');
			// check to see if it's open
			if(!aboutOpen && !contactOpen){
				//if it is, open about
				$("#overlay-container").css('z-index', '1');
				$("header").addClass( "blur" );
				$("#overlay").addClass( "gradient" );
				$(".contact-no-anchor").addClass( "opacity" );

				//set var
				contactOpen = true;
			}
			else if(aboutOpen && !contactOpen ){
				$(".about-no-anchor").removeClass( "opacity" );
				$(".contact-no-anchor").addClass( "opacity" );

				// set var
				contactOpen = true;
				aboutOpen = false;
			}
			else if(!aboutOpen && contactOpen){
				// close about
				$("header").removeClass( "blur" );
				$("#overlay").removeClass( "gradient" );
				$(".contact-no-anchor").removeClass( "opacity" );
				$("#overlay-container").css('z-index', '-1');
				// set var
				contactOpen = false;
			}

		}
	);

});