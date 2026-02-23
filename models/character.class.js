class Character extends MovableObject {
    heigth = 450;
    width = 220;
    y = 0;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesIdle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    world;
    speed = 10;

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    // Der Modulo-Operator in JavaScript, dargestellt durch das Prozentzeichen (%), berechnet den Rest einer Division zweier Zahlen.
    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            
            if(this.world.keyboard.LEFT && this.x > -520) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x;
        }, 1000 / 60)
        setInterval(() =>{
            
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 60);
        setInterval(() =>{
            if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE) {
                this.loadImages(this.imagesIdle)
                this.playAnimation(this.imagesIdle);
            }// else if (timer = 10sec) => longeIdle
        }, 550);
    }

    jump() {

    }
}