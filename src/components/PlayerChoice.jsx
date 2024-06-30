import React from 'react';
import '../App.css';

function PlayerChoice({ onPlayerSelect }) {
  return (
    <div className="notebook-paper">
      <h1>Choose Your Player</h1>
      <div className="mode-selection">
        <button onClick={function() { onPlayerSelect('X'); }} data-text="Play as X">Play as X</button>
        <button onClick={function() { onPlayerSelect('O'); }} data-text="Play as O">Play as O</button>
      </div>
    </div>
  );
}

export default PlayerChoice;
