import {vertexMatrix} from "./matrix.js";
import {RADIUS, ctx} from './config.js';

const drawVertex = (x, y, label, colour = "black") => {
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
    
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 4);
}

const drawLine = (x1, y1, x2, y2, arrow = 0, weight = 0) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    if (arrow) 
        drawArrow(x1,y1,x2,y2);
    if (weight) {
        let x = (x1+x2)/2;
        let y = (y1+y2)/2;
        drawWeight(x,y,weight);
    }
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

const drawWeight = (x, y, weight) => {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.rect(x-15,y-10,30,20);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(weight, x, y + 4);
}

const drawWeightedGraph = (x, y, matrix) => {
    const vertexes = vertexMatrix(x, y);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawLine(vertexes[i].x, vertexes[i].y, vertexes[j].x, vertexes[j].y, 0, matrix[i][j]);
            }
        }
    }

    for (let i = 0; i < vertexes.length; i++) {
        drawVertex(vertexes[i].x, vertexes[i].y, i);
    }
}

export {drawVertex, drawLine, drawWeightedGraph};