// LCS-based diff for text editor or UI reconciliation
// O(n * m) time, O(n * m) space

function lcsTable(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function diff(a, b) {
  const dp = lcsTable(a, b);
  const result = [];

  let i = a.length;
  let j = b.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.push({ type: "keep", value: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "add", value: b[j - 1] });
      j--;
    } else {
      result.push({ type: "remove", value: a[i - 1] });
      i--;
    }
  }

  return result.reverse();
}

// example: diff two strings
const a = "kitten";
const b = "sitting";
console.log(diff(a, b));

