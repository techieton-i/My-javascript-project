'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);


let scores, currentScore, activePlayer, playing;
// starting condition
const start = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    playing = true;
    // starting condition
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
};

start();



const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');

};

// roll dice

btnRoll.addEventListener('click', function () {
    if (playing) {
        // random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // check if dice = 1 if true switch player
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore;
        } else {
            // switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active ')
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', start);
