const numberButtons = document.querySelectorAll(".number, .operator");
numberButtons.forEach(button => button.addEventListener("click", displayNumber));
const mainText = document.querySelector("#mainText");
const delButton = document.querySelector(`button[value = "DEL"]`);
delButton.addEventListener("click", deleteNumber);
const equalButton = document.querySelector(`button[value = "="]`);
equalButton.addEventListener("click", getEquals);
const topText = document.querySelector("#topText");
const acButton = document.querySelector(`button[value = "AC"]`);
acButton.addEventListener("click", clearCalculator);
const plusMinusButton = document.querySelector(`button[value = "+/-"]`);
plusMinusButton.addEventListener("click", addPlusOrMinus);
const allOperators = ["+","-","/","%","*"];
const operatorsWithoutMinus = ["+","/","%","*"];
const allNumbers = ["0","1","2","3","4","5","6","7","8","9"];
window.addEventListener("keydown", pressedKey);
function pressedKey(e){
   if(e.key === "Backspace"){
       if(mainText.textContent.length === 1){
           mainText.textContent = "0";
       }
       else{
           mainText.textContent = mainText.textContent.slice(0,mainText.textContent.length -1);
       }
       return;
   }
   else if(allNumbers.includes(e.key) && mainText.textContent.length <= 14){
       if(mainText.textContent[0] === "0" && mainText.textContent.length < 2){
           mainText.textContent = e.key;
       }
       else if(mainText.textContent.length <= 2 && mainText.textContent[0] === "-" && mainText.textContent[1] === "0"){
            mainText.textContent = mainText.textContent[0] + e.target.value;
            return;
       }
       else{
            mainText.textContent += e.key;
       }
   }
   else if(e.key === "Enter"){
       //Stops the behaviour of clicking the most recent button pressed
       e.preventDefault();
       e.stopPropagation();
       getEquals(e);
       return;
   }
   else if(allOperators.includes(e.key)){
       addOperatorKey(e.key);
   }

   else if(e.key === "."){
       addDecimalKey();
   }
   
   
}
function addDecimalKey(){
    if(mainText.textContent.indexOf(".") === -1){
        mainText.textContent += ".";
    }
}
function addOperatorKey(key){
    if(getAmountOfOperators(mainText.textContent) === 0){
      mainText.textContent += key;  
    }
}
function addPlusOrMinus(){
    if(mainText.textContent[0] === "-"){
        mainText.textContent = mainText.textContent.slice(1);
        return;
    }
    if(mainText.textContent.length <= 14){
        mainText.textContent = "-" + mainText.textContent;
    }
   
}
function clearCalculator(){
    mainText.textContent = "0";
    topText.textContent = "";
}
function getEquals(){
    if(checkIfOnlyOperator(mainText.textContent)){
        return;
    }
    const operator = getOperator(mainText.textContent);
    if(operator == undefined){
        topText.textContent =  `${mainText.textContent} =`
        return;
    }
   
    const bothNumbers = mainText.textContent.split(operator);
    if(bothNumbers.length === 1){
        return;
    }
    topText.textContent =  `${mainText.textContent} =`
    //Have to check closely if division happens to see if its divided by 0
    if(operator === "/"){
      if(bothNumbers[1] == 0){
          mainText.textContent = "Nice try lol :)"  ;
          return;
      }   
      else{
        mainText.textContent = Math.round(operate(operator,+bothNumbers[0], +bothNumbers[1]) * 100)/100;
      }    
    }
    else{
        if(bothNumbers.length === 3){
            mainText.textContent = Math.round(operate(operator,+("-" + bothNumbers[1]), +bothNumbers[2]) * 100)/100;
        }
        else{
        mainText.textContent = Math.round(operate(operator,+bothNumbers[0], +bothNumbers[1]) * 100)/100;
        }
      }
     
    
}
function checkIfOnlyOperator(string){
    if(string.length === 1 && allOperators.includes(string)){
        return true;
    }
    if(string.length <= 2){
        if(allOperators.includes(string[0]) &&allOperators.includes(string[1])){
            return true;
        }
    }
    return false;
}
function deleteNumber(){
    if(mainText.textContent === "Nice try lol :)"){
        return;
    }
    if(mainText.textContent.length === 1){
        mainText.textContent = "0";
    }
    else{
    mainText.textContent = mainText.textContent.slice(0,mainText.textContent.length-1);
    }
}
function displayNumber(e){
    if(mainText.textContent === "Nice try lol :)"){
        return;
    }
    if(e.target.value === "."){
        addDecimal(e);
        return;
    }
    if(e.target.value === "=") return;
    if(checkIfOperator(e) === true){
        if(getAmountOfOperators(mainText.textContent) >= 1){
            return;
        }
    }
    if(mainText.textContent[0] === "0" && mainText.textContent.length === 1){
       if(!allOperators.includes(e.target.value)){
        mainText.textContent = e.target.value;
       }
       else{
           mainText.textContent += e.target.value;
       }
       return;
       
    }
    if(mainText.textContent.length <= 2 && mainText.textContent[0] === "-" && mainText.textContent[1] === "0"){
        mainText.textContent = mainText.textContent[0] + e.target.value;
        return;
    }
    if(mainText.textContent.length <= 14){
      mainText.textContent += e.target.value;  
      currentDisplayText = mainText.textContent;
    }
}
function addDecimal(e){
    if(mainText.textContent.indexOf(e.target.value) === -1 && mainText.textContent.length <= 14){
        mainText.textContent += e.target.value;
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
        if(i === 0 && string[i] === "-"){
            continue;
        }
        if(string[i] === "+" || string[i] === "-" || string[i] === "/" ||
           string[i] === "*" || string[i] === "%"){
            count++;
         }
    }
    return count;
}
function getOperator(string){
    for(let i = 1; i < string.length; i++){
        if(string[i] === "+" || string[i] === "-" || string[i] === "/" ||
        string[i] === "*" || string[i] === "%"){
         return string[i];
      }
    }
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
        return "Nice try lol :)";
    }
    return num1/num2;
}

function modulus(num1,num2){
    return num1 % num2;
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
    if(operation === "%"){
        return modulus(num1,num2);
    }
}
