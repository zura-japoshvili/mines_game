let minesField = document.querySelector('.mines-field'),
    betBtn = document.querySelector('.bet-btn');



let minesFieldBlocker;
betBtn.addEventListener('click', function(){
    minesFieldBlocker.style.display = 'none';
});

const MAX_MINES = 25;
let gameActive = true,
    numberOfMines = 5,
    currrentIndex = 1;


let minesPos = [],
    usedMinesIndex = [];





function  generateRadnomMines(arg){
    for(let i = 0;i <arg; i++){
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
    if(minesPos.includes(index)){
        gameActive = false;
        alert('You Loose Game');
        return;
    }else{

    }
}
function clickMinesHandler(clickedEvent){
    
    const clickedMines = clickedEvent.target;
    const clickedMinesIndex = parseInt(clickedMines.getAttribute('minesIndex'));
    
    if(usedMinesIndex[clickedMinesIndex] !== 0 || gameActive !== true){
        return;
    }else{
        usedMinesIndex[clickedMinesIndex] = 1;
        checkMines(clickedMinesIndex);
    }
    
    
}

function generateMineBtns(){
    let content = `<div class="mines-field-blocker"></div>
    <p class="star-progress">Stars opened: <span class="current-index">0</span>/<span class="last-index">${MAX_MINES-numberOfMines}</span></p>
    <p class="next-win-amount">Next tile: <span class="next-amount">${1}</span>$</p>`;
    for(let i = 0;i < MAX_MINES;i++){
        content += `<div class="mines-box" minesIndex="${i}"></div>`;

        usedMinesIndex.push(0);
    }
    minesField.innerHTML = content;
    minesFieldBlocker = document.querySelector('.mines-field-blocker');
    generateRadnomMines(numberOfMines);
}


window.addEventListener('onload', generateMineBtns());

let minesBox = document.querySelectorAll(".mines-box");
minesBox.forEach(minesBox => minesBox.addEventListener('click', clickMinesHandler));