const MAX_MINES = 25;
let gameActive = false,
    betClicked = false,
    isMinesExists = false,
    minesBox;

let minesField = document.querySelector('.mines-field'),
    numberOfMines = document.querySelector('.mines-input-value');

let controlAuto = document.querySelector('.control-auto'),
    controlManual = document.querySelector('.control-manual');

let markedIndex = '';

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
        lossReturn.onclick = function() {onWinPlan('return')}

        lossInc = document.querySelector('.on-loss div .btn-inc');
        lossInc.onclick = function() {onWinPlan('inc')}

        lossDec = document.querySelector('.on-loss div .btn-dec');
        lossDec.onclick = function() {onWinPlan('dec')}


        autoRand = document.querySelector('.auto-rand');
        clearBtn = document.querySelector('.auto-clear');
        startBtn = document.querySelector('.start-btn');
        startBtn.onclick = clickedStart;

        if(!isMinesExists){
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
    generateRandomMines(parseInt(numberOfMines.value));
    if(!markedIndex){
        markedIndex = markedMineIndex;
    }
}

// This function generates mine buttons and also adds zeros to the array ("usedMinesIndex") 
// to indicate that the position is not occupied.
function generateMineBtns(){
    isMinesExists = true;
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
    minesBox.forEach(value => value.addEventListener('click',markedHandler));
    let frontCard = document.querySelectorAll('.card-front');

    frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');
    minesBox.forEach(index => index.disabled = false);
}

function clickedStart(){
    console.log(1111);
} 
function onWinPlan(value){

}
function onLossPlan(value){
    
}