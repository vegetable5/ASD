import {directedMatrix, undirectedMatrix, reachabilityMatrix, findPathTwo, findPathThree} from "./matrix.js";
import {calculateDirDegrees, calculateHalfDegrees, calculateUndirDegrees, printDegrees, checkRegular, checkVertex} from "./degree.js"; 
import {strongMatrix, findComponents, findConnections} from "./connectivity.js";
import {drawDirGraph, drawUndirGraph, drawCondGraph} from "./draw.js";
import {VARIANT, k1, k2, k3} from "./config.js";

console.group("Task №1");

const dirMatrix = directedMatrix(VARIANT, k2);
drawDirGraph(350, 300, dirMatrix);
console.group("Directed matrix:");
console.log(dirMatrix);
console.groupEnd();

const undirMatrix = undirectedMatrix(dirMatrix);
drawUndirGraph(950, 300, undirMatrix);
console.group("Unirected matrix:");
console.log(undirMatrix);
console.groupEnd();

const dirDegrees = calculateDirDegrees(dirMatrix);
console.group("Directed matrix degrees:");
printDegrees(dirDegrees);
console.groupEnd();

const undirDegrees = calculateUndirDegrees(undirMatrix);
console.group("Undirected matrix degrees:");
printDegrees(undirDegrees);
console.groupEnd();

const halfDegrees = calculateHalfDegrees(dirMatrix);
console.group("Directed matrix halfdegrees:");
printDegrees(halfDegrees);
console.groupEnd();

console.group("Regularity:");
if (checkRegular(dirDegrees))
    console.log("Graph is regular with a common degree " + dirDegrees[0]);
else 
    console.log("Graph is not regular");
console.groupEnd();

const [isolated, pendant] = checkVertex(dirDegrees);
console.group("Isolated vertexes:");
if (isolated.length > 0) 
    console.log(isolated);
else
    console.log("There are no isolated vertexes");
console.groupEnd();

console.group("Pendant vertexes:");
if (pendant.length > 0) 
    console.log(pendant);
else
    console.log("There are no pendant vertexes");
console.groupEnd();

console.groupEnd();


console.group("Task №2");

const secondMatrix = directedMatrix(VARIANT, k3);
drawDirGraph(350, 900, secondMatrix);
console.group("Directed matrix:");
console.log(secondMatrix);
console.groupEnd();

const secondDegrees = calculateHalfDegrees(secondMatrix);
console.group("Directed matrix halfdegrees:");
printDegrees(secondDegrees);
console.groupEnd();

const pathsTwo = findPathTwo(secondMatrix);
console.group("Paths of length 2:");
console.log(pathsTwo);
console.groupEnd();

const pathsThree = findPathThree(secondMatrix);
console.group("Paths of length 3:");
console.log(pathsThree);
console.groupEnd();

const reachMatrix = reachabilityMatrix(secondMatrix);
console.group("Reachability matrix:");
console.log(reachMatrix);
console.groupEnd();

const strong = strongMatrix(reachMatrix);
console.group("Strongly connected matrix:");
console.log(strong);
console.groupEnd();

const components = findComponents(strong);
console.group("Strongly connected components:");
console.log(components);
console.groupEnd();

const connections = findConnections(components, secondMatrix);
drawCondGraph(950, 900, connections);

console.groupEnd();