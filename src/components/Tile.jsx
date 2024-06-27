function Tile({ className, value, onClick, playerTurn }) {
    let hoverVar = null;
    if (value == null && playerTurn!= null) {
        hoverVar = `${playerTurn.toLowerCase()}-hover`
    }

    return (
        <div onClick={onClick} className={`tile ${className} ${hoverVar}`}>{value}</div>
    );
}

export default Tile;