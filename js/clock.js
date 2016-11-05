var ang, color, context, radius, roman, num, rom = false;

function drawFace(context, radius) {
    'use strict';
    var grad;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = '#ccc';
    context.fill();
    grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, '#FFF');
    grad.addColorStop(1, '#333');
    context.strokeStyle = grad;
    context.lineWidth = radius * 0.08;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    context.fillStyle = '#333';
    context.fill();
}

function numToRoman(num) {
    'use strict';
    switch (num) {
    case 1:
        return "I";
    case 2:
        return "II";
    case 3:
        return "III";
    case 4:
        return "IV";
    case 5:
        return "V";
    case 6:
        return "VI";
    case 7:
        return "VII";
    case 8:
        return "VIII";
    case 9:
        return "IX";
    case 10:
        return "X";
    case 11:
        return "XI";
    case 12:
        return "XII";
    }
}

function drawNumbers(context, radius) {
    'use strict';
    context.font = radius * 0.15 + "px times";
    context.textBaseline = "middle";
    context.textAlign = "center";

    for (num = 1; num < 13; num += 1) {
        roman = numToRoman(num);
        ang = num * Math.PI / 6;
        context.rotate(ang);
        context.translate(0, -radius * 0.85);
        context.rotate(-ang);
        //context.fillText(num.toString(), 0, 0);
        if (rom) {
            context.fillText(roman, 0, 0);
        } else {
            context.fillText(num.toString(), 0, 0);
        }
        context.rotate(ang);
        context.translate(0, radius * 0.85);
        context.rotate(-ang);
    }
}

function drawHand(context, pos, length, width, color) {
    'use strict';
    context.strokeStyle = color;
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
}


function drawTime(context, radius) {
    'use strict';
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    //hour
    color = '#000';
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(context, hour, radius * 0.65, radius * 0.06, color);

    //minute
    color = '000';
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(context, minute, radius * 0.85, radius * 0.04, color);

    // second
    color = '#FF0000';
    second = (second * Math.PI / 30);
    drawHand(context, second, radius * 0.9, radius * 0.02, color);
}

function drawClock() {
    'use strict';
    drawFace(context, radius);
    drawNumbers(context, radius);
    drawTime(context, radius);
}

var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);