// interval tree for overlap queries (e.g. calendar conflicts)
// insert/query O(log n) average, O(n) worst if unbalanced

class IntervalNode {
  constructor(interval) {
    this.interval = interval; // { start, end, id? }
    this.maxEnd = interval.end;
    this.left = null;
    this.right = null;
  }
}

class IntervalTree {
  constructor() {
    this.root = null;
  }

  insert(interval) {
    this.root = this._insert(this.root, interval);
  }

  _insert(node, interval) {
    if (!node) {
      return new IntervalNode(interval);
    }
    if (interval.start < node.interval.start) {
      node.left = this._insert(node.left, interval);
    } else {
      node.right = this._insert(node.right, interval);
    }
    node.maxEnd = Math.max(node.maxEnd, interval.end);
    return node;
  }

  searchOverlap(target) {
    return this._searchOverlap(this.root, target);
  }

  _overlaps(a, b) {
    return a.start <= b.end && b.start <= a.end;
  }

  _searchOverlap(node, target, results = []) {
    if (!node) {
      return results;
    }
    if (this._overlaps(node.interval, target)) {
      results.push(node.interval);
    }
    if (node.left && node.left.maxEnd >= target.start) {
      this._searchOverlap(node.left, target, results);
    }
    if (node.right && node.interval.start <= target.end) {
      this._searchOverlap(node.right, target, results);
    }
    return results;
  }
}

// example: calendar conflict check
const tree = new IntervalTree();
[
  { id: "a", start: 9, end: 11 },
  { id: "b", start: 13, end: 14 },
  { id: "c", start: 10, end: 12 },
  { id: "d", start: 15, end: 16 },
].forEach((i) => tree.insert(i));

console.log(tree.searchOverlap({ start: 10.5, end: 13.5 }));

