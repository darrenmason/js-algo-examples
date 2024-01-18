// breadth-first binary search
// O(log n)

/*
      10
   /      \
  4	   17
 / \      /  \
1   9    12  18

*/

let tree = {
	"10": {
		value: "10",
		left: "4",
		right: "17",
	},
	"4": {
		value: "4",
		left: "1",
		right: "9",
	},
	"17": {
		value: "17",
		left: "12",
		right: "18",
	},
	"1": {
		value: "1",
		left: null,
		right: null,
	},
	"9": {
		value: "9",
		left: null,
		right: null,
	},
	"12": {
		value: "12",
		left: null,
		right: null,
	},
	"18": {
		value: "18",
		left: null,
		right: null,
	},
};

let breadthFirstSearch = (tree, rootNode, searchValue) => {
  let queue = [];
  queue.push(rootNode);
  while (queue.length > 0){
    let currentNode = queue[0];
    console.log(`current node: ${currentNode.value}`);
    if(currentNode.value === searchValue){
      console.log('node found.');
      return;
    }
    if(currentNode.left !== null){
      queue.push(tree[currentNode.left]);
    }
    if(currentNode.right !== null){
      queue.push(tree[currentNode.right]);
    }
    queue.shift();
  }
  console.log('node not found.')
}


breadthFirstSearch(tree, tree[10], "12");
