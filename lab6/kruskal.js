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

const createList = (matrix) => {
    const edges = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            if (matrix[i][j]) edges.push({weight: matrix[i][j], first: i, second: j});
        }
    }

    edges.sort((edge1, edge2) => edge2.weight - edge1.weight);
    
    let list = null;
    for (const edge of edges) {
        const node = {
            value: edge,
            next: list,
        };

        list = node;
    }

    return list;
};

const spanningTree = (x, y, matrix, button) => {
    let total = 0;
    const order = executionOrder();
    let list = createList(matrix);

    console.group("List:");
    console.log(list);
    console.groupEnd();

    const components = [];
    for (let i = 0; i < matrix.length; i++) {
        components.push([i])
    }

    const vertexes = vertexMatrix(x,y);
    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }

    const findComponents = (vertex) => {
        for (let i = 0; i < components.length; i++) {
            if (components[i].includes(vertex)) return i;
        }  
    }

    while(list !== null) {
        const {weight, first, second} = list.value;
        const component1 = findComponents(first);
        const component2 = findComponents(second);

        if (component1 !== component2) {
            total += weight;
            components[component1] = components[component1].concat(components[component2]);
            components.splice(component2, 1);

            order.add(() => {
                drawLine(vertexes[first].x, vertexes[first].y, vertexes[second].x, vertexes[second].y, 0, weight),
                drawVertex(vertexes[first].x, vertexes[first].y, first, "gray"),
                drawVertex(vertexes[second].x, vertexes[second].y, second, "gray");
            });
        }

        list = list.next;
    }

    console.group("Total weight:");
    console.log(total);
    console.groupEnd();

    button.addEventListener("click", order.execute);
}

export {spanningTree};