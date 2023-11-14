
document.addEventListener('DOMContentLoaded', () => {
    const state = new Proxy({ expenses: [] }, {
        set(target, key, value) {
            target[key] = value;
            if (key === 'expenses') {
                renderExpenses();
            }
            return true;
        }
    });

    const form = document.getElementById('expense-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        state.expenses = [...state.expenses, { name, amount }];
        form.reset();
    });

    function deleteExpense(index) {
        state.expenses = state.expenses.filter((_, i) => i !== index);
    }

    function renderExpenses() {
        const expensesList = document.getElementById('expenses');
        expensesList.innerHTML = '';
        state.expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `${expense.name}: $${expense.amount} <button onclick="deleteExpense(${index})">Delete</button>`;
            expensesList.appendChild(expenseItem);
        });

        const total = state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
        document.getElementById('total-expenses').textContent = total.toFixed(2);
    }

    window.deleteExpense = deleteExpense;
});
