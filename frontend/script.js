let expenses = [];
// Variable to track total amount
let totalAmount = 0;
// Get references to HTML elements
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Add expense on button click
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate inputs
    if (category === '' || isNaN(amount) || amount <= 0 || info === '' || date === '') {
        alert('Please fill all fields correctly');
        return;
    }

    // Add expense to array and update total amount
    expenses.push({ category, amount, info, date });
    totalAmount += category === 'Income' ? amount : -amount;

    // Update total amount display
    updateTotalAmountDisplay();

    // Create and add new row to the table
    const newRow = expenseTableBody.insertRow();
    newRow.insertCell().textContent = category;
    newRow.insertCell().textContent = amount.toFixed(2);
    newRow.insertCell().textContent = info;
    newRow.insertCell().textContent = date;

    // Add delete button to the row
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Remove expense from array and update total amount
        expenses = expenses.filter(e => !(e.category === category && e.amount === amount && e.info === info && e.date === date));
        totalAmount += category === 'Income' ? -amount : amount;

        // Update total amount display and remove row
        updateTotalAmountDisplay();
        expenseTableBody.removeChild(newRow);
    });
    newRow.insertCell().appendChild(deleteBtn);
});

// Update the displayed total amount and its color
function updateTotalAmountDisplay() {
    totalAmountCell.textContent = totalAmount.toFixed(2);
    updateTotalColor();
}

// Update the color of the total amount
function updateTotalColor() {
    if (!totalAmountCell) return;
    const totalAmountValue = parseFloat(totalAmountCell.textContent) || 0;

    totalAmountCell.classList.toggle("total-positive", totalAmountValue > 0);
    totalAmountCell.classList.toggle("total-negative", totalAmountValue < 0);
}

// Initialize total amount display on page load
document.addEventListener("DOMContentLoaded", updateTotalAmountDisplay);
