/*
enternum1 state valid inputs are a digit, modify or an operand
    if digit entered, overwrite number on screen
    if operand entered, take the number on screen as num1
    if operand selected
        capture num1 as the number on screen and enter state enternum2

enternum2 state valid inptus are a digit, modify or an operand
    if digit entered, overwrite number on screen
    if operand entered, take the number on screen as num2
        calculate the operation of num1 operand num2, return result on screen



*/

const calculatorButtons = document.getElementsByClassName("calcButton");
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
let lockedOperator = null;
let displayValue = 0;
let requestedOperation = null;
let num2InputStart = false;

for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}

function doSomething(e){
    const buttonPressed = getCalculatorEntry(e.srcElement);

    
    if(currentCalculatorState === `enterNum1`){
        switch(buttonPressed) {
            case calculatorEntries[`clear`]: {   
                console.log("clearing calculator");
                resetCalculator();
            break;
            }
            case calculatorEntries[`num`]: {
                console.log("a number has been entered onto the screen");
                processNumber(e.srcElement[`value`]);
                break;
            }
            case calculatorEntries[`numModify`]: {
                console.log("a number on the screen has been modified");
                const numberOnDisplay = getCalcDisplayScreen();
                const requestedModification = e.srcElement[`value`];
                let newNumberOnDisplay = processNumberModify(requestedModification, numberOnDisplay);
                updateCalcDisplayScreen(newNumberOnDisplay);
                break;
            }
            case calculatorEntries[`operate`]: {
                requestedOperation = e.srcElement[`value`]; //saveRequestedOperationState
                console.log(`${requestedOperation} +  selected`);
                num1 = Number(getCalcDisplayScreen());
                currentCalculatorState = `enterNum2`;
                num2InputStart = true;
            }
                break;
            case calculatorEntries[`equal`]: {
                console.log("equals does nothing when current state is enterNum1");
            }
        }
/*
        else if(currentCalculatorState === `enterNum2`) {
            num2 = Number(num2String);
            console.log(`num1 set to ${num1}, num2 is ${num2}`);
            lockedOperator = operator;
            displayValue = operate(num1, num2, lockedOperator);
            updateCalcDisplayScreen(displayValue);*/
    } else if (currentCalculatorState === `enterNum2`) {
        switch(buttonPressed) {
            case calculatorEntries[`clear`]: {   
                console.log("clearing calculator");
                resetCalculator();
            break;
            }
            case calculatorEntries[`num`]: {
                console.log("a number has been entered onto the screen");
                if(num2InputStart === true){
                    num2InputStart = false;
                    updateCalcDisplayScreen("");
                }
                processNumber(e.srcElement[`value`]);
                break;
            }
            case calculatorEntries[`numModify`]: {
                console.log("a number on the screen has been modified");
                const numberOnDisplay = getCalcDisplayScreen();
                const requestedModification = e.srcElement[`value`];
                let newNumberOnDisplay = processNumberModify(requestedModification, numberOnDisplay);
                updateCalcDisplayScreen(newNumberOnDisplay);
                break;
            }
            case calculatorEntries[`operate`]: {
                //we already have a requested operation in place if we've requested operate while in enternum2 state
                //so lets crunch the numbers and set num1 to this new value
                if (requestedOperation) {
                    num2 = Number(getCalcDisplayScreen());
                    let newNumberOnDisplay = operate(num1, num2, requestedOperation);
                    updateCalcDisplayScreen(newNumberOnDisplay);
                    num1 = Number(newNumberOnDisplay);
                    num2 = DEFAULT_NUM;
                    requestedOperation = e.srcElement[`value`]; //saveRequestedOperationState
                    console.log(`${requestedOperation} +  selected`);
                    num2InputStart = true;
                } else {
                    num1 = Number(getCalcDisplayScreen());
                    num2 = DEFAULT_NUM;
                    requestedOperation = e.srcElement[`value`]; //saveRequestedOperationState
                    console.log(`${requestedOperation} +  selected`);
                    num2InputStart = true;
                }
            }
                break;
            case calculatorEntries[`equal`]: {
                if(requestedOperation){
                    num2 = Number(getCalcDisplayScreen());
                let newNumberOnDisplay = operate(num1, num2, requestedOperation);
                updateCalcDisplayScreen(newNumberOnDisplay);
                num1 = newNumberOnDisplay;
                num2 = DEFAULT_NUM;
                num2InputStart = true;
                }

                requestedOperation = null; //no operator in the queue
            }
        }
    }
    else if (currentCalculatorState === "nanLockedPleaseClear"){
        if(buttonPressed === calculatorEntries[`clear`]) {   
            console.log("clearing calculator");
            resetCalculator();
        }
        else {
            console.log("NaN locked, please clear first");
        }
        
    }

    
    console.log(buttonPressed);
    
}

