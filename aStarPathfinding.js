// A* pathfinding for grid-based canvas/UX
// O(E log V) time with binary heap, O(V) space

class MinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  push(item) {
    this.data.push(item);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) {
      return null;
    }
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent].f <= this.data[index].f) {
        break;
      }
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    const n = this.data.length;
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < n && this.data[left].f < this.data[smallest].f) {
        smallest = left;
      }
      if (right < n && this.data[right].f < this.data[smallest].f) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      [this.data[smallest], this.data[index]] = [this.data[index], this.data[smallest]];
      index = smallest;
    }
  }
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function reconstructPath(cameFrom, currentKey) {
  const path = [];
  while (currentKey) {
    const [x, y] = currentKey.split(",").map(Number);
    path.push({ x, y });
    currentKey = cameFrom.get(currentKey);
  }
  return path.reverse();
}

function aStar(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const inBounds = (x, y) => x >= 0 && x < cols && y >= 0 && y < rows;
  const neighbors = (x, y) => [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];

  const open = new MinHeap();
  const startKey = `${start.x},${start.y}`;
  const goalKey = `${goal.x},${goal.y}`;

  const gScore = new Map();
  const cameFrom = new Map();
  gScore.set(startKey, 0);

  open.push({
    key: startKey,
    x: start.x,
    y: start.y,
    g: 0,
    f: manhattan(start, goal),
  });

  const visited = new Set();

  while (open.size() > 0) {
    const current = open.pop();
    if (!current) {
      break;
    }
    if (current.key === goalKey) {
      return reconstructPath(cameFrom, current.key);
    }
    if (visited.has(current.key)) {
      continue;
    }
    visited.add(current.key);

    for (const next of neighbors(current.x, current.y)) {
      if (!inBounds(next.x, next.y)) {
        continue;
      }
      if (grid[next.y][next.x] === 1) {
        continue; // wall
      }
      const nextKey = `${next.x},${next.y}`;
      const tentative = current.g + 1;
      const existing = gScore.get(nextKey);
      if (existing === undefined || tentative < existing) {
        cameFrom.set(nextKey, current.key);
        gScore.set(nextKey, tentative);
        open.push({
          key: nextKey,
          x: next.x,
          y: next.y,
          g: tentative,
          f: tentative + manhattan(next, goal),
        });
      }
    }
  }

  return null;
}

// example: 0 = empty, 1 = wall
const grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const path = aStar(grid, { x: 0, y: 0 }, { x: 4, y: 4 });
console.log(path);

