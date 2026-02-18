class Cloud extends MovableObject {
    y = 15;
    width = 400;
    heigth = 250;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;
    }

}