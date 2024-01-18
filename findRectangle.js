// 2d array search
// O(n * m)

function findRectangle(image) {
  const rows = image.length;
  const cols = image[0].length;

  let row = -1;
  let col = -1;
  let width = 0;
  let height = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++){
      if (image[i][j] === 0){
        row = i;
        col = j;
        break;
      }
    }
    if (row !== -1){
      break;
    }
  }

  if (row === -1 || col === -1){
    return null;
  }

  while (col + width < cols && image[row][col + width] === 0){
    width++;
  }

  while (row + height < rows && image[row + height][col] === 0){
    height++;
  }

  return { row, col, width, height }
}

const image1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];
console.log(findRectangle(image1)); 
// expected output: { row: 2, column: 3, width: 3, height: 2 }

const image2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 0],
];
console.log(findRectangle(image2)); 
// expected output: { row: 3, column: 5, width: 2, height: 2 }

const image3 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];
console.log(findRectangle(image3)); 
// expected output: null