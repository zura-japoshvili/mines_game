let minesField = document.querySelector('.mines-field'),
    betBtn = document.querySelector('.bet-btn'),
    numberOfMines = document.querySelector('.mines-input-value'),
    randomBtn = document.querySelector('.random-btn');

const MAX_MINES = 25;
let gameActive = true,
    betClicked = false,
    currrentIndex = 0,
    lastIndex,
    minesFieldBlocker,
    starProgress,
    nextWinAmount,
    nextAmount;

let minesPos = [];
let usedMinesIndex = [];

const flipAudio = new Audio('audio/flip.wav');
const loseAudio = new Audio('audio/lose.wav');
const winAudio = new Audio('audio/win.wav');

function makeSound(audio) {
    audio.currentTime = 0;
    audio.play();
}


function restartGame(){
    randomBtn.disabled = true;
    minesPos = [];
    usedMinesIndex = [];
    gameActive = true;
    betClicked = false;
    generateMineBtns();
}

function  generateRandomMines(value){
    for(let i = 0;i <value; i++){
        const random = Math.floor(Math.random() * MAX_MINES);
        if(minesPos.includes(random)){
            i--;
        }
        else{
            minesPos.push(random);
        }
    }
}
function checkMines(index){
    let cardImg = document.querySelectorAll('.card-back img');
    let cardBack = document.querySelectorAll('.card-back');

    minesBox[index].style.transform = "rotateY(180deg)";

    if(minesPos.includes(index)){
        makeSound(loseAudio);
        gameActive = false;
        cardBack[index].style.cssText = 'background-color: #E27C9E;';
        cardImg[index].src = 'images/boom.svg';
        randomBtn.style.cssText = "color: #7FAFD9";
        betBtn.textContent = 'BET';
        betBtn.style.backgroundColor = '#7AC80D';

        for(let i = 0;i<minesBox.length; i++){
            if(usedMinesIndex[i] === 0){
                minesBox[i].style.transform = "rotateY(180deg)";
                if(minesPos.includes(i)){
                    cardBack[i].style.cssText = 'background-color: #fff;';
                    cardImg[i].src = 'images/mine.svg'
                }else{
                    cardBack[i].style.cssText = 'background-color: #F69F11;';
                    cardImg[i].src = 'images/star.svg';
                }
            }
        }
        return;
    }else{
        makeSound(flipAudio);
        cardBack[index].style.cssText = 'background-color: #F69F11;';
        cardImg[index].src = 'images/star.svg';  
    }
}
function clickMinesHandler(clickedEvent){
    let currentAmount = parseFloat(document.querySelector(".amount-input").value);
    betBtn.style.backgroundColor = '#FA911B';
    const clickedMines = clickedEvent.currentTarget;
    const clickedMinesIndex = parseInt(clickedMines.getAttribute('minesIndex'));

    if(usedMinesIndex[clickedMinesIndex] !== 0 || gameActive !== true){
        console.log(1);
        return;
    }else{
        betClicked = true;
        betBtn.textContent = `CASHOUT ${currentAmount}$`;
        usedMinesIndex[clickedMinesIndex] = 1;
        checkMines(clickedMinesIndex);
    }
    
    
}

function generateMineBtns(){
    let content = `
    <p class="star-progress">Stars opened: <span class="current-index">0</span>/<span class="last-index">${MAX_MINES-numberOfMines}</span></p>
    <p class="next-win-amount">Next tile: <span class="next-amount">${1}</span>$</p>`;
    for(let i = 0;i < MAX_MINES;i++){
    content += `<button  minesIndex="${i}" class="mines-box" disabled>
                    <div class="card-front">
                        <img src="images/dots.svg"> 
                    </div>
                    <div class="card-back">
                        <img> 
                    </div>
                </button>`;

        usedMinesIndex.push(0);
    }
    
    minesField.innerHTML = content;
    minesFieldBlocker = document.querySelector('.mines-field-blocker');
    minesBox = document.querySelectorAll(".mines-box");
    minesBox.forEach(value => value.addEventListener('click', clickMinesHandler));
}

betBtn.addEventListener('click', () =>{
    if(!betClicked){
        makeSound(flipAudio);
        randomBtn.disabled = false;
        randomBtn.style.cssText = "color: #fff";
        betBtn.textContent = 'CASHOUT';
        betBtn.style.backgroundColor = '#7D7767';
    
        let frontCard = document.querySelectorAll('.card-front');
        frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');
        for(let index in minesBox){
            minesBox[index].disabled = false;
        }
        generateRandomMines(parseInt(numberOfMines.value));
    }else{
        if(!gameActive){
            restartGame();
        }else{
            makeSound(winAudio);
            randomBtn.style.cssText = "color: #7FAFD9";
            betBtn.textContent = 'BET';
            betBtn.style.backgroundColor = '#7AC80D';

            restartGame();
        }
    }

});

window.addEventListener('onload', generateMineBtns());

