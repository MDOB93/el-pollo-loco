class SmallChicken extends MovableObject {
    imagesWalking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 1350 + Math.random() * 1000;
        this.y = 370;
        this.height = 75;
        this.width = 50;
        this.loadImages(this.imagesWalking);

        this.speed = 0.8 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        setInterval(() =>{
            this.playAnimation(this.imagesWalking);
        }, 100);
    }
}