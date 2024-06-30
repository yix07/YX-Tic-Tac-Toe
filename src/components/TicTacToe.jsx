import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import PlayAgain from "./PlayAgain";
import { findBestMove } from "./AI";
import ModeSelection from './ModeSelection';
import PlayerChoice from './PlayerChoice';

const PLAYER_X = "X";
const PLAYER_O = "O";

const winCombinations = [
    // Rows
    { combo: [0, 1, 2], lineClass: "line-row-1" },
    { combo: [3, 4, 5], lineClass: "line-row-2" },
    { combo: [6, 7, 8], lineClass: "line-row-3" },

    //Columns
    { combo: [0, 3, 6], lineClass: "line-column-1" },
    { combo: [1, 4, 7], lineClass: "line-column-2" },
    { combo: [2, 5, 8], lineClass: "line-column-3" },

    //Diagonal
    { combo: [0, 4, 8], lineClass: "line-diagonal-1" },
    { combo: [2, 4, 6], lineClass: "line-diagonal-2" },
]

function checkWin(tiles, setLineClass, setGameState) {
    for (var i = 0; i < winCombinations.length; i++) {
        var combo = winCombinations[i].combo;
        var lineClass = winCombinations[i].lineClass;
        var tile1 = tiles[combo[0]];
        var tile2 = tiles[combo[1]];
        var tile3 = tiles[combo[2]];

        if (tile1 !== null && tile1 === tile2 && tile1 === tile3) {
            setLineClass(lineClass);
            if (tile1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            }
            else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    var draw = tiles.every(function(tile) { return tile !== null; });
    if (draw) {
        setGameState(GameState.tie);
    }
}

function TicTacToe() {
    const [mode, setMode] = useState(null);
    const [player, setPlayer] = useState(null);
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [lineClass, setLineClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [isVsAI, setIsVsAI] = useState(false);
    const [reset, setReset] = useState(false);

    useEffect(function() {
        checkWin(tiles, setLineClass, setGameState);
        if (gameState === GameState.inProgress && playerTurn !== player && isVsAI) {
            var bestMove = findBestMove(tiles);
            if (bestMove !== null) {
                var nextPlayer = player === PLAYER_X ? PLAYER_O : PLAYER_X;
                handleTileClick(bestMove, nextPlayer);
            }
        }
    }, [tiles, playerTurn, gameState, isVsAI, player]);

    function handleTileClick(index, currentPlayer) {
        if (currentPlayer === undefined) {
            currentPlayer = playerTurn;
        }
        if (gameState !== GameState.inProgress || tiles[index] !== null) {
            return;
        }
        var newTiles = tiles.slice();
        newTiles[index] = currentPlayer;
        setTiles(newTiles);

        if (currentPlayer === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    };

    function handleReset() {
        setGameState(GameState.inProgress);
        setPlayerTurn(PLAYER_X);
        setTiles(Array(9).fill(null));
        setLineClass(null);
        setReset(true);
        setTimeout(function() {
            setReset(false);
        }, 0);
    };

    function handleModeSelect(selectedMode) {
        setIsVsAI(selectedMode === 'player-vs-ai');
        if (selectedMode === 'player-vs-ai') {
            setMode('player-choice');
        } else {
            setMode(selectedMode);
            handleReset();
        }
    };

    function handlePlayerSelect(selectedPlayer) {
        setPlayer(selectedPlayer);
        setMode('player-vs-ai');
        handleReset();
    };

    function handleHomeClick() {
        setMode(null);
        setPlayer(null);
        handleReset();
    };

    if (mode === null) {
        return <ModeSelection onModeSelect={handleModeSelect} />;
    }

    if (mode === 'player-choice') {
        return <PlayerChoice onPlayerSelect={handlePlayerSelect} />;
    }

    return (
        <div>
            <button className="homepage-button" onClick={handleHomeClick}>X</button>
            <Board lineClass={lineClass} playerTurn={playerTurn} tiles={tiles} onTileClick={function(index) { handleTileClick(index, playerTurn); }} reset={reset} />
            <GameOver gameState={gameState} />
            <PlayAgain gameState={gameState} onReset={handleReset} />
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

export default TicTacToe;