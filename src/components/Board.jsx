import Line from "./Line";
import Tile from "./Tile";

function Board({ tiles, onTileClick, playerTurn, lineClass, reset }) {
    return(
        <div className="board"> 
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(0)} value={tiles[0]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(1)} value={tiles[1]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(2)} value={tiles[2]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(3)} value={tiles[3]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(4)} value={tiles[4]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(5)} value={tiles[5]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(6)} value={tiles[6]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(7)} value={tiles[7]} reset={reset}></Tile>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(8)} value={tiles[8]} reset={reset}></Tile>
            <Line lineClass={lineClass}></Line>
        </div>
    );
}

export default Board;