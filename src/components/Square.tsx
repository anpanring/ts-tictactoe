type Player = 'X' | 'O' | 'DRAW' | null;

function Square({
    onClick, value, winner
}:{
    onClick: () => void,
    value: Player,
    winner: Player,
}) {
    if(!value) {
        return <button className="square" onClick={onClick} disabled={Boolean(winner)} />;
    }
    return <button className={`square square_${value.toLowerCase()}`} disabled>{value}</button>
}

export default Square;