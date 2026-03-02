class Chicken extends MovableObject {
    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imagesDead = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 1440 + Math.random() * 1000;
        this.loadImages(this.imagesWalking);
        

        this.speed = 0.5 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isDead()) {
                setInterval(() => {
                    this.loadImage(this.imagesDead);
                }, 100);
            } else {
                setInterval(() => {
                    this.moveLeft();
                    this.otherDirection = false;
                }, 1000 / 60);
                setInterval(() => {
                    this.playAnimation(this.imagesWalking);
                }, 100);
            }
        }, 100);
    }
}