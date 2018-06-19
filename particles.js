
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
var connectionDistance = 125;
var numParticles = 500;
var particleSpeedVector = 2;

var mouse = {
    x: undefined,
    y: undefined,
};

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

        if (distance(mouse, this) < repulsionDistance) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var angle = Math.atan2(dy, dx);
            var distancetoRadius = repulsionDistance - (distance(mouse, this));

            var newXchange = Math.cos(angle) * distancetoRadius;
            var newYchange = Math.sin(angle) * distancetoRadius;
            this.x += newXchange + 1;
            this.y += newYchange + 1;
        }

        for (var i = 0; i < particleArray.length; i++) {  
            var dist = distance(this, particleArray[i]);
            if (dist < connectionDistance) {
                var fraction = (connectionDistance/dist)*0.15;
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


var particleArray = [];

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

for (var i = 0; i < numParticles; i++) {
    var radius = 1.5;

    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = ((Math.random() - 0.5) * particleSpeedVector);
    var dy = ((Math.random() - 0.5) * particleSpeedVector);
    var boundary = 200;
    particleArray.push(new Circle(x, y, dx, dy, radius, boundary));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

animate();