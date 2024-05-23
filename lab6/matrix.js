import {MARGIN, VARIANT, k5} from './config.js';

function pseudoRandom(seed) {
  let value = seed;
  
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  }
}

const directedMatrix = (n = VARIANT, kn, isB = false) => {
  const variant = Array.from(String(n), Number);
  const size = 10 + variant[2];
  const random = pseudoRandom(n);
  const k = kn(n);
  let dirMatrix = Array(size).fill().map(() => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dirMatrix[i][j] = isB? 2 * random() : Math.floor(random() * 2 * k);
    }
  }
  
  return dirMatrix;
}

const weightedMatrix = (matrix) => {
  const a = structuredClone(matrix);
  const b = directedMatrix(VARIANT, k5, 1);

  const c = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      c[i][j] = Math.ceil(b[i][j] * 100 * a[i][j]);
    }
  }

  const d = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (c[i][j]) d[i][j] = 1;
    }
  }

  const h = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (d[i][j] !== d[j][i]) h[i][j] = 1;
    }
  }

  const tr = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i < j) tr[i][j] = 1;
    }
  }

  const w = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      w[i][j] = (d[i][j] + h[i][j] * tr[i][j])*c[i][j];
      w[j][i] = w[i][j];
    }
  }

  return w;
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

export {directedMatrix, undirectedMatrix, vertexMatrix, weightedMatrix};