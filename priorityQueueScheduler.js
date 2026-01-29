// priority queue + scheduler for task execution by deadline/priority
// enqueue/dequeue are O(log n), schedule is O(n log n)

class PriorityQueue {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0] || null;
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

// schedule tasks by earliest deadline, then highest priority
function scheduleTasks(tasks) {
  const pq = new PriorityQueue((a, b) => {
    if (a.deadline !== b.deadline) {
      return a.deadline - b.deadline;
    }
    return b.priority - a.priority;
  });

  for (const task of tasks) {
    pq.push(task);
  }

  const order = [];
  while (pq.size() > 0) {
    order.push(pq.pop());
  }

  return order;
}

// example: front-end job queue (network + UI work)
const tasks = [
  { id: "render", deadline: 2, priority: 2 },
  { id: "preload", deadline: 5, priority: 1 },
  { id: "analytics", deadline: 5, priority: 0 },
  { id: "hydrate", deadline: 2, priority: 3 },
];

console.log(scheduleTasks(tasks));

