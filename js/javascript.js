const calculatorButtons = document.getElementsByClassName("calcButton");
const myNumbers = [0,1,2,3,4,5,6,7,8,9];
const modifyNumbers = ["%",".","+/-"];
const operate = ["+","/","*","-"];
const DEFAULT_NUM = 0;
const DEFAULT_MAX_NUM = 99999999;

//we will start at entering num1, then cycle between operand and num2 until we hit a pls clear state
const calculatorStates = {
    num1: 'enterNum1', 
    operand: 'enterAnOperand',
    num2: 'enternum2',
    plsClear: 'nanLockedPleaseClear', //must clear to make use of calculator
}

const calculatorEntries = {
    num: 'numberEntry',
    operate: 'operate',
    numModify: 'numberModify',
    clear: 'clear',
    equal: 'equal',
}

let currentCalculatorState = calculatorStates[`num1`];
console.log("current calc state " + currentCalculatorState);


let num1 = DEFAULT_NUM;
let num2 = DEFAULT_NUM;

for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}



function doSomething(e){
    const buttonPressed = e.srcElement;
    const calcEntry = getCalculatorEntry(buttonPressed);
    console.log(calcEntry);
    getCurrentDisplayValue();
}

function getCurrentDisplayValue(){
    const currentDisplay = document.getElementById("calcDisplayScreen");
    const currentDisplayValue = currentDisplay.textContent;
    //console.log(currentDisplayValue);

    if (isNaN(currentDisplayValue)) {
        console.log("is not a number");
        return Number.NaN;
    }
}

function getCalculatorEntry (buttonPressed) {
    const buttonClasses = Array.from(buttonPressed.classList); 

    //console.log(buttonClasses);
    if (buttonClasses.includes("calcNumber")) {
        console.log("a number has been selected");
        return calculatorEntries[`num`];
    }

    if (buttonClasses.includes("calcOperate")) {
        console.log("an operation has been selected");
        return calculatorEntries[`operate`];
    }

    if (buttonClasses.includes("calcModifyNumber")) {
        console.log("a number modification has been requested");
        return calculatorEntries[`numModify`];
    }

    if (buttonClasses.includes("calcClear")) {
        console.log("display cleared");
        return calculatorEntries[`clear`];
    }

    if (buttonClasses.includes("calcEqual")) {
        console.log("crunching numbers");
        return calculatorEntries[`equal`];
    }
}