// k-way merge of sorted arrays using a min-heap
// O(n log k) time, O(k) space

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

function kWayMerge(arrays) {
  const heap = new MinHeap((a, b) => a.value - b.value);
  const result = [];

  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      heap.push({ value: arrays[i][0], arrayIndex: i, elementIndex: 0 });
    }
  }

  while (heap.size() > 0) {
    const item = heap.pop();
    result.push(item.value);
    const nextIndex = item.elementIndex + 1;
    if (nextIndex < arrays[item.arrayIndex].length) {
      heap.push({
        value: arrays[item.arrayIndex][nextIndex],
        arrayIndex: item.arrayIndex,
        elementIndex: nextIndex,
      });
    }
  }

  return result;
}

// example: merge paginated feed segments
const segments = [
  [1, 4, 9],
  [2, 6, 7],
  [3, 5, 8, 10],
];
console.log(kWayMerge(segments));

