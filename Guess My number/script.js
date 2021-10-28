'use strict';

let number = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

const displayMessage = (message) => document.querySelector('.message').textContent = message;


document.querySelector('.check').addEventListener('click', () => {

    const guess = Number(document.querySelector('.guess').value);

    // no guess
    if (!guess) {
        displayMessage('⛔ No number');

        // player win
    } else if (guess === number) {
        displayMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = number;

        //hihgscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore
        }



        // when guess is wrong
    } else if (guess !== number) {
        if (score > 1) {
            displayMessage(guess > number ? '❌ Too High!' : '❗❗ Too low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥 You lost this game');
            document.querySelector('.score').textContent = 0;
        }
    }
});

const again = document.querySelector('.again');

again.addEventListener('click', () => {
    score = 20;
    number = Math.trunc(Math.random() * 20 + 1);
    document.querySelector('.number').textContent = number;
    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
});