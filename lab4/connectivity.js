import {transposeMatrix} from "./matrix.js";

const strongMatrix = (matrix) => {
    let result = structuredClone(matrix);
    let transposed = transposeMatrix(matrix);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        result[i][j] *= transposed[i][j];
      }
    }
    
    return result;
}

const findComponents = (matrix) => {
  let unique = [];

  for (let i = 0; i < matrix.length; i++) {
    const value = matrix[i].toString();
    if (unique[value]) unique[value].push(i);
    else unique[value] = [i];
  }

  let result = [];
  let i = 0;
  for (const key in unique) {
    result[i] = unique[key];
    i++;
  }

  return result;
}

const findConnections = (сomponents, matrix) => {
  const connections = [];

  for (const key in сomponents) {
    connections[key] = [];
    const vertexes = сomponents[key];
      
    for (const vertex of vertexes) {
      for (let i = 0; i < matrix.length; i++) {
        if (!vertexes.includes(i) && matrix[vertex][i]) {
          const x = Object.keys(сomponents).find((x) => сomponents[x].includes(i));
          if (!connections[key].includes(x)) {
            connections[key].push(x);
          }
        }
      }
    }
  }

  return connections;
};

export {strongMatrix, findComponents, findConnections};