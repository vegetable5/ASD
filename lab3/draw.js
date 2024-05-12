import {generateVertexMatrix} from "./generate.js";
import {RADIUS, ctx} from './main.js';

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

    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - length * Math.cos(angle - Math.PI/10), arrowY - length * Math.sin(angle - Math.PI/10));
    ctx.lineTo(arrowX - length * Math.cos(angle + Math.PI/10), arrowY - length * Math.sin(angle + Math.PI/10));
    ctx.fill();
    ctx.closePath();
};

const drawDirGraph = (x, y, dirMatrix) => {
    const vertexMatrix = generateVertexMatrix(x, y);

    for (let i = 0; i < dirMatrix.length; i++) {
        for (let j = 0; j < dirMatrix.length; j++) {
            if (dirMatrix[i][j]) {
                if (i === j) {
                    drawLoop(vertexMatrix[i].x, vertexMatrix[i].y, 1);
                }
                else if (dirMatrix[j][i] && i < j) {
                    drawLine(vertexMatrix[i].x+10, vertexMatrix[i].y+10, vertexMatrix[j].x, vertexMatrix[j].y, 1);
                    drawLine(vertexMatrix[j].x-10, vertexMatrix[j].y-10, vertexMatrix[i].x, vertexMatrix[i].y, 1); 
                }
                else if (!dirMatrix[j][i]){
                    drawLine(vertexMatrix[i].x, vertexMatrix[i].y, vertexMatrix[j].x, vertexMatrix[j].y, 1);
                }
            }
        }
    }
    
    for (let i = 0; i < vertexMatrix.length; i++) {
        drawVertex(vertexMatrix[i].x, vertexMatrix[i].y, i);
    }
}

const drawUndirGraph = (x, y, undirMatrix) => {
    const vertexMatrix = generateVertexMatrix(x, y);

    for (let i = 0; i < undirMatrix.length; i++) {
        for (let j = 0; j < undirMatrix.length; j++) {
            if (undirMatrix[i][j]) {
                if (i === j)
                    drawLoop(vertexMatrix[i].x, vertexMatrix[i].y);
                else
                    drawLine(vertexMatrix[i].x, vertexMatrix[i].y, vertexMatrix[j].x, vertexMatrix[j].y);
            }
        }
    }

    for (let i = 0; i < vertexMatrix.length; i++) {
        drawVertex(vertexMatrix[i].x, vertexMatrix[i].y, i);
    }
}

export {drawDirGraph, drawUndirGraph};