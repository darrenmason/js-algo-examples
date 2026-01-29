// interval scheduling for UI layout (maximize non-overlapping events)
// sort by end time: O(n log n) time, O(1) extra space

function scheduleIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a.end - b.end);
  const result = [];
  let lastEnd = -Infinity;

  for (const interval of sorted) {
    if (interval.start >= lastEnd) {
      result.push(interval);
      lastEnd = interval.end;
    }
  }

  return result;
}

// example: choose non-overlapping UI blocks on a timeline
const events = [
  { id: "a", start: 9, end: 11 },
  { id: "b", start: 10, end: 12 },
  { id: "c", start: 11, end: 13 },
  { id: "d", start: 13, end: 14 },
  { id: "e", start: 12, end: 15 },
];

console.log(scheduleIntervals(events)); // e.g. [a, c, d]

