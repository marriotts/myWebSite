/*!
 * calendar.js v1.0.
 * by Simon Marriott
 *
 * Copyright 2016, SJMWebDesigns, All rights reserved
*/


/*jslint browser: true*/
/*global $, jQuery, alert*/

//this function will set the text value of tags
function setText(id, val) {
    'use strict';
    if (val < 10) {
        val = '0' + val;    //add leading 0 if val < 10
    }
    document.getElementById(id).innerHTML = val;
}

//this function will find today's date
function calendar() {
    'use strict';
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        date = new Date();

    setText('calendar-day', day[date.getDay()]);
    setText('calendar-date', date.getDate());
    setText('calendar-month-year', month[date.getMonth()] + ' ' + (1900 + date.getYear()));
}


//call calendar() when page load
window.onload = calendar;
