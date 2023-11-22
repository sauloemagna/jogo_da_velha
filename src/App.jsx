import GameOver from "./components/GameOver"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import Player from "./components/Player"
import { useState } from "react"

const PLAYERS = {
  X: 'Jogador 1',
  O: 'Jogador 2'
}

const INITIALGAMEBOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer ='X'
    if(gameTurns.length >0 && gameTurns[0].player ==='X'){
      currentPlayer ='O'        
    }
  return currentPlayer
}

const deriveGameBoard=(gameTurns)=>{
  let gameBoard=[...INITIALGAMEBOARD.map(array => [...array])]
  for (const turn of gameTurns){
    const {square, player} = turn
    const {row,col} =square
    gameBoard[row][col]= player
  }
  return gameBoard
}

const deriveWinner =(gameBoard, players)=>{
  let winner


  for(const combination of WINNING_COMBINATIONS){
    const firstCombination  = gameBoard [combination[0].row][combination[0].column]
    const secondCombination = gameBoard [combination[1].row][combination[1].column]
    const thirdCombination = gameBoard [combination[2].row][combination[2].column]

    if(
      firstCombination &&
      firstCombination === secondCombination &&
      firstCombination === thirdCombination
    ){
      winner = players[firstCombination]
    }
  }
  return winner
}


function App() {
  //este comentados é mostrando que foi feito ao longo do curso e fomos melhorando
  //const [activePlayer, setActivePlayer]= useState('X')
  //setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O':'X')
  //const [hasWinner, setHasWinner] =useState(false)
  const [players, setPlayers]=useState(PLAYERS)
  
  const [gameTurns, setGameTurns]=useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)

  const winner= deriveWinner(gameBoard,players)
  const hasDraw = gameTurns.length === 9 && !winner
  const handleSelectSquare=(rowIndex,colIndex)=>{
    
    setGameTurns((prevTurns) =>{
      const currentPlayer = deriveActivePlayer(gameTurns)
      // let currentPlayer ='X'
      // if(prevTurns.length >0 && prevTurns[0].player ==='X'){
      //   currentPlayer ='O'        
      // }
      const updatedTurns =[
        { square:{row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns
      ]
      return updatedTurns
    })
  }
    
  const handleRestart=()=>{
    setGameTurns([])
  }
  
  const handlePlayerNameChange=(symbol, newName)=>{
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    })

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
      
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
        <Log turns={gameTurns} />
      </div>
    </main>
  )
}

export default App
