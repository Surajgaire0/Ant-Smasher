function Ant(width, x, y, velocityX, velocityY) {
    this.width = width;
    this.x = x;
    this.y = y;
    this.dx = velocityX;
    this.dy = velocityY;
    this.smashed = false;

    this.handleCollisionWithWall = (canvas) => {
        if ((this.x + this.width >= canvas.width) || (this.x <= 0)) {
            this.dx = -this.dx;
        }

        if ((this.y + this.width >= canvas.height) || (this.y <= 0)) {
            this.dy = -this.dy;
        }
    };

    this.handleCollisionWithAnotherAnt = (anotherAnt) => {
        if ((this.x < anotherAnt.x + anotherAnt.width && this.x + this.width > anotherAnt.x) &&
            (this.y < anotherAnt.y + anotherAnt.width && this.y + this.width > anotherAnt.y)) {
            anotherAnt.dx = -anotherAnt.dx;
            this.dx = -this.dx;
            anotherAnt.dy = -anotherAnt.dy;
            this.dy = -this.dy;
        }

    };

    this.update = () => {
        this.x = this.x - this.dx;
        this.y = this.y - this.dy;
    };

    this.draw = (ctx, sprite) => {
        if (!this.smashed) {
            ctx.drawImage(sprite, this.x, this.y, this.width, this.width);
        }

    };

    this.smash = () => {
        this.smashed = true;
    };
}

export default Ant;