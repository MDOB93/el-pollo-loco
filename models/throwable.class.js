class ThrowableObject extends MovableObject {
    imagesBottle = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    imagesBottleSplash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    audioBottleSplash = new Audio('./audio/throwable/bottleBreak.mp3');
    
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.imagesBottle);
        this.loadImages(this.imagesBottleSplash);
        this.throwIntervalX = null;
        this.throwIntervalAnimation = null;
        this.gravityInterval = null;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();

        this.throwIntervalX = setInterval(() => {
            this.x += 10;
        }, 25);

        this.throwIntervalAnimation = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesBottle);
            } 
            if (this.y > 480) {
                this.y = 390;
                this.speedY = 0;
                this.playAnimation(this.imagesBottleSplash);
                this.audioBottleSplash.play();
                this.stopIntervals();
            }
        }, 100);
    }

    stopIntervals() {
        clearInterval(this.throwIntervalX);
        clearInterval(this.throwIntervalAnimation);
        clearInterval(this.gravityInterval);
        this.throwIntervalX = null;
        this.throwIntervalAnimation = null;
        this.gravityInterval = null;
    }
}