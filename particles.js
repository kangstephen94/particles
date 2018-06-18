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

// c.fillStyle = "blue";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "green";
// c.fillRect(500, 500, 100, 100);
// c.fillStyle = "purple";
// c.fillRect(300, 300, 100, 600);


// c.beginPath();
// c.moveTo(50, 100);
// c.lineTo(100, 200);
// c.lineTo(500, 900);
// c.lineTo(50, 400);
// c.strokeStyle = "black";
// c.stroke();



// for (var i = 0; i < 5; i++) {  
//     var a = Math.random();
//     var b = Math.random();
//     var d = Math.random();

//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
// c.beginPath();
// c.arc(x, y, 70, 0, Math.PI * 2, false);
// c.strokeStyle = 'rgb(a, b, d)';
// c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
};

// var colorArray = [
//     '#ff0000',
//     '#ff00ff',
//     '#990033',
//     '#ff6600',
//     '#9900ff'
// ];

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    }
);



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = 'white';

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function () {
        if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
            this.dx = -this.dx;
        }
        if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 200) {
                this.radius += 2;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    };
}


var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 700; i++) {
        var radius = Math.random() * 10 + 1;

        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = ((Math.random() - 0.5) * 5);
        var dy = ((Math.random() - 0.5) * 5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}

for (var i = 0; i < 700; i++) {
    var radius = Math.random() * 10 + 1;

    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = ((Math.random() - 0.5) * 5);
    var dy = ((Math.random() - 0.5) * 5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();