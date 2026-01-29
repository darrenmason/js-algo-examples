// quadtree for spatial indexing (hit-testing canvas elements)

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.w &&
      point.y >= this.y &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x > this.x + this.w ||
      range.x + range.w < this.x ||
      range.y > this.y + this.h ||
      range.y + range.h < this.y
    );
  }
}

class Quadtree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this._subdivide();
    }
    return (
      this.northeast.insert(point) ||
      this.northwest.insert(point) ||
      this.southeast.insert(point) ||
      this.southwest.insert(point)
    );
  }

  _subdivide() {
    const { x, y, w, h } = this.boundary;
    const hw = w / 2;
    const hh = h / 2;
    this.northeast = new Quadtree(new Rectangle(x + hw, y, hw, hh), this.capacity);
    this.northwest = new Quadtree(new Rectangle(x, y, hw, hh), this.capacity);
    this.southeast = new Quadtree(new Rectangle(x + hw, y + hh, hw, hh), this.capacity);
    this.southwest = new Quadtree(new Rectangle(x, y + hh, hw, hh), this.capacity);
    this.divided = true;
  }

  query(range, found = []) {
    if (!this.boundary.intersects(range)) {
      return found;
    }
    for (const point of this.points) {
      if (range.contains(point)) {
        found.push(point);
      }
    }
    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }
    return found;
  }
}

// example: hit-test points in a canvas
const boundary = new Rectangle(0, 0, 100, 100);
const qt = new Quadtree(boundary, 3);
[
  { id: "a", x: 10, y: 10 },
  { id: "b", x: 60, y: 20 },
  { id: "c", x: 80, y: 70 },
  { id: "d", x: 25, y: 65 },
  { id: "e", x: 50, y: 50 },
].forEach((p) => qt.insert(p));

const hits = qt.query(new Rectangle(40, 40, 30, 30));
console.log(hits);

