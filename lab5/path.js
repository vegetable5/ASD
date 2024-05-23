import {vertexMatrix} from "./matrix.js";
import {drawVertex, drawLine} from "./draw.js";

const executionOrder = () => {
    const queue = [];

    const add = (action) => {
        queue.push(action);
    };

    const execute = () => {
        if (queue.length > 0) {
            const action = queue.shift();
            action();
        }
    };

    return {add, execute};
}

const dfs = (x, y, matrix, button) => {
    const dfsMatrix = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
    const dfsArray = Array(matrix.length).fill(-1);
    const stack = [];
    let c = 0;

    const order = executionOrder();
    const vertexes = vertexMatrix(x, y);
    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }

    const search = (start) => {
        dfsArray[start] = c;
        stack.push(start);
        c++;

        while(stack.length > 0) {
            const current = stack[stack.length-1];
            order.add(() => {drawVertex(vertexes[current].x, vertexes[current].y, current, "blue")});

            for (let i = 0; i < matrix.length; i++) {
                if (matrix[current][i] && dfsArray[i] === -1) {
                    dfsArray[i] = c;
                    dfsMatrix[current][i] = 1;
                    stack.push(i);
                    c++;

                    order.add(() => {
                        drawLine(vertexes[current].x, vertexes[current].y, vertexes[i].x, vertexes[i].y, 1),
                        drawVertex(vertexes[current].x, vertexes[current].y, current, "red"),
                        drawVertex(vertexes[i].x, vertexes[i].y, i, "red");
                    });
                    
                    break;
                }
                else if (i === matrix.length - 1) {
                    stack.pop();
                    order.add(() => {drawVertex(vertexes[current].x, vertexes[current].y, current, "gray")});
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        if (dfsArray[i] === -1) search(i);
    }

    console.group("DFS matrix:");
    console.log(dfsMatrix);
    console.groupEnd();

    console.group("DFS vertex list:");
    dfsArray.map((value, index)=>{
        console.log(`${index} => ${value}`);
    });
    console.groupEnd();

    button.addEventListener("click", order.execute);
}

const bfs = (x, y, matrix, button) => {
    const bfsMartix = Array(matrix.length).fill().map(() => Array(matrix.length).fill(0));
    const bfsArray = Array(matrix.length).fill(-1);
    const queue = [];
    let c = 0;

    const order = executionOrder();
    const vertexes = vertexMatrix(x, y);
    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }

    const search = (start) => {
        bfsArray[start] = c;
        queue.push(start);
        c++;

        while(queue.length > 0) {
            const current = queue.shift();
            order.add(() => {drawVertex(vertexes[current].x, vertexes[current].y, current, "blue")});

            for (let i = 0; i < matrix.length; i++) {
                if (matrix[current][i] && bfsArray[i] === -1) {
                    bfsArray[i] = c;
                    bfsMartix[current][i] = 1;
                    queue.push(i);
                    c++;

                    order.add(() => {
                        drawLine(vertexes[current].x, vertexes[current].y, vertexes[i].x, vertexes[i].y, 1),
                        drawVertex(vertexes[current].x, vertexes[current].y, current, "blue"),
                        drawVertex(vertexes[i].x, vertexes[i].y, i, "red");
                    });
                }
            }
        
            order.add(() => {drawVertex(vertexes[current].x, vertexes[current].y, current, "gray")});
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        if (bfsArray[i] === -1) search(i);
    }

    console.group("BFS matrix:");
    console.log(bfsMartix);
    console.groupEnd();

    console.group("BFS vertex list:");
    bfsArray.map((value, index)=>{
        console.log(`${index} => ${value}`);
    });
    console.groupEnd();

    button.addEventListener("click", order.execute);
}

export {dfs, bfs};