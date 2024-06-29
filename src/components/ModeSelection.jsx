import React from 'react';
import '../App.css'; // Ensure the path to App.css is correct

function ModeSelection({ onModeSelect }) {
  return (
    <div className="notebook-paper">
      <h1>Tic Tac Toe</h1>
      <div className="mode-selection">
        <button onClick={() => onModeSelect('player-vs-player')} data-text="Player vs. Player">Player vs. Player</button>
        <button onClick={() => onModeSelect('player-vs-ai')} data-text="Player vs. AI">Player vs. AI</button>
      </div>
    </div>
  );
}

export default ModeSelection;