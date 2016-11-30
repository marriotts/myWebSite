/*!
 * Weather.js v1.0.
 * by Simon Marriott
 *
 * Copyright 2016, SJMWebDesigns, All rights reserved
*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

var wrapper = document.getElementById("weatherWrapper"),
    condition = document.getElementById("WeatherCond"),
    wdata = document.getElementById("weatherData"),
    wtitle = document.getElementById("weatherTitle"),
    wfooter = document.getElementById("weatherFooter"),
    api = "http://api.openweathermap.org/data/2.5/weather?",
    appid = "&APPID=4e8c039c946c3f8c29806a57a2b1d963",
    latitude,
    longitude;

function kelvinToFahrenheit(kelvinValue) {
    'use strict';
    var fahr = ((kelvinValue - 273.15) * 9 / 5) + 32;
    return Math.round(fahr);
}

function kelvinToCentigrade(kelvinValue) {
    'use strict';
    var cent = kelvinValue - 273.15;
    return Math.round(cent);
}

function mpsToMph(mps) {
    'use strict';
    // 1 m/s = 2.236941851939MPH
    var mph = mps * 2.236941851939;
    return mph.toFixed(2);
}

function degToCardinal(direction) {
    'use strict';
    var index = Math.trunc((direction / 22.5) + 0.5),
        sector = ["Northerly",
                  "NorthNorthEasterly",
                  "NorthEasterly",
                  "EastNorthEasterly",
                  "Easterly",
                  "EastSouthEasterly",
                  "SouthEasterly",
                  "SouthSouthEasterly",
                  "Southerly",
                  "SouthSouthWesterly",
                  "SouthWesterly",
                  "WestSouthWesterly",
                  "Westerly",
                  "WestNorthWesterly",
                  "NorthWesterly",
                  "NorthNorthWesterly"
                 ];
    
    return sector[(index % 16)];
}

//function getWeather(place) {
function getWeather(lat, lon) {
    'use strict';
    var latlon = 'lat=' + lat + '&lon=' + lon,
        wurl = api + latlon + appid,
        milesPerHour,
        compasDirection;
    $.ajax({
        url: wurl,
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) {
            
            //Populate the Title Div with Location
            if (data.name) {
                $("#city-text").html("The Weather For " + data.name + ", " + data.sys.country);
            }
            
            //Convert Wind Speed from m/s to MPH and Degrees to Cardinal
            if (data.wind.speed) {
                milesPerHour = mpsToMph(data.wind.speed);
                compasDirection = degToCardinal(data.wind.deg);
            }
            
            // Populate Left-Hand Side of Weather Display
            if (data.weather) {
                var imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    condition = data.weather[0].description.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });
                $("#weatherImg").attr("src", imgURL);
                $("#weather-text").html(condition);
                $("#windSpeed").html("The wind is<br />" + compasDirection + "<br />at " + milesPerHour + " mph");
            }

            // Populate Right-Hand Side of Weather Display
            if (data.main) {
                $("#temperature").html(kelvinToCentigrade(data.main.temp) + "&deg; C<br />" + kelvinToFahrenheit(data.main.temp) + "&deg; F");
                $("#humidity").html("Humidity " + data.main.humidity + "%");
                $("#pressure").html("Pressure " + data.main.pressure + " mbar\n");
            }
            
            //Populate The Weather Footer Div
            $("#weatherFooter").html("<a href='https://openweathermap.org/'>Powered by  OpenWeatherMap</a>");
        }
    });
}

//Get the latitude and the longitude;
jQuery(document).ready(function () {
    'use strict';
    jQuery.get("http://ipinfo.io/", function (response) {
        latitude = response.loc.split(',')[0];
        longitude = response.loc.split(',')[1];

        getWeather(latitude, longitude);
    }, "jsonp");
});
