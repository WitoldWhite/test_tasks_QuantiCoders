// noinspection JSAnnotator
function checkArguments(arguments) {
  [...arguments].forEach((value) => {
    if (!Number.isInteger(value)) {
      alert("Wrong input");
      throw new Error("Wrong input parameters. Please check your input.");
    }
  });
}

// Task 1
function countNumberOfVariousGifts(a, b, c, weight) {
  checkArguments(arguments);
  let num = 0; //gift combinations
  //Sorting each gift type to get maximum count of gifts
  for (let i = 0; i <= weight / a; i++) {
    for (let k = 0; k <= weight / b; k++) {
      for (let j = 0; j <= weight / c; j++) {
        if (i * a + k * b + j * c == weight) {
          num++;
        }
      }
    }
  }
  return num;
}

// Task2
function getTimeForCopying(N, x, y) {
  checkArguments(arguments);
  let time = 0;

  if (N <= 0) {
    return time;
  } else if (N > 1) {
    time = Math.ceil((N - 1) / (1 / x + 1 / y)); // calculating time for N-1 copies
  }
  time += x < y ? x : y; //Getting the time for the last copy
  return time;
}

// Task 3
const { readFileSync } = require("fs");
const employees = JSON.parse(readFileSync("./data/employees.json"));
const recipes = JSON.parse(readFileSync("./data/recipes.json"));
const prices = JSON.parse(readFileSync("./data/prices.json"));

function selectEmployees(budget) {
  const addKeyAndValueToObj = (key, value, object) => ({
    ...object,
    [key]: value,
  });

  // getting the price of drink
  const getDrinkPrice = (drink) =>
    Object.entries(recipes[drink])
      .map((ingredient) => prices[ingredient[0]] * ingredient[1])
      .reduce((a, b) => a + b, 0);

  // getting total price of array of drink
  const getTotalPrice = (drinks) =>
    drinks.map((drink) => getDrinkPrice(drink)).reduce((a, b) => a + b);

  // budget reduction with each participant
  const reduceBudget = (cost) => {
    return (budget -= cost);
  };

  // check budget for next candidate
  const checkBudget = (candidate) => {
    if (budget >= candidate.cost) {
      reduceBudget(candidate.cost);
      return true;
    }
    return false;
  };
  return employees
    .map((employee) => addKeyAndValueToObj("cost", getTotalPrice(employee.drinks), employee))
    .sort((a, b) => a.cost - b.cost)
    .filter((candidate) => checkBudget(candidate))
    .sort((a, b) => a.id - b.id);
}

console.log(countNumberOfVariousGifts(10, 25, 15, 40));

console.log(getTimeForCopying(4, 1, 1));
console.log(getTimeForCopying(5, 1, 2));

console.log(selectEmployees(0.25));
console.log(selectEmployees(0.1));
