class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    
    
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 0;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();//time,date in ms est 1.1.1970
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;// difference in ms
        timepassed = timepassed / 1000;// difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    // Der Modulo-Operator in JavaScript, dargestellt durch das Prozentzeichen (%), berechnet den Rest einer Division zweier Zahlen.
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 18;
    }
}