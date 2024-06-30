const PLAYER_X = "X";
const PLAYER_O = "O";

function getAvailableMoves(tiles) {
    const moves = [];
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) {
            moves.push(i);
        }
    }
    return moves;
}

function checkWin(tiles) {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
            return tiles[a];
        }
    }

    if (tiles.includes(null)) {
        return null;
    } 
    else {
        return 'tie';
    }
}

function minimax(tiles, depth, isMaximizing) {
    const winner = checkWin(tiles);
    if (winner === PLAYER_X) {
        return -10 + depth;
    }
    if (winner === PLAYER_O) {
        return 10 - depth;
    }
    if (winner === 'tie') {
        return 0;
    }

    const availableMoves = getAvailableMoves(tiles);

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < availableMoves.length; i++) {
            const move = availableMoves[i];
            tiles[move] = PLAYER_O;
            const score = minimax(tiles, depth + 1, false);
            tiles[move] = null;
            if (score > bestScore) {
                bestScore = score;
            }
        }
        return bestScore;
    } 
    else {
        let bestScore = Infinity;
        for (let i = 0; i < availableMoves.length; i++) {
            const move = availableMoves[i];
            tiles[move] = PLAYER_X;
            const score = minimax(tiles, depth + 1, true);
            tiles[move] = null;
            if (score < bestScore) {
                bestScore = score;
            }
        }
        return bestScore;
    }
}

export function findBestMove(tiles) {
    let bestMove = null;
    let bestScore = -Infinity;

    const availableMoves = getAvailableMoves(tiles);

    for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        tiles[move] = PLAYER_O;
        const score = minimax(tiles, 0, false);
        tiles[move] = null;
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

