const calculatorButtons = document.getElementsByClassName("calcButton");
const myNumbers = [0,1,2,3,4,5,6,7,8,9];
const modifyNumbers = ["%",".","+/-"];
const DEFAULT_NUM = null;
const DEFAULT_MAX_NUM = 99999999;

//we will start at entering num1, then cycle between operand and num2 until we hit a pls clear state
const calculatorStates = {
    num1: 'enterNum1', 
    operand: 'enterAnOperand',
    num2: 'enterNum2',
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

let num1String = 0;
let num2String = 0;
let num1 = DEFAULT_NUM;
let num2 = DEFAULT_NUM;
let operator = null;

for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}

function doSomething(e){
    const buttonPressed = e.srcElement;
    const calcEntry = getCalculatorEntry(buttonPressed);
    console.log(calcEntry);
    //console.log(calculatorEntries);
    getCurrentDisplayValue();

    switch(calcEntry) {
        case calculatorEntries[`clear`]: {
            num1String = 0;
            num2String = 0;
            num1 = DEFAULT_NUM;
            num2 = DEFAULT_NUM;
            operator = null;
            updateCalcDisplayScreen(num1String);
            currentCalculatorState = `enterNum1`;
            console.log(`clear! current state set to ${currentCalculatorState} `);
            break;
        }
        case calculatorEntries[`num`]: {
            console.log("process a number");
            processNumber(e.srcElement[`value`]);
            break;
        }
        case calculatorEntries[`numModify`]: {
            console.log("modify a number");
            if (currentCalculatorState === `enterNum1`) {
                num1String = processNumberModify(e.srcElement[`value`], num1String);
                updateCalcDisplayScreen(num1String);
            }
            else if (currentCalculatorState === `enterNum2`) {
                num2String = processNumberModify(e.srcElement[`value`], num2String);
                updateCalcDisplayScreen(num2String);
            }
            break;
        }
        case calculatorEntries[`operate`]: {
            const operation = e.srcElement[`value`];
            console.log(operation);
            if(currentCalculatorState === `enterNum1`) {
                num1 = Number(num1String);
                console.log(`num1 set to ${num1}, num2 is ${num2}`);
                currentCalculatorState = `enterNum2`;
            }
            //currentCalculatorState = calculatorStates[`num2`];
            break;
        }
    }
}

function processNumber(digit){
    console.log(`processing ${digit} when current state is ${currentCalculatorState}`);
    switch (currentCalculatorState) {
        case 'enterNum1': {
            if (num1String === 0) {
                num1String = digit;
                updateCalcDisplayScreen(num1String);
            }
            else {
                num1String += digit;
                updateCalcDisplayScreen(num1String);
            }
            break;
        }
        default:
            break;
    }
    console.log(`num1String is ${num1String}`);
    
}

function processNumberModify(requestedModification, numString){
    console.log(`processing ${requestedModification} when current state is ${currentCalculatorState}`);
    
            switch(requestedModification) {
                case "negate":
                    numString = negate(numString);
                    break;
                case "percent":
                    numString = trimZerosAtEnd(Number(percentify(numString)).valueOf().toPrecision(8));
                    break;
                case "decimal":
                    if (alreadyHasDecimal(numString) === false){
                        numString = addDecimal(numString);
                    }
                    break;
                default:
                    throw(console.error());
            }
            return numString;            
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
        //console.log("a number has been selected");
        return calculatorEntries[`num`];
    }

    if (buttonClasses.includes("calcOperate")) {
        //console.log("an operation has been selected");
        return calculatorEntries[`operate`];
    }

    if (buttonClasses.includes("calcModifyNumber")) {
        //console.log("a number modification has been requested");
        return calculatorEntries[`numModify`];
    }

    if (buttonClasses.includes("calcClear")) {
        //console.log("display cleared");
        return calculatorEntries[`clear`];
    }

    if (buttonClasses.includes("calcEqual")) {
        //console.log("crunching numbers");
        return calculatorEntries[`equal`];
    }
}

function calculate(num1, num2, operate) {
    switch(operate){
        case '+' : {
            return add(num1, num2);
            break;
        }
        default:
        return 0;
    }
    console.log(hue);
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (num1, num2, operation) {
    switch(operation){
        case "add":
            break;
        case "subtract":
            break;
        case "multiply":
            break;
        case "divide":
            break;
        default:
            throw(error);
    }
}

function negate(numString) {
    switch(numString) {
        case "0":
            return "0"; // do nothing if +/- requested on a zero
        case "NaN":
            console.log("how did we get here?")
            return "NaN";
            // ideally we should not enter this state as NaN should set the calculator into a plsClear state
        default:
            if (String(numString)[0] === '-') {
                return (String(numString)).slice(1,(String(numString)).length);
            }
            else {
                return '-' + numString;
            }
    }
}

function alreadyHasDecimal(numString){
    console.log("num1String already has a decimal");
    return (String(numString)).includes(".");
}

function addDecimal(numString) {
    switch(numString) {
        case "0":
            return "0"; // do nothing if +/- requested on a zero
        case "NaN":
            console.log("how did we get here?")
            return "Nan"; 
            // ideally we should not enter this state as NaN should set the calculator into a plsClear state
        default:{
                return numString + ".";
            }
    }
}

function percentify(numString) {
    switch(numString) {
        case "0":
            return "0"; // do nothing if +/- requested on a zero
        case "NaN":
            console.log("how did we get here?")
            return "Nan"; 
            // ideally we should not enter this state as NaN should set the calculator into a plsClear state
        default:
            //console.log(numString);
            //console.log(Number(numString).valueOf());
            //console.log((Number(numString).valueOf())/100);
            //console.log(((Number(numString).valueOf())/100).toString());
            return ((Number(numString).valueOf())/100).toString();
    }
}

function updateCalcDisplayScreen(value){
    const calculatorDisplayScreen = document.getElementById("calcDisplayScreen");
    calculatorDisplayScreen.textContent = value;
}

function trimZerosAtEnd(myStrNumber){
    //trim the exponent
    let trimmedExponent = "";
    let locationOfExponent = myStrNumber.indexOf("e");
    if(locationOfExponent >=0 ) {
        trimmedExponent = myStrNumber.slice(locationOfExponent, myStrNumber.length);
        myStrNumber = myStrNumber.slice(0,locationOfExponent-1);
        //console.log(trimmedExponent);
    }
    while (myStrNumber[myStrNumber.length-1] === "0"){
        //console.log(myStrNumber[myStrNumber.length-1]);
        //console.log(myStrNumber);
        myStrNumber = myStrNumber.slice(0,myStrNumber.length-1);
    }
    return myStrNumber + trimmedExponent;
}

