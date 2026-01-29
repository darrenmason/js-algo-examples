// Aho-Corasick for multi-pattern search (autocomplete, content scanning)
// build O(sum of pattern lengths), search O(text length + matches)

class ACNode {
  constructor() {
    this.children = new Map();
    this.fail = null;
    this.output = [];
  }
}

class AhoCorasick {
  constructor(patterns) {
    this.root = new ACNode();
    for (const pattern of patterns) {
      this._insert(pattern);
    }
    this._buildFailures();
  }

  _insert(pattern) {
    let node = this.root;
    for (const ch of pattern) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new ACNode());
      }
      node = node.children.get(ch);
    }
    node.output.push(pattern);
  }

  _buildFailures() {
    const queue = [];
    for (const child of this.root.children.values()) {
      child.fail = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const current = queue.shift();
      for (const [ch, child] of current.children) {
        let fail = current.fail;
        while (fail && !fail.children.has(ch)) {
          fail = fail.fail;
        }
        child.fail = fail ? fail.children.get(ch) : this.root;
        child.output = child.output.concat(child.fail.output);
        queue.push(child);
      }
    }
  }

  search(text) {
    const matches = [];
    let node = this.root;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      while (node && !node.children.has(ch)) {
        node = node.fail;
      }
      node = node ? node.children.get(ch) : this.root;
      if (node.output.length > 0) {
        for (const pattern of node.output) {
          matches.push({ pattern, index: i - pattern.length + 1 });
        }
      }
    }

    return matches;
  }
}

// example: scan input for multiple keywords
const ac = new AhoCorasick(["he", "she", "his", "hers"]);
console.log(ac.search("ushers"));

