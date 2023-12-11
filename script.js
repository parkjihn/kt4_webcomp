
class ExpenseCalculator extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expenses = [];
        this.total = 0;
        this.shadowRoot.innerHTML = `
  
        <style>
        /* Component's container */
        .expanse-calculator {
            width: 400px;
            padding: 40px;
            background-color: #3b4048;
            border-radius: 15px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            margin: auto;
            text-align: center;
        }

        /* Input and button styles */
        #expense-form input[type="text"],
        #expense-form input[type="number"] {
            width: calc(50% - 20px);
            padding: 12px;
            margin: 10px;
            border: 2px solid #61dafb;
            border-radius: 6px;
            background-color: transparent;
            color: #abb2bf;
            outline: none;
        }

        #expense-form input[type="text"]:focus,
        #expense-form input[type="number"]:focus {
            border-color: #98c379;
        }

        #expense-form button {
            padding: 12px 20px;
            background-color: #61dafb;
            color: #282c34;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #expense-form button:hover {
            background-color: #98c379;
        }

        /* List styles */
        #expense-list {
            margin-top: 30px;
            text-align: left;
            list-style-type: none;
            padding: 0;
        }

        .card {
            background-color: #4b5263;
            margin-top: 10px;
            padding: 12px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card button {
            background-color: transparent;
            border: none;
            color: #e06c75;
            cursor: pointer;
        }

        .card button:hover {
            text-decoration: underline;
        }
    </style>
    <div class='expanse-calculator'>
        <h1>Калькулятор расходов</h1>
        <form id="expense-form">
            <input type="text" id="expense-name" placeholder="Расход" required>
            <input type="number" id="expense-amount" placeholder="Сумма" required>
            <button type="submit">Добавить</button>
        </form>
        <ul id="expense-list"></ul>
        <h2>Общая сумма расходов: <span id="total-expenses">0</span></h2>
    </div>
`;

        this.shadowRoot.querySelector('#expense-form').addEventListener('submit', this.addExpense.bind(this));
    }

    addExpense(event) {
        event.preventDefault();
        const nameInput = this.shadowRoot.getElementById('expense-name');
        const amountInput = this.shadowRoot.getElementById('expense-amount');
        const name = nameInput.value;
        const amount = parseFloat(amountInput.value);

        if (name.trim() === '' || amount <= 0) {
            alert('Неправильно введено имя, или сумма меньше или равна 0');
            return;
        }
        
        this.expenses.push({ name, amount });
        this.total += amount;
        this.renderExpenses();
        this.updateTotal();
        nameInput.value = '';
        amountInput.value = '';
    }

    renderExpenses() {
        const expenseList = this.shadowRoot.getElementById('expense-list');
        expenseList.innerHTML = '';
        this.expenses.forEach((expense, index) => {
            const div = document.createElement('li');
            div.classList.add('card');
            div.innerHTML = `
                <p>Название расхода: ${expense.name}</p>
                <p>Потрачено: ${expense.amount} рублей</p>
                <button data-index="${index}">Удалить</button>
            `;
            expenseList.appendChild(div);
            div.querySelector('button').addEventListener('click', this.deleteExpense.bind(this));
        });
    }

    updateTotal() {
        const totalExpenses = this.shadowRoot.getElementById('total-expenses');
        totalExpenses.textContent = this.total.toFixed(2);
    }

    deleteExpense(event) {
        const index = event.target.dataset.index;
        const deletedAmount = this.expenses[index].amount;
        this.expenses.splice(index, 1);
        this.total -= deletedAmount;
        this.renderExpenses();
        this.updateTotal();
    }
}

customElements.define('expense-calculator', ExpenseCalculator);