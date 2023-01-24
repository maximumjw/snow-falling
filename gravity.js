var canvas = document.querySelector('canvas')
    ;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var image = 'umbrella.png';

var img = new Image();
img.onload=function(){
    c.drawImage(img,0,0,10,10);
}
img.src = image;
var mouse={
    x: undefined,
    y: undefined
}
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.addEventListener('mouseup', function (event) {
    Input();
})
window.addEventListener('mousemove',
    function(event){
    mouse.x=event.x-35;
    mouse.y=event.y-35;
}); 
var gravity = 0.1;
var friction = 0.9;

let waterDropsArray = [];
let waterParticlesArray = [];

function WaterDrops() {
    this.x = Math.floor((window.innerWidth / 2) - 70 + Math.floor(Math.random() * window.innerWidth / 10));
    this.y = 180;
    this.size = 5;
    let speedY = Math.random();
    this.update = function () {
        this.y += speedY;
        speedY += gravity;
    }
    this.draw = function () {
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c.fill();
    }
}
function WaterParticles(x,y) {
    this.x = x;
    this.y =y;
    this.size = Math.random() * 3 + 2;

    let speedX = Math.random() * 3 - 1;
    let speedY = Math.random() - 1.5;

    this.update = function () {
        this.y += speedY;
        this.x += speedX;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }
    this.draw = function () {
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c.fill();
    }
}
function renderWaterParticles() {
    for (var i = 0; i < waterParticlesArray.length; i++) {
        waterParticlesArray[i].draw();
        waterParticlesArray[i].update();
        if (waterParticlesArray[i].size <= 0.2) {
            waterParticlesArray.splice(i, 1);
            i--;
        }
    }
}
function renderWaterDrops() {
    for (var i = 0; i < waterDropsArray.length; i++) {
        waterDropsArray[i].draw();
        waterDropsArray[i].update();
        if (waterDropsArray[i].y >= window.innerHeight - 100
            ) {
            for (var ind = 0; ind < 12; ind++) {
                waterParticlesArray.push(new WaterParticles(waterDropsArray[i].x,window.innerHeight - 100))
            }
            waterDropsArray.splice(i, 1);
            i--;
        }
        else if (Math.abs(waterDropsArray[i].y-mouse.y+35)<=5&&Math.abs(mouse.x-waterDropsArray[i].x+35)<=35){
            console.log(waterDropsArray[i].y-mouse.y,mouse.x-waterDropsArray[i].x);
            for (var ind = 0; ind < 12; ind++) {
                waterParticlesArray.push(new WaterParticles(waterDropsArray[i].x,waterDropsArray[i].y+40));
            }
            waterDropsArray.splice(i, 1);
            i--;
        }
    }
}
function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.update = function () {
        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy * friction;
        }
        else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.draw();
    }

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}
function Input() {
    for (var i = 0; i < 10; i++) {
        waterDropsArray.push(new WaterDrops());
    }
}
function animate() {
    requestAnimationFrame(animate); //애니메이션
    c.clearRect(0, 0, innerWidth, innerHeight); //흔적 안남도록 순간순간 초기화
    c.fillStyle = 'white';
    c.beginPath();
    c.fillRect(window.innerWidth / 4, window.innerHeight - 100, window.innerWidth / 2, 4);
    c.drawImage(img,mouse.x,mouse.y,70,70);
    renderWaterDrops();
    renderWaterParticles();
}
for (var i = 0; i < 10; i++) {
    waterDropsArray.push(new WaterDrops());
}

animate();

