class Cloud2 extends MovableObject {
    y = 15;
    width = 550;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/full.png')
        this.x = 3600 + Math.random();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 30)
    }

}