class Expense {
	constructor(name, cost, percentage) {
		this.name = name;
		this.cost = cost;
		this.percentage = percentage;
	}
}

class Store {

  static getExpenses() {
    let expenses;
    if (localStorage.getItem('expenses') === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }
    // console.log(budget.expenses);

    return expenses;
  }

  static displayExpenses() {
  	budget.expenses = []
    const expenses = Store.getExpenses();
    expenses.forEach(function (expense, i, arr) {
      expense = new Expense;
      budget.expenses.push(expenses[i]);
    // console.log(budget.expenses);

      return;

    })
  }

  static addExpense(expense) {
    const expenses = Store.getExpenses();
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // console.log(budget.expenses);

  }

  static removeExpense(name) {
    const expenses = Store.getExpenses();
    expenses.forEach(function (expense, index) {
      if (expense.name === name) {
        expenses.splice(index, 1);
      }
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    Store.displayExpenses
    // console.log(budget.expenses);

  }

}




let check = document.querySelector('#check');
let monthly = document.querySelector('#monthly');
let biWeekly = document.querySelector('#bi-weekly');
let weekly = document.querySelector('#weekly');
let expenseName = document.querySelector('#expenseName');
let expenseCost = document.querySelector('#expenseCost');
let percentage = document.querySelector('#percentage')
let add = document.querySelector('#add');	
let remove = document.querySelector('#remove');	


let budget = {
	expenses: [],

	addEditExpense: function() {
		let expense;

    if (percentage.checked) {
    	expense = new Expense(expenseName.value, Number(expenseCost.value), true)
    }else{
    	expense = new Expense(expenseName.value, Number(expenseCost.value), false)
    }
    expenseName.value = ''
    expenseCost.value = ''
    budget.expenses.push(expense);
    Store.addExpense(expense)
    // console.log(budget.expenses);
    view.displayBudget();
    percentage.checked = false;
		
     },

  deleteExpense: function() {
    let expenseName = document.querySelector('#expenseName');
    for (let i = 0; i < budget.expenses.length; i++) {
   		if (expenseName.value === budget.expenses[i].name){
   			budget.expenses.splice(i, 1);
   			Store.removeExpense(expenseName.value)
   		}
    }
    expenseName.value = '';
    // console.log(budget.expenses);
		view.displayBudget();
  },
};

view = {
  displayBudget: function () {
    let expensesUl = document.querySelector('ul');
    expensesUl.innerHTML = '';
    let addCostInput = document.querySelector('#expenseCost');
    let check = document.querySelector('#check');
    let totalCost = 0;

    let checkViz = document.createElement('li');
    checkViz.textContent = `Check: ${check.value}`;
    expensesUl.appendChild(checkViz);

    Store.displayExpenses();

    budget.expenses.forEach(function (expense, i) {
    	Store.displayExpenses();
      let expenseLi = document.createElement('li');

      expenseLi.id = i;

      if (budget.expenses[i].percentage === true) {
        expenseLi.textContent =
          `${budget.expenses[i].name}: ${Math.floor(Number(budget.expenses[i].cost * check.value  / 100))}`;
        totalCost += (Math.floor(Number(
          `${budget.expenses[i].cost * check.value / 100}`)));
        expensesUl.appendChild(expenseLi);


      } else {
        if (biWeekly.checked) {
          expenseLi.textContent =
            `${budget.expenses[i].name}: ${Number(budget.expenses[i].cost / 2)}`;
          totalCost += (Math.floor(Number(budget.expenses[i].cost / 2)));

        } else if (weekly.checked) {
          expenseLi.textContent =
            `${budget.expenses[i].name}: ${Math.floor(Number(budget.expenses[i].cost / 4))}`;
          totalCost += (Math.floor(Number(budget.expenses[i].cost / 4)));

        } else {
          expenseLi.textContent =
            `${budget.expenses[i].name}: ${Math.floor(Number(budget.expenses[i].cost))}`;
          totalCost += Math.floor(Number(budget.expenses[i].cost));
        }

        expensesUl.appendChild(expenseLi);
      }
    });

    let totalViz = document.createElement('li');
    totalViz.textContent = `Total Cost: ${totalCost}`;
    expensesUl.appendChild(totalViz);
    let leftOver = document.createElement('li');
    leftOver.textContent = `Left Over: ${check.value - totalCost}`;
    expensesUl.appendChild(leftOver);
	

  }
}

view.displayBudget()

document.addEventListener('DOMContentLoaded', Store.displayExpenses);

add.addEventListener('click', budget.addEditExpense);
remove.addEventListener('click', budget.deleteExpense);

biWeekly.addEventListener('click', view.displayBudget)

weekly.addEventListener('click', view.displayBudget)

monthly.addEventListener('click', view.displayBudget)
