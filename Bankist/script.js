'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};

const accounts = [account1, account2, account3, account4];
// let currentAcc;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i +
      1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};

// calcPrintBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);

  // display balance
  calcPrintBalance(acc);

  // display summry
  calcDisplaySummary(acc);
};

// calcDisplaySummary(account1.movements);

//LOGIN EVENTS

let currentAcc;

btnLogin.addEventListener('click', function (e) {
  //prevent default
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    //  display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAcc.balance >= amount &&
    receiverAcc?.username !== currentAcc.username
  ) {
    //doing the transfer
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAcc);
  }
  inputTransferTo.value = inputTransferAmount.value = '';

  // receiverAcc.push(amount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some(mov => mov > amount * 0.1)) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAcc.username
    );
    accounts.splice(index, 1);

    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
  console.log(sorted);
});
// to sort

const owners = ['jonas', 'zach', 'adam', 'martha'];
console.log(owners.sort());
console.log(owners);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return 1
//     if (b > a) return -1
//   })
console.log(movements.sort((a, b) => a - b)); /////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// arr.splice(2, 4);
// console.log(arr);

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const newJulia = dogsJulia.slice(1, -2);
//   console.log(newJulia);
//   const totalDogs = [...newJulia, ...dogsKate];

//   totalDogs.forEach(function (age, i) {
//     const dog = age >= 3 ? `Dog number ${i + 1} is an adult` : `Dog number ${i + 1} is still a puppy `;
//     console.log(dog);
//   });
// };

// checkDogs(Julia, Kate);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const eurToUsd = 1.1;
// const movementUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementUSD);

// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balances = movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0);
// console.log(balances);

// MAXUMUM
// const maxNum = movements.reduce((acc,cur) => acc > cur ? acc:cur);
// console.log(maxNum);

const z = Array.from({ length: 7 }, (cur, i) => {
  return i + 1;
});
console.log(z);
