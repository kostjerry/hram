window.onload = function () {
	// Smooth scrooling
	// https://css-tricks.com/snippets/jquery/smooth-scrolling
	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});
	
	// Timer
	$(function () {
		var aimDate = new Date('9/1/2016 08:00:00 GMT+0300'),
			setTime = function (seconds) {
				var days, hours, minutes;
				
				seconds = Math.floor(seconds);
				days = Math.floor(seconds / 86400.0);
				seconds -= days * 86400.0;
				hours = Math.floor(seconds / 3600.0);
				seconds -= hours * 3600.0;
				if (hours < 10) {
					hours = "0" + hours;
				}
				minutes = Math.floor(seconds / 60.0);
				seconds -= minutes * 60.0;
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				
				$("#time-seconds").html(seconds);
				$("#time-minutes").html(minutes);
				$("#time-hours").html(hours);
				$("#time-days").html(days);
			};
		
		setTime((aimDate - (new Date())) / 1000.0);
		
		setInterval(function () {
			setTime((aimDate - (new Date())) / 1000.0);
		}, 1000);
	});
}
