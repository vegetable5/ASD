import {MARGIN, VARIANT} from './main.js';

function pseudoRandom(seed) {
  let value = seed;
  
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  }
}

const generateDirMatrix = (n = VARIANT) => {
  const variant = Array.from(String(n), Number);
  const size = 10 + variant[2];
  const random = pseudoRandom(n);
  const k = 1 - variant[2] * 0.02 - variant[3] * 0.005 - 0.25;
  let dirMatrix = Array(size).fill().map(() => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dirMatrix[i][j] = Math.floor(random() * 2 * k);
    }
  }
  
  return dirMatrix;
}

const generateUndirMatrix = (dirMatrix) => {
  let undirMatrix = dirMatrix;

  for (let i = 0; i < undirMatrix.length; i++) {
    for (let j = 0; j < undirMatrix.length; j++) {
      if (undirMatrix[i][j] === 1) undirMatrix[j][i] = 1;
    }
  }
  
  return undirMatrix;
}

const generateVertexMatrix = (centerX, centerY, n = VARIANT) => {
  const variant = Array.from(String(n), Number);
  const size = 10 + variant[2];
  const vertexMatrix = [];

  for (let i = 0; i < size; i++) {
    const angle = (i / size) * 2 * Math.PI;
    const x = centerX + MARGIN * Math.cos(angle);
    const y = centerY + MARGIN * Math.sin(angle);
    vertexMatrix.push({x, y});
  }
    
  return vertexMatrix;
}

export {generateDirMatrix, generateUndirMatrix, generateVertexMatrix};