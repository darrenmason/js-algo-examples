// sparse table for static range minimum queries (RMQ)
// build O(n log n), query O(1)

class SparseTable {
  constructor(values) {
    this.n = values.length;
    this.log = new Array(this.n + 1).fill(0);
    for (let i = 2; i <= this.n; i++) {
      this.log[i] = this.log[i >> 1] + 1;
    }

    const k = this.log[this.n];
    this.table = Array.from({ length: k + 1 }, () => new Array(this.n).fill(0));
    this.table[0] = values.slice();

    for (let j = 1; j <= k; j++) {
      const len = 1 << j;
      for (let i = 0; i + len <= this.n; i++) {
        this.table[j][i] = Math.min(
          this.table[j - 1][i],
          this.table[j - 1][i + (len >> 1)]
        );
      }
    }
  }

  rangeMin(left, right) {
    if (left > right) {
      return Infinity;
    }
    const len = right - left + 1;
    const k = this.log[len];
    return Math.min(this.table[k][left], this.table[k][right - (1 << k) + 1]);
  }
}

// example: quick min latency checks across a static timeline
const latencies = [40, 22, 35, 18, 50, 27, 30];
const st = new SparseTable(latencies);
console.log(st.rangeMin(1, 4)); // 18

