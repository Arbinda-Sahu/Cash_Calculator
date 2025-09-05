// Indian Rupee denominations with images
const denominations = [
    { value: 2000, image: '2000 note.jpg', name: '₹2000 Note' },
    { value: 500, image: '500 note.jpg', name: '₹500 Note' },
    { value: 200, image: '200 note.jpg', name: '₹200 Note' },
    { value: 100, image: '100 note.jpeg', name: '₹100 Note' },
    { value: 50, image: '50 note.jpg', name: '₹50 Note' },
    { value: 20, image: '20 note.png', name: '₹20 Note' },
    { value: 10, image: '10 note.jpeg', name: '₹10 Note' },
    { value: 5, image: '5 note.jpeg', name: '₹5 Note' },
    { value: 2, image: '2 note.png', name: '₹2 Coin' },
    { value: 1, image: '1 note.png', name: '₹1 Coin' }
];

// DOM elements
const cashModeBtn = document.getElementById('cashMode');
const normalModeBtn = document.getElementById('normalMode');
const cashCalculator = document.getElementById('cashCalculator');
const normalCalculator = document.getElementById('normalCalculator');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const denominationsDiv = document.getElementById('denominations');
const totalCountSpan = document.getElementById('totalCount');
const totalAmountSpan = document.getElementById('totalAmount');
const targetAmountInput = document.getElementById('targetAmount');
const targetAmountDisplay = document.getElementById('targetAmountDisplay');
const differenceAmount = document.getElementById('differenceAmount');
const differenceStatus = document.getElementById('differenceStatus');

// Calculator elements
const calcInput = document.getElementById('calcInput');
const calcButtons = document.querySelectorAll('.calc-btn');

// Mode switching
cashModeBtn.addEventListener('click', () => {
    switchMode('cash');
});

normalModeBtn.addEventListener('click', () => {
    switchMode('normal');
});

function switchMode(mode) {
    if (mode === 'cash') {
        cashModeBtn.classList.add('active');
        normalModeBtn.classList.remove('active');
        cashCalculator.classList.add('active');
        normalCalculator.classList.remove('active');
    } else {
        normalModeBtn.classList.add('active');
        cashModeBtn.classList.remove('active');
        normalCalculator.classList.add('active');
        cashCalculator.classList.remove('active');
    }
}

// Cash Calculator functionality
calculateBtn.addEventListener('click', calculateTotalAndDifference);
clearBtn.addEventListener('click', clearAllInputs);

function calculateTotalAndDifference() {
    // Get quantities for each denomination
    const quantities = {
        2000: parseInt(document.getElementById('qty2000').value) || 0,
        500: parseInt(document.getElementById('qty500').value) || 0,
        200: parseInt(document.getElementById('qty200').value) || 0,
        100: parseInt(document.getElementById('qty100').value) || 0,
        50: parseInt(document.getElementById('qty50').value) || 0,
        20: parseInt(document.getElementById('qty20').value) || 0,
        10: parseInt(document.getElementById('qty10').value) || 0,
        5: parseInt(document.getElementById('qty5').value) || 0,
        2: parseInt(document.getElementById('qty2').value) || 0,
        1: parseInt(document.getElementById('qty1').value) || 0
    };

    // Get other amounts if provided
    const otherAmounts = [
        { amount: parseInt(document.getElementById('otherAmount1').value) || 0, qty: parseInt(document.getElementById('otherQty1').value) || 0 },
        { amount: parseInt(document.getElementById('otherAmount2').value) || 0, qty: parseInt(document.getElementById('otherQty2').value) || 0 },
        { amount: parseInt(document.getElementById('otherAmount3').value) || 0, qty: parseInt(document.getElementById('otherQty3').value) || 0 }
    ];
    
    // Get target amount
    const targetAmount = parseInt(targetAmountInput.value) || 0;

    // Calculate total amount and count
    let totalAmount = 0;
    let totalCount = 0;
    const result = [];

    // Calculate for standard denominations
    denominations.forEach(denomination => {
        const qty = quantities[denomination.value];
        if (qty > 0) {
            const amount = denomination.value * qty;
            totalAmount += amount;
            totalCount += qty;
            
            result.push({
                denomination: denomination,
                count: qty,
                amount: amount
            });
        }
    });

    // Add other amounts if provided
    otherAmounts.forEach((other, index) => {
        if (other.amount > 0 && other.qty > 0) {
            const otherTotal = other.amount * other.qty;
            totalAmount += otherTotal;
            totalCount += other.qty;
            
            result.push({
                denomination: {
                    value: other.amount,
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IiNGQ0JDN0YiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjNEZBNTUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnpNMTIgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPgo8cGF0aCBkPSJNMTIgNkM5Ljc5IDYgOCA3Ljc5IDggMTBzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6Ii8+Cjwvc3ZnPgo8L3N2Zz4K',
                    name: `₹${other.amount} Other ${index + 1}`
                },
                count: other.qty,
                amount: otherTotal
            });
        }
    });

    // Calculate difference
    const difference = totalAmount - targetAmount;
    
    // Display results
    displayResults(result, totalCount, totalAmount, targetAmount, difference);
}

