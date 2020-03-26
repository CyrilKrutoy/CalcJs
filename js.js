const buttons = document.getElementById("buttons"),
    display = document.getElementById("display");

function main() {

    let firstOperator = true,
        initialNumber = true,
        currentOperator,
        firstNumber = "",
        secondNumber = "",
        result = false;


    buttons.addEventListener('click', (event) => {
        let pressed = event.target.innerText;
        calculate(pressed);
    })


    window.addEventListener('keydown', (event) => {
        let { key } = event;
        calculate(key);
    })



    function calculate(pressed) {
        if ("0123456789".includes(pressed)) {
            if (result) {
                show("");
                firstOperator = true;
                initialNumber = true;
                firstNumber = "";
                secondNumber = "";
                result = false;
            }
            if (initialNumber) {
                add(pressed);
                firstNumber += pressed;
            }
            else {
                add(pressed);
                secondNumber += pressed;
            }
        }
        else if ("+-/*".includes(pressed) && firstNumber) {
            if (result) {
                firstOperator = true;
                secondNumber = "";
                showingResult = false;
                currentOperator = "";
            }
            if (firstOperator) {
                add(pressed);
                currentOperator = pressed;
                firstOperator = false;
                initialNumber = false;
            }
            else if (secondNumber) {
                firstNumber = count(currentOperator, parseInt(firstNumber), parseInt(secondNumber));
                currentOperator = pressed;
                show(firstNumber);
                secondNumber = "";
                firstOperator = false;
                add(pressed);
            }
        }
        else if (pressed === "C" || pressed === "Backspace") {
            show("");
            firstOperator = true;
            initialNumber = true;
            firstNumber = "";
            secondNumber = "";
            result = false;
            currentOperator = ""
        }
        else if (pressed === "=" || pressed === "Enter") {
            if (secondNumber) {
                result = true;
                firstNumber = count(currentOperator, parseInt(firstNumber), parseInt(secondNumber));
                show(firstNumber);
            }
        }
    }
}


function count(operator, firstNumber, secondNumber) {
    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            result = firstNumber / secondNumber;
            break;
    }
    return "" + result;
}

function show(text) {
    display.innerText = text;
}

function add(text) {
    display.innerText += text;
}

main()