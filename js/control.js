
const autoContent = `
<div class="auto-cont on-win">
<h4>On Win</h4>
<div>
    <button class="btn-return btn-marked">
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
    <button class="btn-return btn-marked">
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
<button class="auto-clear" disabled>CLEAR</button>
</div>
<button class="start-btn">START</button>`;

const manualContent = `
<button class="bet-btn">BET</button>
<button class="random-btn" disabled>OPEN RANDOMLY</button>`;

export default { autoContent, manualContent };
