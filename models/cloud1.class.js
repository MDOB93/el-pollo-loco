class Cloud1 extends MovableObject {
    y = 15;
    width = 550;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/full.png')
        this.x = 1440 + Math.random() * 1400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 30)
    }

}