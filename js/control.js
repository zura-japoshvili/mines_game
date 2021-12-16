
const autoContent = `<div class="control-switch">
<button class="control-manual ">Manual</button>
<button class="control-auto mode-active">Auto</button>
</div>
<div class="amount-content">
<div class="amount-input-box">
    <label>Bet amount $</label>
    <div class="amount-field">
        <i class="fas fa-minus-circle minus-icon amount-minus"></i>
        <input type="number" value="1" class="amount-input">
        <i class="fas fa-plus-circle plus-icon amount-plus"></i>
    </div>
</div>
<div class="default-amount">
    <p class="default-num" def_num="1">1$</p>
    <p class="default-num" def_num="3">3$</p>
    <p class="default-num" def_num="5">5$</p>
    <p class="default-num" def_num="10">10$</p>
</div>
</div>
<div class="mines-control">
<h6>Number of mines(1-20)</h6>
<p class="default-mines" def_mine="1">1</p>
<p class="default-mines" def_mine="3">3</p>
<p class="default-mines" def_mine="4">4</p>
<div class="mines-input">
    <i class="fas fa-minus-circle minus-icon mines-minus"></i>
    <input type="number" class="mines-input-value" value="3">
    <i class="fas fa-plus-circle plus-icon mines-plus"></i> 
</div>
<p class="default-mines" def_mine="7">7</p>
<p class="default-mines" def_mine="9">9</p>
<p class="default-mines" def_mine="15">15</p>
</div>
<div class="auto-cont on-win">
<h4>On Win</h4>
<div>
    <button class="btn-return">
        <p>Return to base</p>
    </button>
    <button class="btn-inc">
        <label>Increase</label><br>
        <input type="text" value="100">
        <label>%</label>
    </button>
    <button class="btn-dec">
        <label>Decrease</label><br>
        <input type="text" value="50">
        <label>%</label>
    </button>
</div>
</div>
<div class="auto-cont on-loss">
<h4>On Loss</h4>
<div>
    <button class="btn-return">
        <p>Return to base</p>
    </button>
    <button class="btn-inc">
        <label>Increase</label><br>
        <input type="text" value="100">
        <label>%</label>
    </button>
    <button class="btn-dec">
        <label>Decrease</label><br>
        <input type="text" value="50">
        <label>%</label>
    </button>
</div>
</div>
<h4>Select tiles and press Start</h4>
<div class="buttons-duo">
<button class="auto-rand">RANDOM</button>
<button class="auto-clear">CLEAR</button>
</div>
<button class="start-btn">START</button>`;

const manualContent = `<div class="control-switch">
<button class="control-manual mode-active ">Manual</button>
<button class="control-auto">Auto</button>
</div>
<div class="amount-content">
<div class="amount-input-box">
    <label>Bet amount $</label>
    <div class="amount-field">
        <i class="fas fa-minus-circle minus-icon amount-minus"></i>
        <input type="number" value="1" class="amount-input">
        <i class="fas fa-plus-circle plus-icon amount-plus"></i>
    </div>
</div>
<div class="default-amount">
    <p class="default-num" def_num="1">1$</p>
    <p class="default-num" def_num="3">3$</p>
    <p class="default-num" def_num="5">5$</p>
    <p class="default-num" def_num="10">10$</p>
</div>
</div>
<div class="mines-control">
<h6>Number of mines(1-20)</h6>
<p class="default-mines" def_mine="1">1</p>
<p class="default-mines" def_mine="3">3</p>
<p class="default-mines" def_mine="4">4</p>
<div class="mines-input">
    <i class="fas fa-minus-circle minus-icon mines-minus"></i>
    <input type="number" class="mines-input-value" value="3">
    <i class="fas fa-plus-circle plus-icon mines-plus"></i> 
</div>
<p class="default-mines" def_mine="7">7</p>
<p class="default-mines" def_mine="9">9</p>
<p class="default-mines" def_mine="15">15</p>
</div>
<button class="bet-btn">BET</button>
<button class="random-btn" disabled>OPEN RANDOMLY</button>`;

export default { autoContent, manualContent };
