//

window.addEventListener("load", windowLoadHandler, false);

//for debug messages
var Debugger = function () {};
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
}

function windowLoadHandler() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport()) {
        return;
    }

    var theCanvas = document.getElementById("canvasAesthetic");
    var context = theCanvas.getContext("2d");
    // theCanvas.width = 500;
    // theCanvas.height = 500;
    var displayWidth = theCanvas.width;
    var displayHeight = theCanvas.height;
    // console.log(theCanvas.width)
    // console.log(theCanvas.height)

    init();

    function init() {
        generate();
        theCanvas.addEventListener("click", clickListener, false);
		document.getElementById("menu_about").addEventListener("click", clickListener, false);
    }

    // setInterval(function () {
    // 		// theCanvas.click();
    // 		console.log('click click')
    // 		context.clearRect(0,0,theCanvas.width,theCanvas.height);
    // 		generate();
    // }, 3000);

    function clickListener(evt) {
        console.log('click')
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        generate();

        //code below prevents the mouse down from having an effect on the main browser window:
        if (evt.preventDefault) {
            evt.preventDefault();
        } //standard
        else if (evt.returnValue) {
            evt.returnValue = false;
        } //older IE
        return false;
    }

    function setLinePoints(iterations) {
        var pointList = {};
        pointList.first = {
            x: 0,
            y: 1
        };
        var lastPoint = {
            x: 1,
            y: 1
        }
        var minY = 1;
        var maxY = 1;
        var point;
        var nextPoint;
        var dx, newX, newY;

        pointList.first.next = lastPoint;
        for (var i = 0; i < iterations; i++) {
            point = pointList.first;
            while (point.next != null) {
                nextPoint = point.next;

                dx = nextPoint.x - point.x;
                newX = 0.5 * (point.x + nextPoint.x);
                newY = 0.5 * (point.y + nextPoint.y);
                newY += dx * (Math.random() * 2 - 1);

                var newPoint = {
                    x: newX,
                    y: newY
                };

                //min, max
                if (newY < minY) {
                    minY = newY;
                } else if (newY > maxY) {
                    maxY = newY;
                }

                //put between points
                newPoint.next = nextPoint;
                point.next = newPoint;

                point = nextPoint;
            }
        }

        //normalize to values between 0 and 1
        if (maxY != minY) {
            var normalizeRate = 1 / (maxY - minY);
            point = pointList.first;
            while (point != null) {
                point.y = normalizeRate * (point.y - minY);
                point = point.next;
            }
        }
        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
        else {
            point = pointList.first;
            while (point != null) {
                point.y = 1;
                point = point.next;
            }
        }

        return pointList;
    }

    function generate() {
        var centerX, centerY;
        var r, g, b, a;
        var color0, color1;
        var lineW;
        var maxRad, minRad;
        var phase;

        centerX = displayWidth / 2;
        centerY = displayHeight / 2;

        var numCircles = 20;
        var startAlpha = 55 / 255;
        var endAlpha = 32 / 255;


        for (var i = 0; i < numCircles; i++) {
            maxRad = 20 + (i + 1) / numCircles * 220;
            minRad = 20 + (0.85 + 0.15 * Math.random()) * i / numCircles * 220;

            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
            //square-rooting the parameter moves the alpha towards transparent more rapidly. 
            a = startAlpha + (i / (numCircles - 1)) * (endAlpha - startAlpha);
            a0 = 0.67 * a;

            //very subtle radial gradient							
            color1 = "rgba(" + r + "," + g + "," + b + "," + a + ")";
            color0 = "rgba(" + r + "," + g + "," + b + "," + a0 + ")";
            grad = context.createRadialGradient(centerX, centerY, 0.67 * maxRad, centerX, centerY, maxRad);
            grad.addColorStop(0, color0);
            grad.addColorStop(1, color1);
            context.fillStyle = grad;

            phase = Math.random() * Math.PI * 2;

            drawCircle(centerX, centerY, minRad, maxRad, phase, color1, grad);
        }
    }

    function drawCircle(centerX, centerY, minRad, maxRad, phase, lineColor, fill) {
        var point;
        var rad, theta;
        var twoPi = 2 * Math.PI;
        var x0, y0;

        //generate the random function that will be used to vary the radius, 9 iterations of subdivision
        var pointList = setLinePoints(9);

        context.strokeStyle = lineColor;
        context.lineWidth = 1.01;
        context.fillStyle = fill;
        context.beginPath();
        point = pointList.first;
        theta = phase;
        rad = minRad + point.y * (maxRad - minRad);
        x0 = centerX + rad * Math.cos(theta);
        y0 = centerY + rad * Math.sin(theta);
        context.lineTo(x0, y0);
        while (point.next != null) {
            point = point.next;
            theta = twoPi * point.x + phase;
            rad = minRad + point.y * (maxRad - minRad);
            x0 = centerX + rad * Math.cos(theta);
            y0 = centerY + rad * Math.sin(theta);
            context.lineTo(x0, y0);
        }
        context.stroke();
        context.fill();
    }

}

var originalDocTitle = document.title;
var timeout;

document.onmousemove = function(){
	clearTimeout(timeout)
	setScreensaver(originalDocTitle, false)
	timeout = setTimeout( function() {
		setScreensaver("NO NAME", true)
	}, 30000*2);//30000*2
}

document.addEventListener('visibilitychange', function() {
	if (document.hidden) {
		setScreensaver("NO NAME", true)
	} else {
		setScreensaver(originalDocTitle, false)
	}
});

var setScreensaver = function(title, visibility){
	document.title = title
	if(visibility){
		if($('#screen-saver').length == 0){
			$('<div id="screen-saver"></div>').addClass('screen-saver-is-active').appendTo('body');
		}
		if($('#screen-saver').length == 1){
			$('#screen-saver').addClass("screen-saver-is-active");
		}
		$('body').css('overflow-y', 'hidden');
		
	}else{
		$('#screen-saver').removeClass("screen-saver-is-active");
		$('body').css('overflow-y', 'auto');
	}
}