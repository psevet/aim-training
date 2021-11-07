const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeBtn = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const restartBtn = document.querySelector('#restart-button')
const colors = ['green', 'blue', '#a82eff', '#145DA0', '#62f46b', '#62f4e5', '#2E8BC0', '#ff852e']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
})

timeBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        screens[1].classList.add('up');
        time = parseInt(e.target.getAttribute('data-time'));
        startGame();
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    } else {
        if (score > 0) {
         score--;
        }
    }
})

restartBtn.addEventListener('click', () => {
    document.location.reload();
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle()
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(val) {
    timeEl.innerHTML = `00:${val}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`;
    restartBtn.classList.remove('hide');
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width- size);
    const y = getRandomNumber(0, height-size);

    circle.classList.add('circle');
    circle.style.background = `${getRandomColor()}`
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`
    board.append(circle);
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

//cheat
document.addEventListener('keydown', (el) => {
    if (el.key === "w") {
        function kill() {
            const circle = document.querySelector('.circle');
    
            if(circle) {
                circle.click();
            }
        }
        setInterval(kill, 75);
    }
})