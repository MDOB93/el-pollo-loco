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
    imagesLongIdle = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
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
    imagesDead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    imagesHurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    speed = 10;
    audioWalk = new Audio('./audio/character/characterRun.mp3');
    audioJump = new Audio('./audio/character/characterJump.wav');
    audioHurt = new Audio('./audio/character/characterDamage.mp3');
    audioDead = new Audio('./audio/character/characterDead.wav');
    audioSnor = new Audio('./audio/character/characterSnoring.mp3');
    offset = {
        top: 175,
        right: 50,
        bottom: 20,
        left: 50
    };
    startTime = Date.now();

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');

        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);

        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd) {
                this.moveRight();
                this.resetIdleTimer();
            }

            if (this.world.keyboard.LEFT && this.x > -520) {
                this.moveLeft();
                this.resetIdleTimer();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.resetIdleTimer();
            }

            this.world.cameraX = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isIdle()) {
                this.resetIdleTimer();
            }

            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
                this.audioDead.play();

            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
                this.audioHurt.play();

            } else if (this.isAboveGround()) {
                this.playAnimation(this.imagesJump);

            } else if (this.isIdle() && Date.now() - this.startTime >= 15000) {
                this.playAnimation(this.imagesLongIdle);
                this.audioSnor.play();
            } else if (this.isIdle()) {
                this.playAnimation(this.imagesIdle);

                this.audioWalk.pause();
                this.audioWalk.currentTime = 0;

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalking);

                    if (this.audioWalk.paused) {
                        this.audioWalk.play();
                    }
                } else {
                    this.audioWalk.pause();
                    this.audioWalk.currentTime = 0;
                }
            }
        }, 100);
    }

    isIdle() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE;
    }

    resetIdleTimer() {
        this.startTime = Date.now();
    }
}