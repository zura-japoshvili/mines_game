let minesField = document.querySelector('.mines-field'),
    numberOfMines = document.querySelector('.mines-input-value'),
    inputAmount,
    controlAuto = document.querySelector('.control-auto'),
    controlManual = document.querySelector('.control-manual');

// These variables are used for manual game mode.
let betBtn,
    randomBtn;

const MAX_MINES = 25;
let gameActive = false,
    betClicked = false,
    minesBox;

setInterval((() =>{
    if(controlManual.classList.contains('mode-active')){
        betBtn = document.querySelector('.bet-btn');
        betBtn.addEventListener('click', betFunc);
        randomBtn = document.querySelector('.random-btn');
        randomBtn.addEventListener('click', randomClickFunc);
        if(minesField.innerHTML == ''){
            generateMineBtns();
        }
    }
}),500)


// These variables are used for game progress    
let currrentIndex,
    lastIndex,
    starProgress,
    nextWinAmount,
    nextAmount;
let indexCounter = 0;
let amountValue = 0;

// In these arrays we store the positions of clicked buttons and mines
let minesPos = [];
let usedMinesIndex = []

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

function restartGame(){
    indexCounter = 0
    minesPos = [];
    usedMinesIndex = [];
    controlManual.disabled = false;
    controlAuto.disabled = false;
    betClicked = false;
    betBtn.textContent = 'BET';
    betBtn.style.backgroundColor = '#7AC80D';
    generateMineBtns();
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

// This function is triggered when we press the random button. 
// Its purpose is to return a digit that is not used for mine positioning
function randomClick(){
    let randomPos
    while(true){     
        randomPos = Math.floor(Math.random() * MAX_MINES + 1);
        if(usedMinesIndex[randomPos] == 0){
            break;    
        }
    }
    return randomPos;
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

        usedMinesIndex.push(0);
    }
    // 
    minesField.innerHTML = content;

    starProgress = document.querySelector('.star-progress');
    nextWinAmount = document.querySelector('.next-win-amount');
    currrentIndex = document.querySelector('.current-index');
    lastIndex = document.querySelector('.last-index');
    nextAmount = document.querySelector('.next-amount');



    minesBox = document.querySelectorAll(".mines-box");
    minesBox.forEach(value => value.addEventListener('click', clickMinesHandler));
}

function checkProgress(){
    indexCounter ++;

    starProgress.style.display = 'block';
    nextWinAmount.style.display = 'block';

    currrentIndex.textContent = indexCounter;
    lastIndex.textContent = MAX_MINES - parseInt(numberOfMines.value);
    nextAmount.textContent = `${(amountValue += (inputAmount * (parseInt(numberOfMines.value) / 100))).toFixed(2)}`;
    makeSound(flipAudio);
}

// This function checks whether there is a mine on the clicked "minesBox"
// It also adds pictures, rotates the container and makes a sound, 
// it all depends on whether the given position is mine.
function checkMines(index){
    betBtn.style.backgroundColor = '#FA911B';
    betBtn.textContent = `CASHOUT ${amountValue.toFixed(2)}$`;
    betClicked = true;

    let cardImg = document.querySelectorAll('.card-back img');
    let cardBack = document.querySelectorAll('.card-back');
    
    console.log(index);
    minesBox[index].style.transform = "rotateY(180deg)";

    if(minesPos.includes(index)){
        makeSound(loseAudio);

        cardBack[index].style.cssText = 'background-color: #E27C9E;';
        cardImg[index].src = 'images/boom.svg';

        gameActive = false;
        betClicked = true;
        randomBtn.disabled = true;

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
        cardBack[index].style.cssText = 'background-color: #F69F11;';
        cardImg[index].src = 'images/star.svg';  
        checkProgress();
    }
}

function clickMinesHandler(clickedEvent){
    betBtn.style.backgroundColor = '#FA911B';
    const clickedMine = clickedEvent.currentTarget; 
    const clickedMinesIndex = parseInt(clickedMine.getAttribute('minesIndex'));

    if(usedMinesIndex[clickedMinesIndex] !== 0 || gameActive !== true){
        return;
    }else{
        usedMinesIndex[clickedMinesIndex] = 1;
        checkMines(clickedMinesIndex);
    }  
}

function betFunc (){
    if(!betClicked){
        amountValue = inputAmount = parseFloat(document.querySelector('.amount-input').value);
        makeSound(flipAudio);
        gameActive = true;

        makeDisabled();
        generateRandomMines(parseInt(numberOfMines.value));

    }else{
        if(!gameActive){
            makeDisabled();
            restartGame();
        }else{
            makeSound(winAudio);
            randomBtn.style.cssText = "color: #7FAFD9";
            betBtn.textContent = 'BET';
            betBtn.style.backgroundColor = '#7AC80D';

            makeDisabled();
            restartGame();
        }
    }

};

function randomClickFunc (){
    makeSound(flipAudio);

    let randomNum = randomClick();
    usedMinesIndex[randomNum] = 1;

    checkMines(randomNum);
}