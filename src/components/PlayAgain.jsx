import GameState from "./GameState";

function PlayAgain({ gameState, onReset }) {
    if (gameState === GameState.inProgress) {
        return;
    }
    return <button onClick={onReset} className="reset">Reset</button>
}

export default PlayAgain;