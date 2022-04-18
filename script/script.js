const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'; 
const cellElements = document.querySelectorAll('[data-cell]'); /* all the cells */
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); /* the total result display container */
const winningMessageElement = document.getElementById('winningMessage'); /* winning text container */

const restartButton = document.getElementById("restartButton");


const WINNING_COMBINATIONS = [
    //each row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //each column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //each diagonal
    [0, 4, 8],
    [2, 4, 6],
]

restartButton.addEventListener('click', startGame);

const board = document.getElementById('board');
let circleTurn;
startGame(); 
/* for each cell add eventlistener for only one click */
    function startGame()
    {
        circleTurn = false; /* first is the term of x not circle */
        cellElements.forEach(cell =>
        {
            cell.addEventListener('click', handleClick, {once : true}) 
            /* once : true sets that the eventlistener will only trigger once when clicked not after that */
            cell.addEventListener('click', handleClick, {once : true})
        })
        setBoardHoverClass(); /** decides what to show while hovering*/
        cellElements.forEach(cell =>{
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
        })
        winningMessageElement.classList.remove('show');
    }

    /* for each click put sign in cells
    decide what to show after the next click
    decide whether it is a win or draw
    for both win and draw end the game */
    function handleClick(e)
    {
        //placeMark
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        place(cell, currentClass);
        //check for win
        if(checkWin(currentClass))
        {
           endGame(false);
        }
        //check for draw
        else if(isDraw())
        {
            endGame(true);
        }
        else{
            //switch turns
            swapTurns();
            setBoardHoverClass();
        }
    }

    //place
    /*
    add proper class (x or circle) to the cell for showing the (X or O)  sign
    */
    function place(cell, currentClass)
    {
        cell.classList.add(currentClass);
    }

    //check win
    /*
    if all the elements of any winning combination have the same class that is a win
    */
    function checkWin(currentClass)
    {
        return WINNING_COMBINATIONS.some(combination => { 
            // some() checks whether the condition is true for any array element
            return combination.every(index =>{
            //every checks whetehr the given condition is true for all or not 
                return cellElements[index].classList.contains(currentClass);
            })
        })
    }
    /*
    check draw
    
    if all the cells contains either X_Class or Circle_class then it is a draw
    */
    function isDraw()
    {
        return [...cellElements].every( cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        })
    }
    //end game
    function endGame(draw)
    {
        if(draw)
        {
            winningMessageTextElement.innerText = `Draw`;
        }
        else{
            console.log(winningMessageTextElement);
            winningMessageTextElement.innerText = `${circleTurn ? "O's":"X's"}Wins!`;

        }
        winningMessageElement.classList.add(`show`);
    }
    /*
    change the term of X to O and vice versa
    decide what to show after click by interchanging each time
    */
    function swapTurns()
    {
        circleTurn = !circleTurn;
    }

    /* decide what to show (X or O) while hovering over cells */
    function setBoardHoverClass()
    {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        if(circleTurn)
        {
            board.classList.add(CIRCLE_CLASS);
        }
        else
        {
            board.classList.add(X_CLASS);
        }
    }

    

    