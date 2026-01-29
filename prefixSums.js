// prefix sums for fast range queries (charts/heatmaps)

function prefixSums1D(values) {
  const prefix = new Array(values.length + 1).fill(0);
  for (let i = 0; i < values.length; i++) {
    prefix[i + 1] = prefix[i] + values[i];
  }
  return prefix;
}

function rangeSum1D(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}

function prefixSums2D(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const prefix = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      prefix[r][c] =
        matrix[r - 1][c - 1] +
        prefix[r - 1][c] +
        prefix[r][c - 1] -
        prefix[r - 1][c - 1];
    }
  }
  return prefix;
}

function rangeSum2D(prefix, r1, c1, r2, c2) {
  return (
    prefix[r2 + 1][c2 + 1] -
    prefix[r1][c2 + 1] -
    prefix[r2 + 1][c1] +
    prefix[r1][c1]
  );
}

// example 1D
const values = [2, 4, 6, 1, 3];
const p1 = prefixSums1D(values);
console.log(rangeSum1D(p1, 1, 3)); // 4 + 6 + 1 = 11

// example 2D (heatmap)
const heatmap = [
  [1, 2, 3],
  [0, 1, 2],
  [4, 1, 0],
];
const p2 = prefixSums2D(heatmap);
console.log(rangeSum2D(p2, 0, 1, 2, 2)); // sub-rectangle sum

