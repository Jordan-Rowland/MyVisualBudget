let budget = {
	expenses: {},

	addEditExpense: function() {
		let check = document.querySelector('#check');
		let expenseName = document.querySelector('#expenseName');
		let expenseCost = document.querySelector('#expenseCost');

		let monthly = document.querySelector('#monthly');
		let biWeekly = document.querySelector('#bi-weekly');
		let weekly = document.querySelector('#weekly');

		if (expenseCost.value.startsWith('.')) {
      this.expenses[expenseName.value] = Number(check.value * expenseCost.value);
		} else {
			this.expenses[expenseName.value] = Number(expenseCost.value);
		}
	},

	deleteExpense: function() {
		let expenseName = document.querySelector('#expenseName');
		delete this.expenses[expenseName.value];

		console.log(this.expenses);
	},
};

let handlers = {
	addEditExpense: function() {
		let addExpenseInput = document.querySelector('#expenseName');
		let addCostInput = document.querySelector('#expenseCost');
		budget.addEditExpense(addExpenseInput.value);
		addExpenseInput.value = '';
		addCostInput.value = '';
		addExpenseInput.focus();
		view.displayBudget();
	},

	deleteExpense: function() {
		let addExpenseInput = document.querySelector('#expenseName');
		let addCostInput = document.querySelector('#expenseCost');
		budget.deleteExpense();
		addExpenseInput.value = '';
		addCostInput.value = '';
		addExpenseInput.focus();
		view.displayBudget();
	},
	visualizeBudget: function() {
		let check = document.querySelector('#check');
		let addExpenseInput = document.querySelector('#expenseName');
		let totalCost = 0;

		for (let i = 0; i < Object.entries(budget.expenses).length; i++) {
			totalCost += Number(Object.entries(budget.expenses)[i][1]);
		}

		addExpenseInput.focus();
		let monthly = document.querySelector('#monthly');
		let biWeekly = document.querySelector('#bi-weekly');
		let weekly = document.querySelector('#weekly');
		view.displayBudget();
	},
};

view = {
	displayBudget: function() {
		let expensesUl = document.querySelector('ul');
		expensesUl.innerHTML = '';
		let addCostInput = document.querySelector('#expenseCost');
		let check = document.querySelector('#check');
		let totalCost = 0;

		let checkViz = document.createElement('li');
		checkViz.textContent = `Check: ${check.value}`;
		expensesUl.appendChild(checkViz);

		Object.entries(budget.expenses).forEach(function(expense, i) {
			let expenseLi = document.createElement('li');

			expenseLi.id = i;

			let monthly = document.querySelector('#monthly');
			let biWeekly = document.querySelector('#bi-weekly');
			let weekly = document.querySelector('#weekly');

			if (biWeekly.checked) {
				expenseLi.textContent = `${expense[0]}: ${expense[1] / 2}`;
			} else if (weekly.checked) {
				expenseLi.textContent = `${expense[0]}: ${expense[1] / 4}`;
			} else {
				expenseLi.textContent = `${expense[0]}: ${expense[1]}`;
			}

			expensesUl.appendChild(expenseLi);
		}, this);

		let monthly = document.querySelector('#monthly');
		let biWeekly = document.querySelector('#bi-weekly');
		let weekly = document.querySelector('#weekly');

		for (let i = 0; i < Object.entries(budget.expenses).length; i++) {
			if (biWeekly.checked) {
				totalCost += Number(Object.entries(budget.expenses)[i][1] / 2);
			} else if (weekly.checked) {
				totalCost += Number(Object.entries(budget.expenses)[i][1] / 4);
			} else {
				totalCost += Number(Object.entries(budget.expenses)[i][1]);
			}
		}

		let totalViz = document.createElement('li');
		totalViz.textContent = `Total Cost: ${totalCost}`;
		expensesUl.appendChild(totalViz);
		let leftOver = document.createElement('li');
		leftOver.textContent = `Left Over: ${check.value - totalCost}`;
		expensesUl.appendChild(leftOver);
	},
};

let check = document.querySelector('#check');
check.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {
		handlers.visualizeBudget();
	}
});

let expenseCost = document.querySelector('#expenseCost');
expenseCost.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {
		handlers.addEditExpense();
	}
});

let expenseName = document.querySelector('#expenseName');
expenseName.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {
		expenseCost.focus();
	}
});