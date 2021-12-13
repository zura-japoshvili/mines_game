const minesField = document.querySelector('.mines-field');

const MAX_MINES = 25;







function generateMineBtns(){
    let content = '';
    for(let i = 0;i < MAX_MINES;i++){
        content += `<div class="bomb-box" minesIndex="${i}"></div>`;
    }
    minesField.innerHTML = content;
}

window.addEventListener('onload', generateMineBtns());

