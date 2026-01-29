// rolling hash (Rabin-Karp) substring search
// average O(n + m), worst O(n * m) with collisions

function rollingHashSearch(text, pattern) {
  if (pattern.length === 0) {
    return 0;
  }
  if (pattern.length > text.length) {
    return -1;
  }

  const base = 256;
  const mod = 1000000007;
  const m = pattern.length;
  let patternHash = 0;
  let windowHash = 0;
  let highest = 1;

  for (let i = 0; i < m - 1; i++) {
    highest = (highest * base) % mod;
  }

  for (let i = 0; i < m; i++) {
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    windowHash = (windowHash * base + text.charCodeAt(i)) % mod;
  }

  for (let i = 0; i <= text.length - m; i++) {
    if (patternHash === windowHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        return i;
      }
    }
    if (i < text.length - m) {
      const left = text.charCodeAt(i);
      const right = text.charCodeAt(i + m);
      windowHash =
        (windowHash - left * highest) % mod;
      if (windowHash < 0) {
        windowHash += mod;
      }
      windowHash = (windowHash * base + right) % mod;
    }
  }

  return -1;
}

// example: fast substring search in an editor
console.log(rollingHashSearch("the quick brown fox", "brown")); // 10

