import controlContent  from './control.js';




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

window.addEventListener('onload', gameModeFunc());



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


