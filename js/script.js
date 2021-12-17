import controlContent  from './control.js';

// These variables are used for auto game mode.
let winReturn,
    winInc,
    winDec,
    lossReturn,
    lossInc,
    lossDec,
    autoRand,
    autoClear,
    startBtn;
winReturn = document.querySelector('.on-win div .btn-return'),
winInc = document.querySelector('.on-win div .btn-inc'),
winDec = document.querySelector('.on-win div .btn-dec'),
lossReturn = document.querySelector('.on-loss div .btn-return'),
lossInc = document.querySelector('.on-loss div .btn-inc'),
lossDec = document.querySelector('.on-loss div .btn-dec'),
autoRand = document.querySelector('.auto-rand'),
autoClear = document.querySelector('.auto-clear'),
startBtn = document.querySelector('.start-btn');

let gameMode = 'manual';

let controlInsert = document.querySelector('.control-insert');
// let minesField = document.querySelector('.mines-field'),
//     numberOfMines = document.querySelector('.mines-input-value'),
let controlManual = document.querySelector('.control-manual'),
    controlAuto = document.querySelector('.control-auto');
    

const MAX_MINES = 25;
let gameActive = false,
    betClicked = false,
    minesBox;
// These variables are used for game progress    
let currrentIndex = 0,
    lastIndex,
    starProgress,
    nextWinAmount,
    nextAmount;

// In these arrays we store the positions of clicked buttons and mines
let minesPos = [];
let usedMinesIndex = [];

let markedIndex = '';

window.addEventListener('onload', gameModeFunc());

const flipAudio = new Audio('audio/flip.wav');
const loseAudio = new Audio('audio/lose.wav');
const winAudio = new Audio('audio/win.wav');

// Used to sound the game with each click
function makeSound(audio) {
    audio.currentTime = 0;
    audio.play();
}

// This feature restricts buttons that may interfere with the gameplay
function makeDisabled(){
    if(gameActive === true){
        controlManual.disabled = true;
        controlAuto.disabled = true;

        randomBtn.disabled = false;
        randomBtn.style.cssText = "color: #fff";
        betBtn.textContent = 'CASHOUT';
        betBtn.style.backgroundColor = '#7D7767';
    
        let frontCard = document.querySelectorAll('.card-front');

        frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');
        minesBox.forEach(index => index.disabled = false);
    }else{
        controlManual.disabled = false;
        controlAuto.disabled = false;
    }
}


// // This function adds random numbers to the array("minesPos") used to position the mine
// function  generateRandomMines(value){
//     for(let i = 0;i <value; i++){
//         const random = Math.floor(Math.random() * MAX_MINES);
//         if(minesPos.includes(random)){
//             i--;
//         }
//         else{
//             minesPos.push(random);
//         }
//     }
// }

// // This function is triggered when we press the random button. 
// // Its purpose is to return a digit that is not used for mine positioning
// function randomClick(){
//     let randomPos
//     while(true){     
//         randomPos = Math.floor(Math.random() * MAX_MINES + 1);
//         if(usedMinesIndex[randomPos] == 0){
//             break;    
//         }
//     }
//     return randomPos;
// }
// This function checks whether there is a mine on the clicked "minesBox"
// It also adds pictures, rotates the container and makes a sound, 
// it all depends on whether the given position is mine.




// This function generates mine buttons and also adds zeros to the array ("usedMinesIndex") 
// to indicate that the position is not occupied.
// function generateMineBtns(){
//     let content = `
//     <p class="star-progress">Stars opened: <span class="current-index">0</span>/<span class="last-index">${MAX_MINES-numberOfMines}</span></p>
//     <p class="next-win-amount">Next tile: <span class="next-amount">${1}</span>$</p>`;
//     for(let i = 0;i < MAX_MINES;i++){
//     content += `<button  minesIndex="${i}" class="mines-box" disabled>
//                     <div class="card-front">
//                         <img src="images/dots.svg"> 
//                     </div>
//                     <div class="card-back">
//                         <img> 
//                     </div>
//                 </button>`;

//         usedMinesIndex.push(0);
//     }
    
//     // 
//     minesField.innerHTML = content;
//     minesBox = document.querySelectorAll(".mines-box");
//     minesBox.forEach(value => value.addEventListener('click', () =>{
//         if(gameMode === 'manual'){
//             clickMinesHandler(value);
//         }else{
//             ifMineBoxMarked(value);
//         }
//     }));
// }



function ifMineBoxMarked(clickedMines){
    const markedMine = clickedMines.currentTag;

    // const clickedMinesIndex = parseInt(clickedMines.getAttribute('minesIndex'));
    generateRandomMines(parseInt(numberOfMines.value));
    console.log(11212);
    if(!markedIndex){
        console.log(clickedMines)
        markedMine.style.backgroundColor = "green";
        
    }else{
        return;
    }

}

// This function selects which game mode to run (depending on the "gameMode" variable)
function gameModeFunc(){
    if(gameMode === 'manual'){
        controlInsert.innerHTML = controlContent.manualContent;
        // generateMineBtns()
    }else{
        controlInsert.innerHTML = controlContent.autoContent;

        // generateMineBtns()
        // let frontCard = document.querySelectorAll('.card-front');

        // frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');
        // minesBox.forEach(index => index.disabled = false);

    }
}

controlManual.addEventListener('click', () => {
    controlManual.classList.add('mode-active');
    controlAuto.classList.remove('mode-active');
    gameMode = 'manual'; 
    gameModeFunc()
});
controlAuto.addEventListener('click', () => {
    controlManual.classList.remove('mode-active');
    controlAuto.classList.add('mode-active');
    gameMode = 'auto';
    gameModeFunc();
});


