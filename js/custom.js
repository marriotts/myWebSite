/*!
 * Custom v1.0.
 * by Simon Marriott
 *
 * Copyright 2016, SJMWebDesigns, All rights reserved
 */


/*jslint browser: true*/
/*global $, jQuery, alert*/


$(document).ready(function () {
    'use strict';
    var idToToggle = window.location.hash.replace("#", "");
    $("#" + idToToggle).collapse('show');
});


/* Accordion Icon */
jQuery(function ($) {
    'use strict';
    var $active = $('#accordion .panel-collapse.in').prev().addClass('active');
    $active.find('a').append('<span class="accordion-icon"><i class="glyphicon glyphicon-minus"></i></span>');
    $('#accordion .panel-heading').not($active).find('a').append('<span class="accordion-icon"><i class="glyphicon glyphicon-plus"></i></span>');
    $('#accordion').on('show.bs.collapse', function (e) {
        $('#accordion .panel-heading.active').removeClass('active').find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
        $(e.target).prev().addClass('active').find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    });
});
