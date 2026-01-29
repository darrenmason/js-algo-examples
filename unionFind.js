// union-find (disjoint set) for connectivity (e.g. grouping UI selections)
// union/find with path compression + union by rank: almost O(1)

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) {
      return false;
    }
    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA] += 1;
    }
    return true;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

// example: cluster selected items by proximity edges
const uf = new UnionFind(6);
uf.union(0, 1);
uf.union(2, 3);
uf.union(3, 4);
console.log(uf.connected(0, 1)); // true
console.log(uf.connected(1, 2)); // false