function processNumber(digit){
    console.log(`processing ${digit} when current state is ${currentCalculatorState}`);
    const numberOnDisplay = getCalcDisplayScreen();
    if (numberOnDisplay === 0) {
        let newNumberOnDisplay = digit;
        updateCalcDisplayScreen(newNumberOnDisplay);
    }
    else if (Number.isNaN(numberOnDisplay)){
        console.log("Stuck on NaN, clear first please");
    }
    else {
        let newNumberOnDisplay = numberOnDisplay + digit;
        updateCalcDisplayScreen(newNumberOnDisplay);
    }
    /*switch (currentCalculatorState) {
        case 'enterNum1': {
            console.log(`num1 string was initially ${num1String}`);
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
        case 'enterNum2': {
            console.log(`num2 string was initially ${num2String}`);
            if ((num2String === null) || (num2String === 0) || (num2String === "0")) {
                console.log("hue")
                num2String = digit;
                updateCalcDisplayScreen(num2String);
            }
            else {
                console.log("wha");
                num2String += digit;
                updateCalcDisplayScreen(num2String);
            }
        }
        default:
            break;
    }*/
    console.log(`num1String is ${num1String} num2String is ${num2String}`);
    
}

function processNumberModify(requestedModification, numberOnDisplay){
    console.log(`processing ${requestedModification} when current state is ${currentCalculatorState}`);
            let result = null;
            switch(requestedModification) {
                case "negate":
                    result = negate(numberOnDisplay);
                    break;
                case "percent":
                    result = trimZerosAtEnd(Number(percentify(numberOnDisplay)).valueOf().toPrecision(8));
                    break;
                case "decimal":
                    if (checkIfNumberHasDecimal(numberOnDisplay) === false){
                        result = addDecimal(numberOnDisplay);
                        //updateCalcDisplayScreen(result);
                    } else {
                        result = numberOnDisplay;
                    }
                    break;
                default:
                    throw(console.error());
            }
            return result;            
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

function add(num1, num2) {
    return Number(num1 + num2);
}

function subtract(num1, num2) {
    return Number(num1 - num2);
}

function multiply(num1, num2) {
    return Number(num1 * num2);
}

function divide (num1, num2) {
    return Number(num1 / num2);
}

function operate (num1, num2, operation) {
    console.log(`performing ${operation} on ${num1} and ${num2}`);
    let result = null;
    switch(operation){
        case "plus":
            result = add(num1,num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
        default:
            console.log("how did we get here");
            throw(error);
    }
    if(isNaN(result)) {
        currentCalculatorState = `nanLockedPleaseClear`;
    }
    return result;
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

function checkIfNumberHasDecimal(numString){
    let numberHasDecimal = (String(numString)).includes("."); 
    if (numberHasDecimal) {
        console.log("This number already has a decimal");
    }
    return numberHasDecimal;
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

function getCalcDisplayScreen() {
    let result = null;
    const calculatorDisplayScreen = document.getElementById("calcDisplayScreen").textContent;
    if(checkIfNumberHasDecimal(calculatorDisplayScreen)) {
        result = calculatorDisplayScreen;
    } else {
        result = Number(calculatorDisplayScreen);
    }
    return result;
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

function resetCalculator(){
    num1String = 0;
    num2String = null;
    num1 = DEFAULT_NUM;
    num2 = DEFAULT_NUM;
    operator = null;
    lockedOperator = null;
    requestedOperation = null;
    updateCalcDisplayScreen(num1String);
    currentCalculatorState = `enterNum1`;
    console.log(`clear! current state set to ${currentCalculatorState} `);
}

