// linked list
// print() (traversal) is O(n) time complexity where n scales with list size
// remaining methods are O(1) constant time

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  isEmpty() {
    return this.head === null;
  }

  addToHead(data) {
    const newNode = new Node(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  addToTail(data) {
    const newNode = new Node(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  removeFromHead() {
    if (this.isEmpty()) {
      return null;
    }

    const removedData = this.head.data;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    return removedData;
  }

  print() {
    let currentNode = this.head;
    const elements = [];

    while (currentNode !== null) {
      elements.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log(elements.join(" -> "));
  }
}

// test output:
const linkedList = new LinkedList();
linkedList.addToTail(15);
linkedList.addToTail(22);
linkedList.addToTail(31);
linkedList.print(); // Output: 15 -> 22 -> 31

linkedList.removeFromHead();
linkedList.print(); // Output: 22 -> 31
