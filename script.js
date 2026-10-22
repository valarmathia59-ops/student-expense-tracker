
const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(
    localStorage.getItem("expenses") || "[]"
);

function displayExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function(expense, index) {
        total += expense.amount;

        const li = document.createElement("li");
        const details = document.createElement("span");

        details.textContent =
            `${expense.description} - ₹${expense.amount.toFixed(2)} | ` +
            `${expense.category} | ${expense.date}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginTop = "8px";
        deleteButton.style.background = "#dc2626";

        deleteButton.addEventListener("click", function() {
            expenses.splice(index, 1);
            saveExpenses();
            displayExpenses();
        });

        li.appendChild(details);
        li.appendChild(document.createElement("br"));
        li.appendChild(deleteButton);
        expenseList.appendChild(li);
    });

    totalDisplay.textContent = total.toFixed(2);
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newExpense = {
        description: description.value.trim(),
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    if (
        !newExpense.description ||
        !Number.isFinite(newExpense.amount) ||
        newExpense.amount <= 0 ||
        !newExpense.category ||
        !newExpense.date
    ) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push(newExpense);
    saveExpenses();
    displayExpenses();

    form.reset();
});

displayExpenses();
