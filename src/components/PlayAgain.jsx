import GameState from "./GameState";

function PlayAgain({ gameState, onReset }) {
    if (gameState === GameState.inProgress) {
        return;
    }
    return <button onClick={onReset} className="reset">Play Again</button>
}

export default PlayAgain;