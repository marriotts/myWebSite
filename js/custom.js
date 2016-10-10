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

/* Toggle Panel Color */
$(function () {
    'use strict';
    $('.panel-color').click(function () {
        $(this).toggleClass('on');
    });
});
/* /Toggle Panel Color */

/* Accordion Icon */
$(function ($) {
    'use strict';
    var selectids = $('#collapseOne, #collapseTwo, #collapseThree, #collapseFour');
    selectids.on('show.bs.collapse hidden.bs.collapse', function () {
        $(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    });
});
/* /Accordion Icon */
