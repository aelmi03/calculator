const numberButtons = document.querySelectorAll(".number, .operator");
numberButtons.forEach(button => button.addEventListener("click", displayNumber));
const mainText = document.querySelector("#mainText");
const delButton = document.querySelector(`button[value = "DEL"]`);
delButton.addEventListener("click", deleteNumber);
let currentDisplayText = "";
console.log(mainText);
function deleteNumber(){
    console.log(mainText.textContent.length)
    if(mainText.textContent.length === 1){
        console.log("lel");
        mainText.textContent = "0";
    }
    else{
    mainText.textContent = mainText.textContent.slice(0,mainText.textContent.length-1);
    }
}
function displayNumber(e){
    if(checkIfOperator(e) === true){
        if(getAmountOfOperators(currentDisplayText) >= 1){
            return;
        }
    }
    if(mainText.textContent[0] === "0"){
        mainText.textContent = e.target.value;
        return;
    }
    if(mainText.textContent.length <= 14){
      mainText.textContent += e.target.value;  
      currentDisplayText = mainText.textContent;
      console.log(currentDisplayText);
    }
}
function checkIfOperator(e){
    if(e.target.value === "+" ||e.target.value === "-" || e.target.value === "/" ||
       e.target.value === "*" || e.target.value === "%"){
           return true;
       }
       return false;
}
function getAmountOfOperators(string){
    let count = 0;
    for(let i = 0; i < string.length; i++){
        if(string[i] === "+" || string[i] === "-" || string[i] === "/" ||
           string[i] === "*" || string[i] === "%"){
            count++;
         }
    }
    return count;
}
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
