const board = Chessboard('chess-board', {
    draggable: true,
    position: 'start',
    onDragStart: (source, piece) => {
        if ((game.turn() === 'w' && piece.startsWith('b')) || 
            (game.turn() === 'b' && piece.startsWith('w')) || 
            game.game_over()) {
            return false;
        }
    },
    onDrop: (source, target) => {
        let move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        updateCapturedPieces(move);
        updateTurnIndicator();

        if (game.in_checkmate()) {
            alert("Checkmate! " + (game.turn() === 'w' ? "Black" : "White") + " wins!");
        } else if (game.in_draw()) {
            alert("It's a draw!");
        }
    }
});

const game = new Chess();

function updateTurnIndicator() {
    document.getElementById("turn-indicator").innerText = game.turn() === 'w' ? "White to move" : "Black to move";
}

function updateCapturedPieces(move) {
    if (move.captured) {
        let capturedPiece = move.color === 'w' ? '♟' : '♙';
        document.getElementById(move.color === 'w' ? "white-captured" : "black-captured").innerText += ` ${capturedPiece}`;
    }
}

document.getElementById("restart-btn").addEventListener("click", () => {
    game.reset();
    board.position('start');
    document.getElementById("white-captured").innerText = "White Captured:";
    document.getElementById("black-captured").innerText = "Black Captured:";
    updateTurnIndicator();
});

updateTurnIndicator();
