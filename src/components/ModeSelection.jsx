import React from 'react';
import '../App.css'; 

function ModeSelection({ onModeSelect }) {
  return (
    <div className="notebook-paper">
      <h1>Tic Tac Toe</h1>
      <div className="mode-selection">
        <button onClick={() => onModeSelect('player-vs-player')} data-text="Player vs. Player">Player vs. Player</button>
        <button onClick={() => onModeSelect('player-vs-ai')} data-text="Player vs. AI">Player vs. AI</button>
      </div>
      <div className="social-icons">
        <a href="https://github.com/yix07/Tic-Tac-Toe-AI" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/yixiang-chen/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default ModeSelection;
