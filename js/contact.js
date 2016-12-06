/*!
 * contact.js v1.0.
 * by Simon Marriott
 *
 * Copyright 2016, SJMWebDesigns, All rights reserved
 */


/*jslint browser: true*/
/*global $, jQuery, alert*/

jQuery(document).ready(function () {
	'use strict';
    /*
        Section background
    */
    jQuery(document).ready(function ($) {
        $("#contact-form").backstretch(["img/maldives.jpg"], {duration: 3000, fade: 750});
    });
    /*
	    Contact form
	*/
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function () {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	});
	$('.contact-form form').submit(function (e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: '../assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function (json) {
                if (json.firstNameMessage !== '') {
                    $('.contact-form form .contact-first-name').addClass('input-error');
                }
                if (json.lastNameMessage !== '') {
                    $('.contact-form form .contact-last-name').addClass('input-error');
                }
	            if (json.emailMessage !== '') {
	                $('.contact-form form .contact-email').addClass('input-error');
	            }
	            if (json.subjectMessage !== '') {
	                $('.contact-form form .contact-subject').addClass('input-error');
	            }
	            if (json.messageMessage !== '') {
	                $('.contact-form form textarea').addClass('input-error');
	            }
	            if (json.firstNameMessage === '' && json.lastNameMessage === '' && json.emailMessage === '' && json.subjectMessage === '' && json.messageMessage === '') {
	                $('.contact-form form').fadeOut('fast', function () {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                    // reload background
                        $.backstretch("resize");
	                });
	            } else {
                    $('.contact-form form').fadeOut('fast', function () {
	                    $('.contact-form').append('<p>Oops! Something went wrong!<br /> Message not sent.</p>');
	                    // reload background
                        $.backstretch("resize");
                    });
                }
            }
        });
    });
});