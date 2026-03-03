class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {

                let charBottom = this.character.y + this.character.height - this.character.offset.bottom;
                let enemyTop = enemy.y + enemy.offset.top;

                if (this.character.speedY < 0 && charBottom >= enemyTop && charBottom <= enemyTop + 40) {
                    enemy.energy = 0;

                    this.character.y = enemyTop - this.character.height + this.character.offset.bottom;
                    this.character.speedY = 8;
                } else if (!this.character.isAboveGround()) {
                    this.character.hit(10);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
            this.throwableObjects.forEach((bottle) => {
                if(bottle.isColliding(enemy) && !enemy.isDead() && bottle.isFlying()) {
                    enemy.hit(20);
                }
            });
        });
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 200)
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate( -this.cameraX, 0);

        this.addToMap(this.statusBar);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        mo.draw(this.ctx);
        mo.drawImageBorder(this.ctx);
        mo.drawHitbox(this.ctx);
        
        if(mo.otherDirection){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}