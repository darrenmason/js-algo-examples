// trie for prefix search and autocomplete
// insert/search are O(L), autocomplete is O(L + K) where K is output size

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }

  _findNode(prefix) {
    let node = this.root;
    for (const char of prefix) {
      const next = node.children.get(char);
      if (!next) {
        return null;
      }
      node = next;
    }
    return node;
  }

  autocomplete(prefix, limit = 10) {
    const start = this._findNode(prefix);
    if (!start) {
      return [];
    }

    const results = [];
    const stack = [[start, prefix]];

    while (stack.length > 0 && results.length < limit) {
      const [node, word] = stack.pop();
      if (node.isWord) {
        results.push(word);
      }

      for (const [char, child] of node.children) {
        stack.push([child, word + char]);
      }
    }

    return results;
  }
}

// example: client-side search suggestions
const trie = new Trie();
const words = [
  "app",
  "apple",
  "application",
  "apply",
  "apricot",
  "api",
  "banana",
];

for (const word of words) {
  trie.insert(word);
}

console.log(trie.autocomplete("ap", 5)); // e.g. [ 'api', 'apricot', ... ]

