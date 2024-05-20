import {MARGIN, VARIANT} from './config.js';

function pseudoRandom(seed) {
  let value = seed;
  
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  }
}

const directedMatrix = (n = VARIANT, kn) => {
  const variant = Array.from(String(n), Number);
  const size = 10 + variant[2];
  const random = pseudoRandom(n);
  const k = kn(n);
  let dirMatrix = Array(size).fill().map(() => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dirMatrix[i][j] = Math.floor(random() * 2 * k);
    }
  }
  
  return dirMatrix;
}

const undirectedMatrix = (dirMatrix) => {
  let undirMatrix = structuredClone(dirMatrix);

  for (let i = 0; i < undirMatrix.length; i++) {
    for (let j = 0; j < undirMatrix.length; j++) {
      if (undirMatrix[i][j] === 1) undirMatrix[j][i] = 1;
    }
  }
  
  return undirMatrix;
}

const vertexMatrix = (centerX, centerY, n = VARIANT) => {
  let size = 0;
  if (n > 0) {
    const variant = Array.from(String(n), Number);
    size = 10 + variant[2];
  }
  else {
    size = Math.abs(n);
  }
  let vertexMatrix = [];

  for (let i = 0; i < size; i++) {
    const angle = (i / size) * 2 * Math.PI;
    const x = centerX + MARGIN * Math.cos(angle);
    const y = centerY + MARGIN * Math.sin(angle);
    vertexMatrix.push({x, y});
  }
    
  return vertexMatrix;
}



const addMatrix = (matrix1, matrix2) => {
  let result = structuredClone(matrix1);
  
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1.length; j++) {
      result[i][j] += matrix2[i][j];
    }
  }

  return result;
}

const multiplyMatrix = (matrix1, matrix2) => {
  let result = Array(matrix1.length).fill().map(() => Array(matrix1.length).fill(0));

  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1.length; j++) {
      let x = 0;
      for (let k = 0; k < matrix1.length; k++) {
        x += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = x;
    }
  }

  return result;
}

const powMatrix = (matrix, power) => {
  let result = structuredClone(matrix);

  for (let i = 1; i < power; i++) {
    result = multiplyMatrix(result, matrix);
  }

  return result;
}

const transposeMatrix = (matrix) => {
  let result = structuredClone(matrix);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}

const booleanMatrix = (matrix) => {
  let result = structuredClone(matrix);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j]) result[i][j] = 1;
    }
  }

  return result;
}

const reachabilityMatrix = (matrix) => {
  let result = structuredClone(matrix);

  for (let i = 2; i <= matrix.length; i++) {
    const pMatrix = powMatrix(matrix, i);
    result = addMatrix(result, pMatrix);
  }

  for (let i = 0; i < result.length; i++) {
    result[i][i]++;
  }

  return booleanMatrix(result);
}

const findPathTwo = (matrix) => {
  let path = [];
  let square = powMatrix(matrix, 2);

  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square.length; j++) {
      if (square[i][j]) {
        for (let k = 0; k < matrix.length; k++) {
          if (matrix[i][k] && matrix[k][j] && k !== i && k !== j) {
            path.push([i, k, j]);
          }
        }
      }
    }
  }

  return path;
}

const findPathThree = (matrix) => {
  let path = [];
  let cube = powMatrix(matrix, 3);

  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube.length; j++) {
      if (cube[i][j]) {
        for (let k = 0; k < matrix.length; k++) {
          if (matrix[i][k]) {
            for (let l = 0; l < matrix.length; l++) {
              if (matrix[k][l] && matrix[l][j] && k !== i && k !== l && k !== j && l !== i && l !== j) {
                path.push([i, k, l, j]);
              }
            }
          }
        }
      }
    }
  }

  return path;
}

export {directedMatrix, undirectedMatrix, vertexMatrix, reachabilityMatrix, findPathTwo, findPathThree, transposeMatrix};
