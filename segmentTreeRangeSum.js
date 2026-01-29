// segment tree for range sum queries (useful for timelines/calendars)
// build O(n), query/update O(log n)

class SegmentTree {
  constructor(values) {
    this.n = values.length;
    this.tree = new Array(this.n * 4).fill(0);
    this._build(values, 1, 0, this.n - 1);
  }

  _build(values, node, start, end) {
    if (start === end) {
      this.tree[node] = values[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this._build(values, node * 2, start, mid);
    this._build(values, node * 2 + 1, mid + 1, end);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  update(index, value) {
    this._update(1, 0, this.n - 1, index, value);
  }

  _update(node, start, end, index, value) {
    if (start === end) {
      this.tree[node] = value;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (index <= mid) {
      this._update(node * 2, start, mid, index, value);
    } else {
      this._update(node * 2 + 1, mid + 1, end, index, value);
    }
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  query(left, right) {
    return this._query(1, 0, this.n - 1, left, right);
  }

  _query(node, start, end, left, right) {
    if (right < start || left > end) {
      return 0;
    }
    if (left <= start && end <= right) {
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    return (
      this._query(node * 2, start, mid, left, right) +
      this._query(node * 2 + 1, mid + 1, end, left, right)
    );
  }
}

// example: aggregate minutes in calendar blocks
const minutes = [30, 45, 15, 60, 25, 40];
const seg = new SegmentTree(minutes);
console.log(seg.query(1, 4)); // 45 + 15 + 60 + 25 = 145
seg.update(2, 20);
console.log(seg.query(1, 4)); // 150

