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

export {directedMatrix, vertexMatrix};