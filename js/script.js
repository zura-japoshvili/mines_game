let minesField = document.querySelector('.mines-field'),
    betBtn = document.querySelector('.bet-btn'),
    numberOfMines = minesInput = document.querySelector('.mines-input-value');

const MAX_MINES = 25;
let gameActive = true,
    currrentIndex = 0,
    lastIndex,
    minesFieldBlocker,
    starProgress,
    nextWinAmount,
    nextAmount;

let minesPos = [];
let usedMinesIndex = [];



function  generateRandomMines(){
    numberOfMines = parseInt(numberOfMines.value);

    for(let i = 0;i <numberOfMines; i++){
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
        gameActive = false;
        cardBack[index].style.cssText = 'background-color: #E27C9E;';
        cardImg[index].src = 'images/boom.svg';
        console.log(usedMinesIndex);
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
        cardBack[index].style.cssText = 'background-color: #F69F11;';
        cardImg[index].src = 'images/star.svg';  
    }
}
function clickMinesHandler(clickedEvent){
    const clickedMines = clickedEvent.currentTarget;
    const clickedMinesIndex = parseInt(clickedMines.getAttribute('minesIndex'));

    if(usedMinesIndex[clickedMinesIndex] !== 0 || gameActive !== true){
        return;
    }else{
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
}

betBtn.addEventListener('click', () =>{
    let frontCard = document.querySelectorAll('.card-front');
    frontCard.forEach(index => index.style.cssText = 'background-color: #fff;');

    for(let index in minesBox){
        minesBox[index].disabled = false;
    }
    generateRandomMines();
});

window.addEventListener('onload', generateMineBtns());

let minesBox = document.querySelectorAll(".mines-box");
minesBox.forEach(minesBox => minesBox.addEventListener('click', clickMinesHandler));