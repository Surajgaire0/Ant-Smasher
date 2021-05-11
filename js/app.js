import getRandom from './utils.mjs';
import Ant from './ant.mjs';

let canvas, ctx;
let antArr = []; //holds all ant instances
let sprite;

let start = () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    sprite = new Image();
    sprite.src = './assets/ant.png';

    let points = []; //initial coordinate
    for (let i = 10; i < canvas.width - 50; i = i + 100) {
        for (let j = 10; j < canvas.height - 50; j = j + 100) {
            points.push({ x: i, y: j });
        }
    }


    let ant_instance, width, velocityX, velocityY;
    for (let i = 0; i < points.length; i++) {
        velocityX = getRandom(-1, 1);
        velocityY = getRandom(-1, 1);
        if (!velocityX) {
            velocityX = 1;;
        }
        width = getRandom(20, 40);
        ant_instance = new Ant(width, points[i].x, points[i].y, velocityX, velocityY);
        antArr.push(ant_instance);
    }

    loop();
}

//draw function
let draw = () => {
    antArr.forEach(ant => {
        ant.draw(ctx, sprite);
    })
}

//update function
let update = () => {
    antArr.forEach(ant => {
        ant.update();
        ant.handleCollisionWithWall(canvas);
    })

    for (let i = 0; i < antArr.length; i++) {
        for (let j = i + 1; j < antArr.length; j++) {
            antArr[i].handleCollisionWithAnotherAnt(antArr[j]);
        }
    }
}

//loop
let loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(loop);
}

document.addEventListener('DOMContentLoaded', start);

document.addEventListener('click', (e) => {
    for (let i = 0; i < antArr.length; i++) {
        if ((antArr[i].x < e.offsetX) && (antArr[i].x + antArr[i].width > e.offsetX) && (antArr[i].y < e.offsetY) && (antArr[i].y + antArr[i].width > e.offsetY)) {
            antArr[i].smash();
            antArr[i] = undefined;
            break;
        }
    }

    //remove ant
    antArr = antArr.filter((ant) => ant != undefined);
})