function clearAllInputs() {
    // Clear all denomination quantity inputs
    document.getElementById('qty2000').value = '';
    document.getElementById('qty500').value = '';
    document.getElementById('qty200').value = '';
    document.getElementById('qty100').value = '';
    document.getElementById('qty50').value = '';
    document.getElementById('qty20').value = '';
    document.getElementById('qty10').value = '';
    document.getElementById('qty5').value = '';
    document.getElementById('qty2').value = '';
    document.getElementById('qty1').value = '';
    
    // Clear other amounts
    document.getElementById('otherAmount1').value = '';
    document.getElementById('otherQty1').value = '';
    document.getElementById('otherAmount2').value = '';
    document.getElementById('otherQty2').value = '';
    document.getElementById('otherAmount3').value = '';
    document.getElementById('otherQty3').value = '';
    
    // Clear target amount
    targetAmountInput.value = '';
    
    // Clear results display
    denominationsDiv.innerHTML = '<p style="text-align: center; color: #666;">No currency entered</p>';
    totalCountSpan.textContent = '0';
    totalAmountSpan.textContent = '0';
    targetAmountDisplay.textContent = '0';
    differenceAmount.textContent = '0';
    differenceStatus.textContent = '';
    differenceStatus.className = 'difference-status';
}

function displayResults(results, totalCount, totalAmount, targetAmount, difference) {
    denominationsDiv.innerHTML = '';
    
    if (results.length === 0) {
        denominationsDiv.innerHTML = '<p style="text-align: center; color: #666;">No currency entered</p>';
        return;
    }
    
    results.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'denomination-item';
        
        itemDiv.innerHTML = `
            <img src="${item.denomination.image}" alt="${item.denomination.name}" class="currency-image" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IiNGMEY4RjMiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjNjY2Ij4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPgo8cGF0aCBkPSJNMTIgNkM5Ljc5IDYgOCA3Ljc5IDggMTBzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6Ii8+Cjwvc3ZnPgo8L3N2Zz4K'">
            <div class="denomination-value">${item.denomination.name}</div>
            <div class="denomination-count">Count: ${item.count}</div>
            <div class="denomination-amount">Amount: ₹${item.amount}</div>
        `;
        
        denominationsDiv.appendChild(itemDiv);
    });
    
    // Update summary
    totalCountSpan.textContent = totalCount;
    totalAmountSpan.textContent = totalAmount;
    targetAmountDisplay.textContent = targetAmount;
    differenceAmount.textContent = difference;
    
    // Update difference status
    updateDifferenceStatus(difference);
}

function updateDifferenceStatus(difference) {
    differenceStatus.className = 'difference-status';
    
    if (difference === 0) {
        differenceStatus.textContent = '✅ Exact Amount!';
        differenceStatus.classList.add('exact');
    } else if (difference > 0) {
        differenceStatus.textContent = `💰 You have ₹${difference} more than needed`;
        differenceStatus.classList.add('positive');
    } else {
        differenceStatus.textContent = `❌ You need ₹${Math.abs(difference)} more`;
        differenceStatus.classList.add('negative');
    }
}

// Normal Calculator functionality
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        handleCalculatorInput(value);
    });
});

function handleCalculatorInput(value) {
    if (value === 'AC') {
        clearCalculator();
    } else if (value === '±') {
        toggleSign();
    } else if (value === '%') {
        calculatePercentage();
    } else if (value === '=') {
        calculateResult();
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else {
        appendNumber(value);
    }
    updateDisplay();
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
}

function toggleSign() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
    }
}

function calculatePercentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
}

function handleOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculateResult();
    }
    
    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
}

function updateDisplay() {
    calcInput.value = currentInput || '0';
}

// Initialize the calculator
clearCalculator();
updateDisplay();

// Add some sample data for demonstration
window.addEventListener('load', () => {
    // Set sample quantities to show how it works
    document.getElementById('qty2000').value = '2';
    document.getElementById('qty500').value = '3';
    document.getElementById('qty100').value = '5';
    document.getElementById('qty50').value = '2';
    document.getElementById('qty20').value = '10';
    document.getElementById('qty10').value = '15';
    document.getElementById('qty5').value = '20';
    document.getElementById('qty2').value = '25';
    document.getElementById('qty1').value = '50';
    
    // Set sample other amounts
    document.getElementById('otherAmount1').value = '25';
    document.getElementById('otherQty1').value = '8';
    document.getElementById('otherAmount2').value = '75';
    document.getElementById('otherQty2').value = '3';
    document.getElementById('otherAmount3').value = '150';
    document.getElementById('otherQty3').value = '2';
    
    // Set sample target amount
    targetAmountInput.value = '8000';
    
    // Calculate to show results
    calculateTotalAndDifference();
});
