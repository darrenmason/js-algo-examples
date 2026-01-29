// Fenwick tree (Binary Indexed Tree) for prefix sums
// update/query are O(log n), space O(n)

class FenwickTree {
  constructor(values) {
    this.n = values.length;
    this.tree = new Array(this.n + 1).fill(0);
    for (let i = 0; i < values.length; i++) {
      this.add(i, values[i]);
    }
  }

  add(index, delta) {
    let i = index + 1;
    while (i <= this.n) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  sum(index) {
    let i = index + 1;
    let result = 0;
    while (i > 0) {
      result += this.tree[i];
      i -= i & -i;
    }
    return result;
  }

  rangeSum(left, right) {
    if (left > right) {
      return 0;
    }
    return this.sum(right) - (left > 0 ? this.sum(left - 1) : 0);
  }
}

// example: streaming totals for a chart
const values = [5, 3, 7, 2, 6];
const ft = new FenwickTree(values);
console.log(ft.rangeSum(1, 3)); // 3 + 7 + 2 = 12
ft.add(2, 4); // values[2] += 4
console.log(ft.rangeSum(1, 3)); // 16

