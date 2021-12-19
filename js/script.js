import controlContent  from './control.js';

let gameMode = 'manual';

let controlInsert = document.querySelector('.control-insert');
let minesField = document.querySelector('.mines-field');
    minesField.innerHTML = '';

let controlManual = document.querySelector('.control-manual'),
    controlAuto = document.querySelector('.control-auto');
    



window.addEventListener('onload', gameModeFunc());

// This function selects which game mode to run (depending on the "gameMode" variable)
function gameModeFunc(){
    if(gameMode === 'manual'){
        controlInsert.innerHTML = controlContent.manualContent;
    }else{
        controlInsert.innerHTML = controlContent.autoContent;
    }
}

controlManual.addEventListener('click', () => {
    controlManual.classList.add('mode-active');
    controlAuto.classList.remove('mode-active');
    minesField.innerHTML = '';
    gameMode = 'manual'; 
    gameModeFunc()
});
controlAuto.addEventListener('click', () => {
    controlManual.classList.remove('mode-active');
    controlAuto.classList.add('mode-active');
    minesField.innerHTML = '';
    gameMode = 'auto';
    gameModeFunc();
});


