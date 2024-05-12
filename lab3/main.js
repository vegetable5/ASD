import {generateDirMatrix, generateUndirMatrix} from "./generate.js";
import {drawDirGraph, drawUndirGraph} from "./draw.js";

export const RADIUS = 20;
export const MARGIN = 250;
export const VARIANT = 3120;

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

const dirMatrix = generateDirMatrix(VARIANT);
const undirMatrix = generateUndirMatrix(generateDirMatrix(VARIANT));
console.log("Directed matrix:");
console.log(dirMatrix);
console.log("Undirected matrix:");
console.log(undirMatrix);

drawDirGraph(350, 300, dirMatrix);
drawUndirGraph(950, 300, undirMatrix);