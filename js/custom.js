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

