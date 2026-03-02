class Chicken extends MovableObject {
    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imagesDead = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    audioDead = new Audio('./audio/chicken/chickenDead.mp3');
    deadSoundPlayed = false;
    
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 1440 + Math.random() * 1000;
        this.loadImages(this.imagesWalking);
        

        this.speed = 1 + Math.random() * 0.50;

        this.animate();
    }

    animate() {
        setInterval(() => {

            if (this.isDead()) {

                this.loadImage(this.imagesDead);

                
                if (!this.deadSoundPlayed) {
                    this.audioDead.play();
                    this.deadSoundPlayed = true;
                }

            } else {
                this.moveLeft();
                this.otherDirection = false;
                this.playAnimation(this.imagesWalking);
            }

        }, 50);
    }
}