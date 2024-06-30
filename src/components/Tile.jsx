import { useState, useEffect } from 'react';

function Tile({ className, value, onClick, playerTurn, reset }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (value !== null) {
            setFlipped(true);
        }
    }, [value]);

    useEffect(() => {
        if (reset) {
            setFlipped(false);
        }
    }, [reset]);

    const handleClick = () => {
        if (value == null) {
            onClick();
        }
    };

    let hoverVar = null;
    if (value == null && playerTurn != null) {
        if (playerTurn.toLowerCase() === 'x') {
            hoverVar = 'x-hover';
        } else if (playerTurn.toLowerCase() === 'o') {
            hoverVar = 'o-hover';
        }
    }

    let flippedClass = "";
    if (flipped) {
        flippedClass = "flipped";
    }

    return (
        <div onClick={handleClick} className={"tile " + className + " " + hoverVar + " " + flippedClass}>
            <div className="tile-inner">
                <div className="tile-front"></div>
                <div className="tile-back">{value}</div>
            </div>
        </div>
    );
}

export default Tile;




