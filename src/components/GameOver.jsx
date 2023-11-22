import React from 'react'

const GameOver = ({winner, onRestart}) => {
    return (
        <div id='game-over'>
            <h2>Fim de Jogo</h2>
            {winner && <p>{winner} venceu!</p>}
            {!winner && <p>Houve um empate!</p>}
            <p>
                <button onClick={onRestart}>Revanche!</button>
            </p>

        </div>
    )
}

export default GameOver