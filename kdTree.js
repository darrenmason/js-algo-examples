// KD-tree for 2D spatial searches (e.g. nearest UI element)
// average O(log n) search, O(n) build

class KDNode {
  constructor(point, axis) {
    this.point = point;
    this.axis = axis;
    this.left = null;
    this.right = null;
  }
}

function buildKDTree(points, depth = 0) {
  if (points.length === 0) {
    return null;
  }
  const axis = depth % 2;
  const sorted = [...points].sort((a, b) =>
    axis === 0 ? a.x - b.x : a.y - b.y
  );
  const mid = Math.floor(sorted.length / 2);
  const node = new KDNode(sorted[mid], axis);
  node.left = buildKDTree(sorted.slice(0, mid), depth + 1);
  node.right = buildKDTree(sorted.slice(mid + 1), depth + 1);
  return node;
}

function distanceSquared(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function nearestNeighbor(root, target, best = { point: null, dist: Infinity }) {
  if (!root) {
    return best;
  }
  const d = distanceSquared(root.point, target);
  if (d < best.dist) {
    best = { point: root.point, dist: d };
  }

  const axis = root.axis;
  const diff = axis === 0 ? target.x - root.point.x : target.y - root.point.y;
  const first = diff < 0 ? root.left : root.right;
  const second = diff < 0 ? root.right : root.left;

  best = nearestNeighbor(first, target, best);
  if (diff * diff < best.dist) {
    best = nearestNeighbor(second, target, best);
  }
  return best;
}

// example: nearest point lookup
const points = [
  { id: "a", x: 10, y: 10 },
  { id: "b", x: 20, y: 30 },
  { id: "c", x: 35, y: 25 },
  { id: "d", x: 40, y: 10 },
];
const tree = buildKDTree(points);
console.log(nearestNeighbor(tree, { x: 28, y: 26 }));

