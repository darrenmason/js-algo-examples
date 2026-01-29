// Dijkstra shortest path for weighted graphs (e.g. UI state machine routing)
// O(E log V) time with min-heap, O(V) space

class MinHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
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
      if (this.compare(this.data[parent], this.data[index]) <= 0) {
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

      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) {
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

function dijkstra(graph, start) {
  const distances = new Map();
  const previous = new Map();
  const heap = new MinHeap((a, b) => a.distance - b.distance);

  for (const node of Object.keys(graph)) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);
  heap.push({ node: start, distance: 0 });

  while (heap.size() > 0) {
    const current = heap.pop();
    if (!current) {
      break;
    }
    if (current.distance !== distances.get(current.node)) {
      continue;
    }

    for (const edge of graph[current.node]) {
      const nextDist = current.distance + edge.weight;
      if (nextDist < distances.get(edge.to)) {
        distances.set(edge.to, nextDist);
        previous.set(edge.to, current.node);
        heap.push({ node: edge.to, distance: nextDist });
      }
    }
  }

  return { distances, previous };
}

function buildPath(previous, target) {
  const path = [];
  let node = target;
  while (node) {
    path.push(node);
    node = previous.get(node);
  }
  return path.reverse();
}

// example: UI state transitions with weights
const graph = {
  idle: [{ to: "loading", weight: 2 }, { to: "error", weight: 5 }],
  loading: [{ to: "ready", weight: 2 }],
  ready: [{ to: "error", weight: 1 }],
  error: [{ to: "idle", weight: 3 }],
};

const { distances, previous } = dijkstra(graph, "idle");
console.log(distances.get("ready"));
console.log(buildPath(previous, "ready"));

