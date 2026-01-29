// weighted interval scheduling (maximize value of non-overlapping intervals)
// O(n log n) time, O(n) space

function weightedIntervalScheduling(intervals) {
  const sorted = [...intervals].sort((a, b) => a.end - b.end);
  const ends = sorted.map((i) => i.end);

  function findLastNonOverlapping(index) {
    let lo = 0;
    let hi = index - 1;
    let ans = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (ends[mid] <= sorted[index].start) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return ans;
  }

  const dp = new Array(sorted.length).fill(0);
  const prev = new Array(sorted.length).fill(-1);

  for (let i = 0; i < sorted.length; i++) {
    const include = sorted[i].weight + (findLastNonOverlapping(i) >= 0 ? dp[findLastNonOverlapping(i)] : 0);
    const exclude = i > 0 ? dp[i - 1] : 0;

    if (include >= exclude) {
      dp[i] = include;
      prev[i] = findLastNonOverlapping(i);
    } else {
      dp[i] = exclude;
      prev[i] = -2; // mark as excluded
    }
  }

  const chosen = [];
  let i = sorted.length - 1;
  while (i >= 0) {
    if (prev[i] === -2) {
      i -= 1;
    } else {
      chosen.push(sorted[i]);
      i = prev[i];
    }
  }

  return chosen.reverse();
}

// example: pick highest value UI cards without overlap
const intervals = [
  { id: "a", start: 0, end: 3, weight: 3 },
  { id: "b", start: 2, end: 5, weight: 4 },
  { id: "c", start: 4, end: 7, weight: 6 },
  { id: "d", start: 6, end: 9, weight: 5 },
  { id: "e", start: 8, end: 10, weight: 2 },
];

console.log(weightedIntervalScheduling(intervals));

