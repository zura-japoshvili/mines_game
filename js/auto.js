const MAX_MINES = 25;
let gameActive = false,
    minesBox;

let minesField = document.querySelector('.mines-field'),
    numberOfMines = parseInt(document.querySelector('.mines-input-value').value);

let controlAuto = document.querySelector('.control-auto'),
    controlManual = document.querySelector('.control-manual');

let markedIndex = [];

let minesPos = [];

// These variables are used for auto game mode.
let winReturn,
    winInc,
    winDec,
    lossReturn,
    lossInc,
    lossDec,
    autoRand,
    clearBtn,
    startBtn;

let onWinVar = 'return';
let onLossVar = 'return';

setInterval((() =>{
    if(controlAuto.classList.contains('mode-active')){
        // These variables are used for auto game mode.
        winReturn = document.querySelector('.on-win div .btn-return');
        winReturn.onclick = function() {onWinPlan('return')}

        winInc = document.querySelector('.on-win div .btn-inc');
        winInc.onclick = function() {onWinPlan('inc')}

        winDec = document.querySelector('.on-win div .btn-dec');
        winDec.onclick = function() {onWinPlan('dec')}


        lossReturn = document.querySelector('.on-loss div .btn-return');
        lossReturn.onclick = function() {onLossPlan('return')}

        lossInc = document.querySelector('.on-loss div .btn-inc');
        lossInc.onclick = function() {onLossPlan('inc')}

        lossDec = document.querySelector('.on-loss div .btn-dec');
        lossDec.onclick = function() {onLossPlan('dec')}


        autoRand = document.querySelector('.auto-rand');
        clearBtn = document.querySelector('.auto-clear');
        clearBtn.onclick = function () {
            markedIndex = [];
            let cardFront = document.querySelectorAll('.card-front');
            cardFront.forEach(value => value.style.cssText = "background-color: #fff;");
        };
        startBtn = document.querySelector('.start-btn');
        startBtn.onclick = function() {
            if(gameActive === true){
                gameActive = false;
            }else{
                gameActive = true;
            }
            clickedStart()
        };

        if(minesField.innerHTML == ''){
            markedIndex = [];
            generateMineBtns();
        }
    }
}),500)

const flipAudio = new Audio('audio/flip.wav');
const loseAudio = new Audio('audio/lose.wav');
const winAudio = new Audio('audio/win.wav');

// Used to sound the game with each click
function makeSound(audio) {
    audio.currentTime = 0;
    audio.play();
}

// This function adds random numbers to the array("minesPos") used to position the mine
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

function markedHandler(clickedEvent){


    const markedMine = clickedEvent.currentTarget;
    const markedMineIndex = parseInt(markedMine.getAttribute('minesIndex'));

    let cardFront = document.querySelectorAll('.card-front');

    if(markedIndex.includes(markedMineIndex)){
        let indexOf = markedIndex.indexOf(markedMineIndex);
        markedIndex.splice(indexOf, 1);
        cardFront[markedMineIndex].style.cssText = "background-color: #fff;";
    }
    else if(markedIndex.length < (MAX_MINES - numberOfMines)){

        makeSound(flipAudio);
        markedIndex.push(markedMineIndex);
        cardFront[markedMineIndex].style.cssText = "background-color: #3ABF17;";
    }
}

// This function generates mine buttons and also adds zeros to the array ("usedMinesIndex") 
// to indicate that the position is not occupied.
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
    }
    
    // 
    minesField.innerHTML = content;
    minesBox = document.querySelectorAll(".mines-box");

    let frontCard = document.querySelectorAll('.card-front');
    frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');

    minesBox.forEach(value => value.addEventListener('click',markedHandler));
    minesBox.forEach(index => index.disabled = false);
}

function WinOrLoss(value, markedArr){
    let cardFront = document.querySelectorAll('.card-front');
    for(let i in markedArr){
        cardFront[markedArr[i]].style.cssText = "background-color: #3ABF17;";
    }
    if(value === 'win'){
        winAudio.play();
        if(onWinVar === 'return'){
            gameActive = false;
        }
    }else{
        loseAudio.play();
        if(onLossPlan === 'return'){
            gameActive = false;
        }
    }
    setTimeout(() =>{
        clickedStart();
    }, 3000);
}


function clickedStart(){
    minesPos = [];

    if(gameActive === false){
        markedIndex = [];
        startBtn.style.backgroundColor = '#3a9762';
        startBtn.textContent = 'START';
    }
    if(markedIndex.length !== 0){
        gameActive = true;

        generateMineBtns();
        
        let cardImg = document.querySelectorAll('.card-back img');
        let cardBack = document.querySelectorAll('.card-back');
        
        startBtn.style.backgroundColor = '#C70C2A';
        startBtn.textContent = 'STOP';
            for(let i in markedIndex){
                minesBox[markedIndex[i]].style.transform = "rotateY(180deg)";
                if(minesPos.includes(markedIndex[i])){     
                    cardBack[markedIndex[i]].style.cssText = 'background-color: #E27C9E;';
                    cardImg[markedIndex[i]].src = 'images/boom.svg';
                    
                }else{
                    cardBack[markedIndex[i]].style.cssText = 'background-color: #F69F11;';
                    cardImg[markedIndex[i]].src = 'images/star.svg';
                    if(minesPos.includes(markedIndex)){
                        WinOrLoss('loss', markedIndex);
                    }else{
                        WinOrLoss('win', markedIndex);
                    }
                }
            }
    }
}
function onWinPlan(value){
    onWinVar = value;
    winDec.classList.remove('btn-marked');
    winInc.classList.remove('btn-marked');
    winReturn.classList.remove('btn-marked');

    if(value == 'inc'){
        winInc.classList.add('btn-marked');
    }
    if(value == 'dec'){
        winDec.classList.add('btn-marked');
    }
    if(value == 'return'){
        winReturn.classList.add('btn-marked');
    }
}
function onLossPlan(value){
    onLossVar = value;
    onWinVar = value;
    lossDec.classList.remove('btn-marked');
    lossInc.classList.remove('btn-marked');
    lossReturn.classList.remove('btn-marked');

    if(value == 'inc'){
        lossInc.classList.add('btn-marked');
    }
    if(value == 'dec'){
        lossDec.classList.add('btn-marked');
    }
    if(value == 'return'){
        lossReturn.classList.add('btn-marked');
    }
}