class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEnd = 720 * 5;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}