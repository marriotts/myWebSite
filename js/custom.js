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
    var idToToggle, selectids, verticalOffset, offset, offsetTop, last, element;

    /* Link to Accordion from another page and toggle plus/minus icon */
    selectids = $('#collapseOne, #collapseTwo, #collapseThree, #collapseFour');
    idToToggle = window.location.hash.replace("#", "");
    selectids.on('show.bs.collapse hidden.bs.collapse', function () {
        $(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    });
    $("#" + idToToggle).collapse('show');
    /* /Link to Accordion from another page and toggle plus/minus icon */

    /* Scroll to Top */
    function scrollToTop() {
        verticalOffset = typeof (verticalOffset) !== 'undefined' ? verticalOffset : 0;
        element = $('body');
        offset = element.offset();
        offsetTop = offset.top;
        $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
    }

    $(function () {
        $(document).on('scroll', function () {
            if ($(window).scrollTop() > 175) {
                $('.scroll-top-wrapper').addClass('show');
            } else {
                $('.scroll-top-wrapper').removeClass('show');
            }
        });

        $('.scroll-top-wrapper').on('click', scrollToTop);
    });
    /* /Scroll to Top */

});
