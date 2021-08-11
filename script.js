function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 == 0){
        return "ERROR"
    }
    return num1/num2;
}

function operate(operation,num1,num2){
    if(operation === "+"){
        return add(num1,num2);
    }
    if(operation === "-"){
        return subtract(num1,num2);
    }
    if(operation === "*"){
        return multiply(num1,num2);
    }
    if(operation === "/"){
        return divide(num1,num2);
    }
}