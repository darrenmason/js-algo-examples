// topological sort using Kahn's algorithm (dependency ordering)
// O(V + E) time, O(V + E) space

function topologicalSort(graph) {
  const inDegree = new Map();
  const nodes = new Set();

  for (const [node, neighbors] of Object.entries(graph)) {
    nodes.add(node);
    for (const neighbor of neighbors) {
      nodes.add(neighbor);
    }
  }

  for (const node of nodes) {
    inDegree.set(node, 0);
  }

  for (const [node, neighbors] of Object.entries(graph)) {
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor) + 1);
    }
    if (!inDegree.has(node)) {
      inDegree.set(node, 0);
    }
  }

  const queue = [];
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      const updated = inDegree.get(neighbor) - 1;
      inDegree.set(neighbor, updated);
      if (updated === 0) {
        queue.push(neighbor);
      }
    }
  }

  const hasCycle = order.length !== inDegree.size;
  return { order, hasCycle };
}

// example: module dependency ordering for a frontend build
const dependencies = {
  app: ["ui", "data"],
  ui: ["core"],
  data: ["core", "utils"],
  core: [],
  utils: [],
};

const result = topologicalSort(dependencies);
console.log(result.order); // valid build order
console.log(result.hasCycle); // false

// cycle example
const cyclic = {
  A: ["B"],
  B: ["C"],
  C: ["A"],
};
console.log(topologicalSort(cyclic)); // hasCycle: true

