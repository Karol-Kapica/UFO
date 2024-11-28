class Ufo1 {
    constructor(element) {
        this.element = element;
        this.x = 100;
        this.y = 100;
        this.speed = 5;
        this.bullets = [];
        this.dx = 0;
        this.dy = 0;
        this.updatePosition();
        document.addEventListener('keydown', (e) => this.keyDownHandler(e));
        document.addEventListener('keyup', (e) => this.keyUpHandler(e));
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    move() {
        this.x = Math.max(0, Math.min(770, this.x + this.dx));
        this.y = Math.max(0, Math.min(570, this.y + this.dy));
        this.updatePosition();
    }
    shoot() {
        const bulletUp = document.createElement("div");
        bulletUp.classList.add("bullet");
        bulletUp.style.left = `${this.x + 10}px`;
        bulletUp.style.top = `${this.y}px`;
        document.getElementById('gameContainer').appendChild(bulletUp);
        this.bullets.push(new Bullet(bulletUp, this.x, this.y, -1));
    }
    shoot2(){
        const bulletDown = document.createElement("div");
        bulletDown.classList.add("bullet");
        bulletDown.style.left = `${this.x + 10}px`;
        bulletDown.style.top = `${this.y}px`;
        document.getElementById('gameContainer').appendChild(bulletDown);
        this.bullets.push(new Bullet(bulletDown, this.x, this.y, 1));
    }
    keyDownHandler(e) {
        if (e.key === "ArrowUp") this.dy = -this.speed;
        if (e.key === "ArrowDown") this.dy = this.speed;
        if (e.key === "ArrowLeft") this.dx = -this.speed;
        if (e.key === "ArrowRight") this.dx = this.speed;
        if (e.key === "e" && !this.ePressed) {
            this.shoot();
            this.ePressed = true;
        }
        if (e.key === "r" && !this.rPressed) {
            this.shoot2();
            this.rPressed = true;
        }
    }
    keyUpHandler(e) {
        if (e.key === "e") this.ePressed = false;
        if (e.key==="r") this.rPressed=false;
    }
}
class Ufo2 {
    constructor(element) {
        this.element = element;
        this.x = 300;
        this.y = 200;
        this.width = 30;
        this.height = 30;
        this.dx = 3;
        this.dy = 3;
        this.updatePosition();
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x <= 0 || this.x + this.width >= 800) this.dx *= -1;
        if (this.y <= 0 || this.y + this.height >= 600) this.dy *= -1;
        this.updatePosition();
    }
}
class Bullet {
    constructor(element, startX, startY, direction) {
        this.element = element;
        this.x = startX + 10;
        this.y = startY;
        this.speed = 8;
        this.direction = direction;
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    move() {
        this.y += this.speed *this.direction;
        this.updatePosition();
    }
    remove() {
        this.element.remove();
    }
}
function checkCollision(bullet, obj) {
    const bulletRect = bullet.element.getBoundingClientRect();
    const objRect = obj.element.getBoundingClientRect();
    return !(
        bulletRect.top > objRect.bottom ||
        bulletRect.bottom < objRect.top ||
        bulletRect.right < objRect.left ||
        bulletRect.left > objRect.right
    );
}
const ufo1 = new Ufo1(document.getElementById('gracz'));
const ufo2 = new Ufo2(document.getElementById('przeciwnik'));
const counter = document.getElementById('counter');
var hits = 0;
function gameLoop() {
    ufo1.move();
    ufo2.move();
    ufo1.bullets.forEach((bullet, index) => {
        bullet.move();
        if (checkCollision(bullet, ufo2)) {
            hits+=1;
            counter.innerHTML = hits;
            bullet.remove();
            ufo1.bullets.splice(index, 1);
            console.log("Hit!");
        } else if (bullet.y < 0||bullet.y > 600) {
            bullet.remove();
            ufo1.bullets.splice(index, 1);
        }
    });
    requestAnimationFrame(gameLoop);
}
gameLoop();