class Character extends MovableObject {
    height = 450;
    width = 220;
    y = 0;
    imagesWalking = [
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
    imagesJump = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    world;
    speed = 10;

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJump);
        this.applyGravity();
        this.animate();
    }

    // Der Modulo-Operator in JavaScript, dargestellt durch das Prozentzeichen (%), berechnet den Rest einer Division zweier Zahlen.
    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd) {
                this.moveRight();
            }
            
            if(this.world.keyboard.LEFT && this.x > -520) {
                this.moveLeft();
            }

            if(this.world.keyboard.UP && !this.isAboveGround()){
                this.jump();
            }

            this.world.cameraX = -this.x;
        }, 1000 / 60)
        setInterval(() =>{
            if(this.isAboveGround()) {
                this.playAnimation(this.imagesJump);
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalking);
                }
            }
        }, 100);
        setInterval(() =>{
            if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE) {
                this.loadImages(this.imagesIdle)
                this.playAnimation(this.imagesIdle);
            }// else if (timer = 10sec) => longeIdle
        }, 550);
    }
}