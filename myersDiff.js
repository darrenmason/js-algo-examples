// Myers diff for shortest edit script between two sequences
// O((N + M) * D) time, O(N + M) space (for the trace)

function myersDiff(a, b) {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  const trace = [];
  let v = new Map();
  v.set(1, 0);

  for (let d = 0; d <= max; d++) {
    const next = new Map();
    for (let k = -d; k <= d; k += 2) {
      let x;
      if (k === -d || (k !== d && (v.get(k - 1) ?? 0) < (v.get(k + 1) ?? 0))) {
        x = v.get(k + 1) ?? 0; // down
      } else {
        x = (v.get(k - 1) ?? 0) + 1; // right
      }
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }
      next.set(k, x);
      if (x >= n && y >= m) {
        trace.push(next);
        return buildEdits(trace, a, b);
      }
    }
    trace.push(next);
    v = next;
  }
  return [];
}

function buildEdits(trace, a, b) {
  let x = a.length;
  let y = b.length;
  const edits = [];

  for (let d = trace.length - 1; d >= 0; d--) {
    const v = trace[d];
    const k = x - y;

    let prevK;
    if (k === -d || (k !== d && (v.get(k - 1) ?? 0) < (v.get(k + 1) ?? 0))) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevX = v.get(prevK) ?? 0;
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      edits.push({ type: "keep", value: a[x - 1] });
      x--;
      y--;
    }

    if (d === 0) {
      break;
    }

    if (x === prevX) {
      edits.push({ type: "add", value: b[y - 1] });
      y--;
    } else {
      edits.push({ type: "remove", value: a[x - 1] });
      x--;
    }
  }

  return edits.reverse();
}

// example: text diff for editors
const left = "ABCABBA";
const right = "CBABAC";
console.log(myersDiff(left, right));

