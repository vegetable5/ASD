import {directedMatrix, undirectedMatrix, weightedMatrix} from "./matrix.js";
import {drawWeightedGraph} from "./draw.js";
import {VARIANT, k1, k2, k3, k4, k5} from "./config.js";
import {spanningTree} from "./kruskal.js";

const dirMatrix = directedMatrix(VARIANT, k5);
const undirMatrix = undirectedMatrix(dirMatrix);
console.group("Undirected matrix:");
console.log(undirMatrix);
console.groupEnd();

const wMatrix = weightedMatrix(undirMatrix);
console.group("Weighted matrix:");
console.log(wMatrix);
console.groupEnd();
drawWeightedGraph(250, 250, wMatrix);

const button = document.getElementById("tree");
spanningTree(750, 250, wMatrix, button);