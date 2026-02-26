window.addEventListener('DOMContentLoaded', () => {
    // ✅ Changed: use querySelector instead of querySelectorAll
    const titles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player'); // was querySelectorAll
    // ✅ Changed: select reset button correctly
    const resetButton = document.getElementById('reset'); // was wrong selector
    const announcer = document.querySelector('.announcer');

    // ✅ Changed: removed extra comma at end of array
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Validate if someone won or tie
    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === '' || board[b] === '' || board[c] === '') continue;
            if (board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        // ✅ Changed: correct syntax for TIE
        if (!board.includes('')) announce(TIE);
    };

    // Announce result
    const announce = (type) => {
        switch(type){
            // ✅ Changed: correct class name playerO
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    // Check if tile is empty
    const isValidAction = (title) => {
        // ✅ Changed: check for 'O', not zero
        if(title.innerText === 'X' || title.innerText === 'O'){
            return false;
        }
        return true;
    };

    // Update board array
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    // Switch players
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        // ✅ Changed: switch to 'O' instead of zero
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    // Handle a player's move
    const userAction = (title, index) => {
        if(isValidAction(title) && isGameActive) {
            title.innerText = currentPlayer;
            title.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            if(isGameActive) changePlayer();
        }
    };

    // Reset the game
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === 'O') changePlayer();

        titles.forEach(title => {
            title.innerText = '';
            title.classList.remove('playerX');
            title.classList.remove('playerO');
        });
    };

    // ✅ Changed: correct function name (userAction, not UserAction)
    titles.forEach((title, index) => {
        title.addEventListener('click', () => userAction(title, index));
    });

    resetButton.addEventListener('click', resetBoard);
});