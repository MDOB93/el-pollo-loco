class MovableObject {
    x = 50;
    y = 300;
    img;
    heigth = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft() {
        
    }
}