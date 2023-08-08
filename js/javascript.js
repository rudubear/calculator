const calculatorButtons = document.getElementsByClassName("calcBtn");
for (calculatorButton of calculatorButtons){
    calculatorButton.addEventListener("click",doSomething)
}

function doSomething(e){
    console.log(e.srcElement);
}