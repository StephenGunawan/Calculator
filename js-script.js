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
    return num1/ num2;
}

function operator(num1, operator, num2){
    if (operator == '+'){
        return add(num1, num2);
    }
    if (operator == '-'){
        return subtract(num1, num2);
    }
    if(operator == '*'){
        return multiply(num1, num2);
    }
    if(operator == '/'){
        return divide(num1, num2);
    }
}

const numberDisplay = document.querySelector(".text");
const buttons = document.querySelectorAll("button")
let num1 = 0;
let num2 = 0;
let op = "";
let operatorButtonLastPresed = false;
let commaPressed = false;
const displayLength = 10;


function calculate(){
    buttons.forEach(button =>{
        button.addEventListener('click', () => {
            const zero = button.querySelector(".text-zero");
            if(button.textContent == "AC"){
                numberDisplay.textContent = "0";
                num1 = 0;
                num2 = 0;
                op = "";
                operatorButtonLastPresed = false;
                commaPressed  = false;
            }else if (numberDisplay.textContent.length>=displayLength){
                return;
            }else if (numberDisplay.textContent =="ERROR" && !zero && (button.textContent == "=" || button.textContent == "." || button.textContent == "+" || button.textContent == "-" ||button.textContent == "*" ||button.textContent == "/"  || button.textContent == "%" || button.textContent == "+/-" )){
                numberDisplay.textContent = numberDisplay.textContent;
                num1 = 0;
                num2 = 0;
                op = "";
                operatorButtonLastPresed = false;
                commaPressed  = false;
            }else if (numberDisplay.textContent =="ERROR" && !zero){
                numberDisplay.textContent = button.innerHTML;
                num1 = 0;
                num2 = 0;
                op = "";
                operatorButtonLastPresed = false;
                commaPressed  = false;
            }else if (numberDisplay.textContent =="ERROR" && zero){
                numberDisplay.textContent = zero.innerHTML;
                num1 = 0;
                num2 = 0;
                op = "";
                operatorButtonLastPresed = false;
                commaPressed  = false;
            }else if (button.textContent =="+/-"){
                numberDisplay.textContent *= -1;
            }else if (button.textContent =="%"){
                numberDisplay.textContent *= 0.01;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="=" && op == "/"  && numberDisplay.textContent == 0 && !operatorButtonLastPresed){
                numberDisplay.textContent = "ERROR";
            }else if (button.textContent =="="  && op == ""){
                numberDisplay.textContent = numberDisplay.textContent;
            }else if (button.textContent =="="  && numberDisplay.textContent == 0 && num1 == 0 &&  num2 == 0){
                numberDisplay.textContent = numberDisplay.textContent;
            }else if (button.textContent =="="  && !operatorButtonLastPresed){
                num2 = numberDisplay.textContent;
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="=" && operatorButtonLastPresed){
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="+" && num1 == 0 && num2 == 0){
                num1 = numberDisplay.textContent;
                op = "+"
                operatorButtonLastPresed = true;
            }else if (operatorButtonLastPresed && (button.textContent == "+" || button.textContent == "-" ||button.textContent == "*" ||button.textContent == "/" )){
                numberDisplay.textContent =  numberDisplay.textContent;
                op = button.textContent;
            }else if (operatorButtonLastPresed && !zero){
                numberDisplay.textContent =  button.innerHTML;
                operatorButtonLastPresed = false;
            }else if (operatorButtonLastPresed && zero){
                numberDisplay.textContent =  zero.innerHTML;
                operatorButtonLastPresed = false;
            }else if (button.textContent =="+" && numberDisplay.textContent != 0){
                num2 = numberDisplay.textContent;
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                num2 = 0;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="-" && num1 == 0 && num2 == 0){
                num1 = numberDisplay.textContent;
                op = "-"
                operatorButtonLastPresed = true;
            }else if (button.textContent =="-" && numberDisplay.textContent != 0){
                num2 = numberDisplay.textContent;
                op = "-"
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                num2 = 0;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="*" && num1 == 0 && num2 == 0){
                num1 = numberDisplay.textContent;
                op = "*"
                operatorButtonLastPresed = true;
            }else if (button.textContent =="*" && numberDisplay.textContent != 0){
                num2 = numberDisplay.textContent;
                op = "*"
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                num2 = 0;
                operatorButtonLastPresed = true;
            }else if (button.textContent =="/" && num1 == 0 && num2 == 0){
                num1 = numberDisplay.textContent;
                op = "/"
                operatorButtonLastPresed = true;
            }else if (button.textContent =="/" && numberDisplay.textContent != 0){
                num2 = numberDisplay.textContent;
                op = "/"
                let result = operator(Number(num1), op, Number(num2));
                if (result.toString().length >= displayLength){
                    if(result %1 != 0){
                        numberDisplay.textContent = result.toFixed(displayLength - result.toFixed(0)-1);
                    }else{
                        let result2 =  result.toExponential(displayLength-1).replace(/\.?0+e/, "e");
                        numberDisplay.textContent = result2.length> displayLength ? result2.slice(0, displayLength): result2;
                    }
                }else{
                    numberDisplay.textContent =result;
                }
                num1 = numberDisplay.textContent;
                num2 = 0;
                operatorButtonLastPresed = true;
            }else if (numberDisplay.textContent =="0" && button.textContent != "."){
                numberDisplay.textContent = button.textContent;    
            }else if (button.textContent == "." && !commaPressed){
                numberDisplay.textContent += button.textContent; 
                commaPressed = true;
            }else if (button.textContent == "." && commaPressed){
                numberDisplay.textContent = numberDisplay.textContent;
            }else if (zero){
                numberDisplay.textContent += zero.innerHTML;
                operatorButtonLastPresed = false;
            }else {
                numberDisplay.textContent += button.innerHTML;
                operatorButtonLastPresed = false;
            }}
        )}
    );
}

calculate();

