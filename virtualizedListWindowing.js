// virtualized list windowing using prefix sums + binary search
// build O(n), query O(log n)

function buildPrefixHeights(itemHeights) {
  const prefix = new Array(itemHeights.length + 1).fill(0);
  for (let i = 0; i < itemHeights.length; i++) {
    prefix[i + 1] = prefix[i] + itemHeights[i];
  }
  return prefix;
}

function lowerBound(prefix, value) {
  let lo = 0;
  let hi = prefix.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (prefix[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

function getVisibleRange(itemHeights, scrollTop, viewportHeight, overscan = 2) {
  const prefix = buildPrefixHeights(itemHeights);
  const start = Math.max(0, lowerBound(prefix, scrollTop) - 1);
  const end = Math.min(
    itemHeights.length - 1,
    lowerBound(prefix, scrollTop + viewportHeight) + overscan
  );

  return { start, end, totalHeight: prefix[prefix.length - 1] };
}

// example: variable height list
const heights = [24, 30, 18, 40, 22, 30, 26, 50, 28, 24];
console.log(getVisibleRange(heights, 60, 80, 1));

