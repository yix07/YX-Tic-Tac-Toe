import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import PlayAgain from "./PlayAgain";
import { findBestMove } from "./AI";
import ModeSelection from './ModeSelection';

const PLAYER_X = "X";
const PLAYER_O = "O";

const winCombinations = [
    // Rows
    {combo: [0, 1, 2], lineClass: "line-row-1"},
    {combo: [3, 4, 5], lineClass: "line-row-2"},
    {combo: [6, 7, 8], lineClass: "line-row-3"},

    //Columns
    {combo: [0, 3, 6], lineClass: "line-column-1"},
    {combo: [1, 4, 7], lineClass: "line-column-2"},
    {combo: [2, 5, 8], lineClass: "line-column-3"},

    //Diagonal
    {combo: [0, 4, 8], lineClass: "line-diagonal-1"},
    {combo: [2, 4, 6], lineClass: "line-diagonal-2"},
]

function checkWin(tiles, setLineClass, setGameState) {
    for (const {combo, lineClass} of winCombinations) {
        const tile1 = tiles[combo[0]];
        const tile2 = tiles[combo[1]];
        const tile3 = tiles[combo[2]];

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

    const draw = tiles.every((tile) => tile !== null);
    if (draw) {
        setGameState(GameState.tie);
    } 
}

function TicTacToe() {
    const [mode, setMode] = useState(null);
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [lineClass, setLineClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [isVsAI, setIsVsAI] = useState(false);

    useEffect(() => {
        const winner = checkWin(tiles, setLineClass, setGameState);
        if (gameState === GameState.inProgress && playerTurn === PLAYER_O && isVsAI && !winner) {
            const bestMove = findBestMove(tiles);
            if (bestMove !== null) {
                handleTileClick(bestMove);
            }
        }
    }, [tiles, playerTurn, gameState, isVsAI]);

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress || tiles[index] !== null) {
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setPlayerTurn(PLAYER_X);
        setTiles(Array(9).fill(null));
        setLineClass(null);
    };

    const handleModeSelect = (selectedMode) => {
        setIsVsAI(selectedMode === 'ai');
        setMode(selectedMode);
        handleReset();
    };

    if (mode === null) {
        return <ModeSelection onModeSelect={handleModeSelect} />;
    }

    return (
        <div>
            <Board lineClass={lineClass} playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} />
            <GameOver gameState={gameState} />
            <PlayAgain gameState={gameState} onReset={handleReset} />
        </div>
    );
}

export default TicTacToe;