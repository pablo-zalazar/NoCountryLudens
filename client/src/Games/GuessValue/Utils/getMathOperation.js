
const OPERATORS = ['+', "-", "x", "÷"];
const OPMAP = {
    "+": (n1, n2, n3 = 0) => n1 + n2 + n3,
    "-": (n1, n2, n3 = 0) => n1 - n2 - n3,
    "*": (n1, n2, n3 = 1) => n1 * n2 * n3,
    "÷": (n1, n2, n3 = 1) => n1 / n2 / n3,
}
const generateValues = (difficulty) => {
    switch (difficulty) {
        case 1:
            return Math.floor(Math.random() * 100);
        case 2:
            return Math.floor(Math.random() * 1000);
        default:
            return Math.floor(Math.random() * 10);
    }
}
const createOperation = (quantity = 2, difficulty = 0) => {
    const operator = OPERATORS[Math.floor(Math.random() * (difficulty + 1))];
    const firstValue = generateValues(difficulty);
    const secondValue = generateValues(difficulty);
    let values = [firstValue, secondValue].sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
    let finalValue;
    if (quantity == 2) {
        finalValue = OPMAP[operator](values[0], values[1]);
        return [operator, ...values, finalValue];
    }
    const thirdValue = generateValues(difficulty);
    values.push(thirdValue);
    values = values.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
    finalValue = OPMAP[operator](values[0], values[1], values[2]);

    return [operator, ...values, finalValue];

}

const processOperation = (mathOp) => {
    const mathOpToModify = [...mathOp];
    const operator = mathOpToModify.shift();
    const finalValue = mathOpToModify.pop();
    const valueToHide = mathOpToModify[Math.floor(Math.random() * mathOpToModify.length)];
    if (mathOpToModify.length == 2) {
        const mappedMathOp = mathOpToModify.map(value => value == valueToHide ? "hidden" : value);
        const newMathOp = [...mappedMathOp.slice(0, 1), operator, ...mappedMathOp.slice(-1), "=", finalValue];
        return { hiddenValue: valueToHide, values: newMathOp };
    } else {
        const mappedMathOp = mathOpToModify.map(value => value == valueToHide ? "hidden" : value);
        const newMathOp = [...mappedMathOp.slice(0, 1), operator, ...mappedMathOp.slice(1, 2), operator, ...mappedMathOp.slice(2, 3), "=", finalValue];
        return { hiddenValue: valueToHide, values: newMathOp };
    }
}

const analizeOperation = (inputValue, hiddenValue) => {
    return Number(inputValue) == Number(hiddenValue) ? true : false;
}


export { createOperation, processOperation, analizeOperation }