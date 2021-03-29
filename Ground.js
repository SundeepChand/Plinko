function Ground(x, y, w, h, options = {}) {

    var newOptions = {
        ...options,
        isStatic: true,
    };

    this.body = Bodies.rectangle(x, y, w, h, newOptions);

    this.wallWidth = 5;
    this.wallHeight = h + 20;
    this.leftWall = Bodies.rectangle(x - (w / 2) + (this.wallWidth / 2), y, this.wallWidth, this.wallHeight, { isStatic: true });
    this.rightWall = Bodies.rectangle(x + (w / 2) - (this.wallWidth / 2), y, this.wallWidth, this.wallHeight, { isStatic: true });

    this.w = w;
    this.h = h;
    this.counter = 0;

    World.add(world, this.body);
    World.add(world, this.leftWall);
    World.add(world, this.rightWall);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        
        rectMode(CENTER);
        noStroke();
        fill(0);
        rect(0, 0, this.w, this.h);
        
        stroke(255);
        fill(255);
        textSize(25);
        text(this.counter, -15, -15);

        translate(-pos.x, -pos.y);

        stroke(color(138, 82, 4));
        fill(color(138, 82, 4));
        pos = this.leftWall.position;
        translate(pos.x, pos.y);
        rect(0, 0, this.wallWidth, this.wallHeight);
        
        translate(-pos.x, -pos.y);
        pos = this.rightWall.position;
        translate(pos.x, pos.y);
        rect(0, 0, 10, this.wallHeight);
        // rect(0, 0, 10, this.h);

        pop();
    }
}