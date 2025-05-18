document.addEventListener("DOMContentLoaded", function () {
    const chessboard = document.getElementById('chessboard');
    const piecesButtons = document.querySelectorAll('.button');
    let selectedPiece = '';

    // Create the chessboard with 64 cells
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Alternate cell colors
            if ((row + col) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }

            cell.dataset.row = row;
            cell.dataset.col = col;
            chessboard.appendChild(cell);
        }
    }

    // Add event listeners to piece buttons
    piecesButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedPiece = this.id;
            resetBoard();
        });
    });

    // Highlight valid moves when hovering over chessboard cells
    chessboard.addEventListener('mouseover', function (event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && selectedPiece) {
            highlightMoves(cell);
        }
    });

    // Function to highlight valid moves based on the selected piece
    function highlightMoves(cell) {
        resetBoard(); // Clear previous highlights
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (selectedPiece === 'bishop') {
            highlightDiagonalMoves(row, col);
        } else if (selectedPiece === 'queen') {
            highlightDiagonalMoves(row, col);
            highlightStraightMoves(row, col);
        } else if (selectedPiece === 'rook') {
            highlightStraightMoves(row, col);
        } else if (selectedPiece === 'knight') {
            highlightKnightMoves(row, col);
        } else if (selectedPiece === 'king') {
            highlightKingMoves(row, col);
        } else if (selectedPiece === 'pawn') {
            highlightPawnMoves(row, col);
        }
    }

    // Reset the board (clear previous highlights)
    function resetBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('highlight'));
    }

    // Highlight diagonal moves (Bishop and Queen)
    function highlightDiagonalMoves(row, col) {
        // Top-left and bottom-right diagonals
        for (let i = 1; i < 8; i++) {
            if (row - i >= 0 && col - i >= 0) {
                document.querySelector(`[data-row="${row - i}"][data-col="${col - i}"]`).classList.add('highlight');
            }
            if (row + i < 8 && col + i < 8) {
                document.querySelector(`[data-row="${row + i}"][data-col="${col + i}"]`).classList.add('highlight');
            }
        }
        // Top-right and bottom-left diagonals
        for (let i = 1; i < 8; i++) {
            if (row - i >= 0 && col + i < 8) {
                document.querySelector(`[data-row="${row - i}"][data-col="${col + i}"]`).classList.add('highlight');
            }
            if (row + i < 8 && col - i >= 0) {
                document.querySelector(`[data-row="${row + i}"][data-col="${col - i}"]`).classList.add('highlight');
            }
        }
    }

    // Highlight straight moves (Rook and Queen)
    function highlightStraightMoves(row, col) {
        for (let i = 0; i < 8; i++) {
            if (i !== row) {
                document.querySelector(`[data-row="${i}"][data-col="${col}"]`).classList.add('highlight');
            }
            if (i !== col) {
                document.querySelector(`[data-row="${row}"][data-col="${i}"]`).classList.add('highlight');
            }
        }
    }

    // Highlight knight's moves
    function highlightKnightMoves(row, col) {
        const knightMoves = [
            [-2, -1], [-2, 1], [2, -1], [2, 1],
            [-1, -2], [1, -2], [-1, 2], [1, 2]
        ];

        knightMoves.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`).classList.add('highlight');
            }
        });
    }

    // Highlight king's moves
    function highlightKingMoves(row, col) {
        const kingMoves = [
            [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
        ];

        kingMoves.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`).classList.add('highlight');
            }
        });
    }

    // Highlight pawn's moves 
    function highlightPawnMoves(row, col) {
        const newRow = row - 1;  // Moving one step up (for white pawns)
        if (newRow >= 0) {
            document.querySelector(`[data-row="${newRow}"][data-col="${col}"]`).classList.add('highlight');
        }
    }
});
