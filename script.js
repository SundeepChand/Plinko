const Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

let engine;
let world;
let totalBalls = 0;

const obstacles = [];
const balls = [];
const grounds = [];
const groundBodies = [];
let leftWall, rightWall;

const GROUND_WIDTH = 50;
const OBSTACLE_RADIUS = 10;
const BALL_RADIUS = 10;
const N_ROWS = 8;
const TOP_OFFSET = 50;

function setup() {
    createCanvas(400, 600);

    engine = Engine.create();   // Create the engine.
    world = engine.world;       // reference the world.

    for (let i = 0; i < 8; i++) {
        const ground = new Ground((i + 0.5) * GROUND_WIDTH, height, GROUND_WIDTH, 100, { friction: 0, isSensor: true });
        grounds.push(ground);     // Create the ground
        groundBodies.push(ground.body);
        World.add(world, ground);
    }

    // Generate all the obstacles
    for (let i = 0; i < N_ROWS; i++) {
        let p1;
        if (i % 2 == 0) {
            for (let j = 0; j < 6; j++) {
                p1 = new Circle((j + 1) * (width / 7), (TOP_OFFSET + i * 50), OBSTACLE_RADIUS, { isStatic: true });
                obstacles.push(p1);
                World.add(world, p1);
            }
        } else {
            for (let j = 0; j < 7; j++) {
                p1 = new Circle((j + 1) * (width / 8), (TOP_OFFSET + i * 50), OBSTACLE_RADIUS, { isStatic: true });
                obstacles.push(p1);
                World.add(world, p1);
            }
        }
    }

    leftWall = new Wall(-5, (height / 2), 10, height, { isStatic: true });
    rightWall = new Wall(width + 5, (height / 2), 10, height, { isStatic: true });

    Engine.run(engine);

    // Listen to collision between balls & ground.
    Events.on(engine, 'collisionStart', function(event) {
        const pairs = event.pairs;
        // console.log(pairs);
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            if (groundBodies.indexOf(pair.bodyA) !== -1) {
                grounds[groundBodies.indexOf(pair.bodyA)].counter++;
            } else if (groundBodies.indexOf(pair.bodyB) !== -1) {
                grounds[groundBodies.indexOf(pair.bodyB)].counter++;
            }
        }
    });
}

var accumulator = 0;
  
function draw() {
    background(51);
    
    leftWall.show();
    rightWall.show();
    for (let i = 0; i < grounds.length; i++) {
        grounds[i].show();
    }
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].show();
        if (balls[i].body.position.y > height) {
            balls[i].removeFromWorld();
            balls.splice(i, 1);
            i--;
        }
    }

    stroke(255);
    fill(255);
    textSize(25);
    text(totalBalls, 200, 40);

    accumulator += 0.1;
    if (accumulator > 3) {
        balls.push(new Circle(random(80, 320), -10, BALL_RADIUS, { restitution: 0.4 }, color(255, 204, 0)));
        totalBalls++;
        accumulator = 0;
    }
}

function mousePressed() {
    
}