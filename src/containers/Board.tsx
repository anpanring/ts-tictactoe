import { useEffect, useState } from "react";
import Square from '../components/Square';

type Player = 'X' | 'O' | 'DRAW' | null;

function calculateWinner(squares : Player[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; 
        // is squares[a] exists, and 2nd and 3rd items match, we have winner
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    // initialize randomly to X or O
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    );
    const [winner, setWinner] = useState<Player>(null);

    // update squares array and switch current player
    function setSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if (index === i) {
                return currentPlayer;
            }
            return val;
        });
        setSquares(newData);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
    }

    useEffect(() => {
        const winner = calculateWinner(squares);
        if(winner) {
            setWinner(winner);
        }

        // no winner and no empty squares
        if(!winner && !squares.filter(square => !square).length) {
            setWinner('DRAW');
        }
    });

    return (
        <>
            {!winner && <p>Hey {currentPlayer}, it&apos;s your turn!!</p>}
            {winner && winner !== 'DRAW' && <p>Congratuations {winner}</p>}
            {winner && winner === 'DRAW' && <p>It&apos;s a draw</p>}

            <div className="grid">
                {Array(9).fill(null).map((_, i) => {
                    return (
                        <Square
                            key={i}
                            onClick={() => setSquareValue(i)}
                            value={squares[i]}
                            winner={winner}
                        />
                    );
                })}
            </div>
            <button className="reset" onClick={reset}>RESET</button>
        </>
    );
}

export default Board;