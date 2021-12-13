let minesField = document.querySelector('.mines-field'),
    betBtn = document.querySelector('.bet-btn'),
    amountInput = document.querySelector('.amount-input'),
    minesInput = document.querySelector('.mines-input-value');


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


let amountMinus = document.querySelector('.amount-minus');
let amountPlus = document.querySelector('.amount-plus');
amountMinus.addEventListener("click", function(){
    if(parseFloat(amountInput.value) > 0.1){
        amountInput.value = (parseFloat(amountInput.value) - 0.1).toFixed(1);
    }
});
amountPlus.addEventListener("click", function(){
    if(parseFloat(amountInput.value) < 100){
        amountInput.value = (parseFloat(amountInput.value) + 0.1).toFixed(1);
    }
});
amountInput.onkeyup = () => {
    if(parseFloat(amountInput.value) < 0.1){
        amountInput.value = 0.1;
    }
    if(parseFloat(amountInput.value) > 100){
        amountInput.value = 100;
    }
}

let minesMinus = document.querySelector('.mines-minus').addEventListener('click', () =>{
    if(parseInt(minesInput.value)  > 1){
        minesInput.value = parseInt(minesInput.value) -1;
    }
});
let minesPlus = document.querySelector('.mines-plus').addEventListener('click', () =>{
    if(parseInt(minesInput.value) < 20){
        minesInput.value = parseInt(minesInput.value) +1;
    }
});
minesInput.onkeyup = () =>{
    if(parseInt(minesInput.value) < 1){
        minesInput.value = 1;
    }
    if(parseInt(minesInput.value) > 20){
        minesInput.value = 20;
    }
    else{
        minesInput.value = parseInt(Math.round(minesInput.value));
    }   
}


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