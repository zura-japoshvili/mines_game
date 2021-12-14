let amountInput = document.querySelector('.amount-input'),
    minesInput = document.querySelector('.mines-input-value');



let amountMinus = document.querySelector('.amount-minus').addEventListener("click", function(){
    if(parseFloat(amountInput.value) > 0.1){
            amountInput.value = (parseFloat(amountInput.value) - 0.1).toFixed(1);
        }
});
let amountPlus = document.querySelector('.amount-plus').addEventListener("click", function(){
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






let defaultMines = document.querySelectorAll('.default-mines');
defaultMines.forEach(defaultMines => defaultMines.addEventListener('click', (clickedTarget)=>{
    let clickNum = clickedTarget.target;
    minesInput.value = parseInt(clickNum.getAttribute('def_mine'));
}));

let defaultAmount = document.querySelectorAll('.default-num');
defaultAmount.forEach(defaultAmount => defaultAmount.addEventListener('click', (clickedTarget) =>{
    let clickNum = clickedTarget.target;
    amountInput.value = parseInt(clickNum.getAttribute('def_num'));
}))
