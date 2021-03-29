function Circle(x, y, radius, options = {}, color = 127) {
    var newOptions = {
        ...options,
    };

    this.body = Bodies.circle(x, y, radius, newOptions);
    this.color = color;
    this.radius = radius;

    World.add(world, this.body);

    this.isOffScreen = function() {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }

    this.makeStatic = function() {
        this.body.isStatic = true;
    }

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(this.color);
        circle(0, 0, this.radius * 2);
        pop();
    }
}