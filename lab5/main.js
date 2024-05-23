import {directedMatrix} from "./matrix.js";
import {drawDirGraph} from "./draw.js";
import {VARIANT, k1, k2, k3, k4} from "./config.js";
import {dfs, bfs} from "./path.js";

const dirMatrix = directedMatrix(VARIANT, k4);
drawDirGraph(250, 250, dirMatrix)
console.group("Directed matrix:");
console.log(dirMatrix);
console.groupEnd();

const buttonBfs = document.getElementById("bfs");
const buttonDfs = document.getElementById("dfs");
dfs(750, 250, dirMatrix, buttonDfs);
bfs(1250, 250, dirMatrix, buttonBfs);