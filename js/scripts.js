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
	
	// Help form
	// https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
	var request;
	$(".contact-send").click(function() {
		// Check fields
		if (!$("#contact-name").val()) {
			alert("Будь ласка, введіть ваше ім'я");
			return;
		}
		if (!$("#contact-email").val()) {
			alert("Будь ласка, введіть ваш email");
			return;
		}
		if (!isValidEmailAddress($("#contact-email").val())) {
			alert("Будь ласка, введіть коректнний email");
			return;
		}
		
		// Abort any pending request
		if (request) {
			request.abort();
		}
		
		var d = new Date();
		request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbzzUYyMXrnT_r_gS_RiQn84AtN4E3qWHzAkr8EZRNm9B-ywdmr5/exec",
			type: "POST",
			data: {
				date: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
				name: $("#contact-name").val(),
				email: $("#contact-email").val(),
				phone: $("#contact-phone").val(),
				c1: ($("#contact-check-1").prop("checked") ? 1 : 0),
				c2: ($("#contact-check-2").prop("checked") ? 1 : 0),
				c3: ($("#contact-check-3").prop("checked") ? 1 : 0),
				c4: ($("#contact-check-4").prop("checked") ? 1 : 0),
				c5: ($("#contact-check-5").prop("checked") ? 1 : 0),
				c6: ($("#contact-check-6").prop("checked") ? 1 : 0),
				c7: ($("#contact-check-7").prop("checked") ? 1 : 0),
				c8: ($("#contact-check-8").prop("checked") ? 1 : 0)
			}
		});

		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// Log a message to the console
			alert("Дані успішно відправлено");
		});

		// Callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// Log the error to the console
			alert("Помилка при відправленні даних. Напишіть нам будь ласка на ...");
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});
	});
	
	// http://stackoverflow.com/questions/2855865/jquery-regex-validation-of-e-mail-address
	function isValidEmailAddress(emailAddress) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	};
	
	// Video
	var playing = false;
	var video = document.getElementById("video");
	$(".video-play").click(function () {
		if (playing) {
			$(".video-play").css("opacity", "1.0");
			$(".video-header").css("opacity", "1.0");
			video.pause();
		}
		else {
			$(".video-play").css("opacity", "0.0");
			$(".video-header").css("opacity", "0.0");
			video.play();
		}
		playing = !playing;
	});
}
