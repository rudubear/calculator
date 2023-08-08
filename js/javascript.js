const calculatorButtons = document.getElementsByClassName("calcButton");
for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}

function doSomething(e){
    console.log(e.srcElement);
}