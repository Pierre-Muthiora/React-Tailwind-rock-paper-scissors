import React, { useState, useEffect } from 'react';
import './index.css';


function App() {
  const [myChoice, setMyChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [myPoints, setMyPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [scoreMessage, setScoreMessage] = useState(null)
  const [finalResult, setFinalResult] = useState('')
  const [gameOver, setGameOver] = useState(false)

  const choice = ['rock', 'paper', 'scissors']

  const handleOnClick = (choice) => {
    setMyChoice(choice)
    generateComputerChoice()
  }
  const generateComputerChoice = () => {
    const randomChoice = choice[Math.floor(Math.random() * 3)]
    setComputerChoice(randomChoice)
  }
  const restart = () => {
    window.location.reload()
  }

  useEffect(() => {
    const combinedMoves = myChoice + computerChoice
    if (myPoints <= 4 && computerPoints <= 4) {
      if (combinedMoves === 'rockscissors' || combinedMoves === 'paperrock' || combinedMoves === 'scissorspaper') {
        const updatedUserPoints = myPoints + 1
        setMyPoints(updatedUserPoints)
        setScoreMessage('You scored')
        if (updatedUserPoints === 5) {
          setGameOver(true)
          setFinalResult('You win')
        }
      }
      if (combinedMoves === 'paperscissors' || combinedMoves === 'scissorsrock' || combinedMoves === 'rockpaper') {
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setScoreMessage('Computer scored')
        if (updatedComputerPoints === 5) {
          setGameOver(true)
          setFinalResult('Computer wins')
        }
      }
      if (combinedMoves === 'rockrock' || combinedMoves === 'paperpaper' || combinedMoves === 'scissorsscissors') {
        setScoreMessage('Tie')
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myChoice, computerChoice])

  return (
    <div className='flex flex-col items-center text-center'>

      <section className='w-full'>
        <div>
          <h1 className='text-6xl font-extrabold'>
            Rock Paper Scissors
          </h1>
        </div>
        <div className='flex justify-around items-center h-28 text-4xl font-bold'>
          <div>
            <h3>Me</h3>
            <p className='font-normal text-[#fb6837]'>{myPoints}</p>
          </div>
          <div>
            <h3>Computer</h3>
            <p className='font-normal text-[#fb6837]'>{computerPoints}</p>
          </div>
        </div>
      </section>

      <section className='relative'>
        <div className={gameOver ? 'opacity-0 transition duration-500 ease-in' : 'opacity-100'}>
          <div className='flex justify-center space-x-14 h-60'>
            <div className='w-64'>
              <img src={`/assets/${myChoice}2.png`} alt="Your hand" />
            </div>
            <div className='w-64'>
              <img src={`/assets/${computerChoice}.png`} alt="Computer hand" />
            </div>
          </div>

          <div className='flex justify-center items-center'>
            {choice.map((choice, index) =>
              <button className='bg-[#48b4b8] hover:bg-[#2b687867] border font-bold rounded-md p-3 w-28 text-xl cursor-pointer z-10' key={index} onClick={() => handleOnClick(choice)} disabled={gameOver}>{choice}</button>
            )}
          </div>
          <div className='p-10'>
            <h1 className='text-4xl font-bold tracking-widest'>{scoreMessage}</h1>
          </div>
        </div>

        <section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[529px] h-[378px] font-semibold'>
          <h2 className={finalResult === "You win" ? 'text-green-600 text-5xl tracking-widest mt-16 font-bold' : 'text-red-700 text-5xl tracking-widest mt-16 font-bold' }>{finalResult}</h2>
          {gameOver && <button className='bg-[#fb6837] mt-32 border font-bold rounded-md p-3 w-28 text-xl cursor-pointer hover:scale-125 duration-300' onClick={() => restart()}>Restart</button>}
        </section>

      </section>
    </div>



  );
}

export default App;
