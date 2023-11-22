import React,{useState} from 'react'

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [playerName, setPlayerName]= useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const handlePlayerName =(e)=>{
        setPlayerName(e.target.value)
        
    }

    
    const handleEditing = ()=>{
        setIsEditing((editing) => !editing)
        if(isEditing){
            onChangeName(symbol, playerName)
        }
    }

    let editPlayerName = <span className="player-name">{playerName}</span>

    if(isEditing){
        editPlayerName = <input type='text' required value={playerName} onChange={handlePlayerName}/>
    }

    return (
        
        <li className={isActive ? 'active':undefined}>
            <span className="player">  
                {editPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing} >{isEditing ? 'Save':'Edit'}</button>
        </li>
    )
}

export default Player