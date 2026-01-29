// LRU cache using a hash map + doubly linked list
// get/put are O(1) time, O(capacity) space

class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("capacity must be > 0");
    }
    this.capacity = capacity;
    this.map = new Map();
    this.head = null; // most recently used
    this.tail = null; // least recently used
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) {
      return null;
    }
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this._moveToHead(existing);
      return;
    }

    const node = new ListNode(key, value);
    this.map.set(key, node);
    this._addToHead(node);

    if (this.map.size > this.capacity) {
      this._evictTail();
    }
  }

  _addToHead(node) {
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  _removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    node.prev = null;
    node.next = null;
  }

  _moveToHead(node) {
    if (node === this.head) {
      return;
    }
    this._removeNode(node);
    this._addToHead(node);
  }

  _evictTail() {
    if (!this.tail) {
      return;
    }
    const key = this.tail.key;
    this._removeNode(this.tail);
    this.map.delete(key);
  }
}

// example usage: caching API responses in a client-side data layer
const cache = new LRUCache(3);
cache.put("user:1", { id: 1, name: "Ana" });
cache.put("user:2", { id: 2, name: "Bo" });
cache.put("user:3", { id: 3, name: "Cy" });
console.log(cache.get("user:1")); // { id: 1, name: "Ana" }
cache.put("user:4", { id: 4, name: "Di" }); // evicts user:2
console.log(cache.get("user:2")); // null

