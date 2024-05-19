const calculateDirDegrees = (matrix) => {
    let degrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let c = 0;
        for (let j = 0; j < matrix.length; j++) {
            c += matrix[i][j] + matrix[j][i];
        }
        degrees.push(c);
    }

    return degrees;
}

const calculateUndirDegrees = (matrix) => {
    let degrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let c = 0;
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                c++;
                if (i === j) c++;
            }
        }
        degrees.push(c);
    }

    return degrees;
}

const calculateHalfDegrees = (matrix) => {
    let halfDegrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let inDegree = 0;
        let outDegree = 0;
        for (let j = 0; j < matrix.length; j++) {
            outDegree += matrix[i][j];
            inDegree += matrix[j][i];
        }
        halfDegrees.push({outDegree, inDegree});
    }

    return halfDegrees;
}

const printDegrees = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (typeof(array[i]) === 'number')
            console.log(i + ": " + array[i]);
        else 
            console.log(i + ": " + array[i].outDegree + " out, " + array[i].inDegree + " in");
    }
}

const checkRegular = (degrees) => {
    const degree = degrees[0];

    for (let i = 1; i < degrees.length; i++) {
        if (degree != degrees[i]) return 0;
    }

    return 1;
}

const checkVertex = (degrees) => {
    let isolated = [];
    let pendant = [];
    
    for (let i = 0; i < degrees.length; i++) {
        if (degrees[i] === 1) pendant.push(i);
        else if (degrees[i] === 0) isolated.push(i);
    }

    return[isolated, pendant];
}

export {calculateDirDegrees, calculateHalfDegrees, calculateUndirDegrees, printDegrees, checkRegular, checkVertex}; 