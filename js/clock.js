var color, ctx, radius,
    roman, num, canvas,
    romanNumerals = false; //Set to true for Roman Numerals

function drawFace(ctx, radius) {
    'use strict';
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ccc';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    //Create a metallic copper gradient
    grad.addColorStop(0.000, 'rgba(151, 70, 26, 1.000)');
    grad.addColorStop(0.300, 'rgba(251, 216, 197, 1.000)');
    grad.addColorStop(0.830, 'rgba(108, 46, 22, 1.000)');
    grad.addColorStop(1.000, 'rgba(239, 219, 205, 1.000)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.08;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
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

function drawNumbers(ctx, radius) {
    'use strict';
    var ang, sang, cang, i, sx, sy, ex, ey, nx, ny;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    //Markings/Numerals
    for (i = 1; i <= 60; i += 1) {
        num = i / 5;
        ang = Math.PI / 30 * i;
        sang = Math.sin(ang);
        cang = Math.cos(ang);

        //If i is an exact multiple of 5, draw the hour ticks & numerals
        if (i % 5 === 0) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
            sx = sang * (radius * 0.78);
            sy = cang * (radius * -0.78);
            ex = sang * (radius * 0.95);
            ey = cang * (radius * -0.95);
            nx = sang * (radius * 0.65);
            ny = cang * (radius * -0.65);
            // Place numerals
            if (romanNumerals) {
                ctx.font = radius * 0.14 + "px times";
                roman = numToRoman(num);
                ctx.fillText(roman, nx, ny);
            } else {
                ctx.font = radius * 0.15 + "px arial";
                ctx.fillText(num.toString(), nx, ny);
            }
        // Otherwise draw the minute ticks
        } else {
            ctx.lineWidth = 1;
            sx = sang * radius * 0.85;
            sy = cang * radius * 0.85;
            ex = sang * radius * 0.95;
            ey = cang * radius * 0.95;
            ctx.strokeStyle = '#000';
        }
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
    }
}

function drawHand(ctx, pos, length, width, color) {
    'use strict';
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawTime(ctx, radius) {
    'use strict';
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    // Hour
    color = '#000';
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.65, radius * 0.06, color);

    // Minute
    color = '#000';
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.85, radius * 0.04, color);

    // Second
    color = '#FF0000';
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, color);
}

function drawClock() {
    'use strict';
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

canvas = document.getElementById("canvasTime");
ctx = canvas.getContext("2d");
radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);