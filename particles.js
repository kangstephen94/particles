
var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');
window.addEventListener('resize',
    function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        init();
    }
);
var repulsionDistance = 150;
var connectionDistance = 160;
var numParticles = 100;
var particleSpeedVector = 5;
var particleArray = [];
var mode = 'repulse';
var opacityFactor = 0.16;
var mouse = {
    x: undefined,
    y: undefined,
};

var numParticlesOption = document.getElementById('particlesNumber');
numParticlesOption.addEventListener('change', 
    function () {
        numParticles = numParticlesOption.value;
        createCircles();
    }
);

var modeOption = document.getElementById('mode');
modeOption.addEventListener('change',
    function () {
        mode = modeOption.value;
    }
);


var colorArray = [
    '#ff0000',
    '#ff00ff',
    '#990033',
    '#ff6600',
    '#9900ff'
];

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);


window.addEventListener('click', 
    function(event) {
        var x = (((Math.random()-0.5)*repulsionDistance) + mouse.x);
        var y = (((Math.random()-0.5)*repulsionDistance) + mouse.y);
        var radius = 1.5;
        var dx = ((Math.random() - 0.5) * particleSpeedVector);
        var dy = ((Math.random() - 0.5) * particleSpeedVector);
        var boundary = 200;
        particleArray.push(new Circle(x, y, dx, dy, radius, boundary));
    }
);


function Circle(x, y, dx, dy, radius, boundary) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*(colorArray.length-1))];
    this.boundary = boundary;
}
    Circle.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    Circle.prototype.update = function () {
        if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
            this.dx = -this.dx;
        }
        if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

        if (mode === "repulse") {
        if (distance(mouse, this) < repulsionDistance) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var angle = Math.atan2(dy, dx);
            var distancetoRadius = repulsionDistance - (distance(mouse, this));
            var newXchange = Math.cos(angle) * distancetoRadius;
            var newYchange = Math.sin(angle) * distancetoRadius;
            this.x += newXchange;
            this.y += newYchange;
        }
    } else if (mode==='grab') {
        if (distance(mouse, this) < repulsionDistance) {
            c.beginPath();
            c.moveTo(mouse.x, mouse.y);
            c.lineTo(this.x, this.y);
            c.lineWidth = 1;
            c.strokeStyle = "rgba(255, 0, 0, 1)";
            c.stroke();
            c.closePath();
        }
    } else if (mode==='bubble') {
        if (distance(mouse,this) < repulsionDistance) {
            if (this.radius < 30) {
            this.radius += 1.5;
            }
        } 
        }
        if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        for (var i = 0; i < particleArray.length; i++) {  
            var dist = distance(this, particleArray[i]);
            if (dist < connectionDistance) {
                var fraction = (connectionDistance/dist)*opacityFactor;
                drawline(this, particleArray[i], fraction);
            }
        }
    };


function distance (circleObj1, circleObj2) {
    var dx = circleObj2.x - circleObj1.x;
    var dy = circleObj2.y - circleObj1.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
}

function drawline(circleObj1, circleObj2, opacity) {
    var x1 = circleObj1.x;
    var y1 = circleObj1.y;
    var x2 = circleObj2.x;
    var y2 = circleObj2.y;
    
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = 0.4;
    c.strokeStyle= `rgba(255, 255, 255, ${opacity})`;
    c.stroke();
    c.closePath();
}


function init() {
    particleArray = [];
    for (var i = 0; i < numParticles; i++) {
        var radius = 1.5;

        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = ((Math.random() - 0.5) * particleSpeedVector);
        var dy = ((Math.random() - 0.5) * particleSpeedVector);
        var boundary = 200;
        particleArray.push(new Circle(x, y, dx, dy, radius, boundary));
    }

}

function createCircles () {
    particleArray = [];
    for (var i = 0; i < numParticles; i++) {
        var radius = 1.5;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = ((Math.random() - 0.5) * particleSpeedVector);
        var dy = ((Math.random() - 0.5) * particleSpeedVector);
        var boundary = 200;
        particleArray.push(new Circle(x, y, dx, dy, radius, boundary));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

createCircles();
animate();