const calculatorButtons = document.getElementsByClassName("calcButton");
const myNumbers = [0,1,2,3,4,5,6,7,8,9];
const modifyNumbers = ["%",".","+/-"];
const operate = ["+","/","*","-"];

const DEFAULT_NUM = 0;

let num1 = DEFAULT_NUM;
let num2 = DEFAULT_NUM;

for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}

function doSomething(e){
    const buttonPressValue = e.srcElement[`value`];
    const buttonClasses = Array.from(e.srcElement.classList);
    console.log(buttonPressValue);
    console.log(buttonClasses);
    if (buttonClasses.includes("calcNumber")) {
        console.log("a number has been selected");
    }

    if (buttonClasses.includes("calcOperate")) {
        console.log("an operation has been selected");
    }

    if (buttonClasses.includes("calcModifyNumber")) {
        console.log("a number modification has been requested");
    }

}