let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    
    if (number === '.' && currentOperand.includes('.')) return;
    
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
        compute();
    }
    
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function backspace() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    currentOperandElement.textContent = formatDisplayNumber(currentOperand);
    
    if (operation != null) {
        previousOperandElement.textContent = 
            `${formatDisplayNumber(previousOperand)} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function getOperationSymbol(operation) {
    switch (operation) {
        case '+': return '+';
        case '-': return '-';
        case '×': return '×';
        case '÷': return '÷';
        default: return '';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === '+' || event.key === '-') {
        chooseOperation(event.key);
    } else if (event.key === '*') {
        chooseOperation('×');
    } else if (event.key === '/') {
        chooseOperation('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        compute();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Delete' || event.key === 'Escape') {
        clearAll();
    }
});

updateDisplay();
