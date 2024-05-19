import {vertexMatrix} from "./matrix.js";
import {RADIUS, ctx} from './config.js';

const drawVertex = (x, y, label) => {
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 4);
}

const drawLine = (x1, y1, x2, y2, arrow = 0) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    if (arrow) 
        drawArrow(x1,y1,x2,y2);
}

const drawLoop = (x, y, arrow = 0) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - RADIUS, y - RADIUS*1.5);
    ctx.lineTo(x + RADIUS, y - RADIUS*1.5);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    if (arrow)
        drawArrow(x + RADIUS, y - RADIUS*1.5, x, y);
}

const drawArrow = (x1, y1, x2, y2) => {
    const length = RADIUS/1.5;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowX = x2 - RADIUS*Math.cos(angle);
    const arrowY = y2 - RADIUS*Math.sin(angle);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - length * Math.cos(angle - Math.PI/10), arrowY - length * Math.sin(angle - Math.PI/10));
    ctx.lineTo(arrowX - length * Math.cos(angle + Math.PI/10), arrowY - length * Math.sin(angle + Math.PI/10));
    ctx.fill();
    ctx.closePath();
};

const drawDirGraph = (x, y, dirMatrix) => {
    const vertexes = vertexMatrix(x, y);

    for (let i = 0; i < dirMatrix.length; i++) {
        for (let j = 0; j < dirMatrix.length; j++) {
            if (dirMatrix[i][j]) {
                if (i === j) {
                    drawLoop(vertexes[i].x, vertexes[i].y, 1);
                }
                else if (dirMatrix[j][i] && i < j) {
                    drawLine(vertexes[i].x-10, vertexes[i].y+3, vertexes[j].x, vertexes[j].y, 1);
                    drawLine(vertexes[j].x+10, vertexes[j].y-3, vertexes[i].x, vertexes[i].y, 1); 
                }
                else if (!dirMatrix[j][i]){
                    drawLine(vertexes[i].x, vertexes[i].y, vertexes[j].x, vertexes[j].y, 1);
                }
            }
        }
    }
    
    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }
}

const drawUndirGraph = (x, y, undirMatrix) => {
    const vertexes = vertexMatrix(x, y);

    for (let i = 0; i < undirMatrix.length; i++) {
        for (let j = 0; j < undirMatrix.length; j++) {
            if (undirMatrix[i][j]) {
                if (i === j)
                    drawLoop(vertexes[i].x, vertexes[i].y);
                else
                    drawLine(vertexes[i].x, vertexes[i].y, vertexes[j].x, vertexes[j].y);
            }
        }
    }

    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }
}

const drawCondGraph = (x, y, connections) => {
    const size = Object.keys(connections).length;
    const vertexes = vertexMatrix(x, y, -size);

    for (const i in connections) {
        const row = connections[i];
        for (const j of row) {
            if (j) {
                drawLine(vertexes[i].x, vertexes[i].y, vertexes[j].x, vertexes[j].y, 1);
            }
        }
    }

    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, `K${i}`);
    }
}

export {drawDirGraph, drawUndirGraph, drawCondGraph};