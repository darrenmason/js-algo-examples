// bloom filter for fast "maybe contains" checks (cache hints)
// false positives possible, no false negatives

class BloomFilter {
  constructor(size = 1024, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  _hashes(value) {
    const hashes = [];
    let hash1 = 5381;
    let hash2 = 52711;
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      hash1 = (hash1 * 33) ^ code;
      hash2 = (hash2 * 41) ^ code;
    }
    for (let i = 0; i < this.hashCount; i++) {
      const combined = (hash1 + i * hash2 + i * i) >>> 0;
      hashes.push(combined % this.size);
    }
    return hashes;
  }

  _setBit(index) {
    const byte = Math.floor(index / 8);
    const bit = index % 8;
    this.bits[byte] |= 1 << bit;
  }

  _getBit(index) {
    const byte = Math.floor(index / 8);
    const bit = index % 8;
    return (this.bits[byte] & (1 << bit)) !== 0;
  }

  add(value) {
    for (const index of this._hashes(String(value))) {
      this._setBit(index);
    }
  }

  has(value) {
    for (const index of this._hashes(String(value))) {
      if (!this._getBit(index)) {
        return false;
      }
    }
    return true;
  }
}

// example: cache key hints
const bloom = new BloomFilter(256, 3);
bloom.add("user:1");
bloom.add("user:2");
console.log(bloom.has("user:1")); // true
console.log(bloom.has("user:3")); // maybe false (likely false)

