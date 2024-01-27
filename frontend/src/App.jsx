import { useState } from 'react'
import './App.css'
import BotPage from './components/BotPage';

function App() {

  const [showBot, setShowBot] = useState(false);
  const handleOnClick = () => {
    setShowBot(!showBot)
  }
  
  return (
    <>
      <>
        {
          !showBot &&
          <>
            <div className="start-bot">
              <div className="circle one"></div>
              <div className="circle two"></div>
              <div className="circle three"></div>
              <div className="lootie " onClick={() => handleOnClick()} >
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN62SFKs-zSv507_mhs3CZLulV1plOQaGBKLWK1ziFmQ&s' alt='img-bot' height="60px" width="60px" />
              </div>
            </div>
          </>
        }
      </>
      {
        showBot &&
        <div className="main_box" >
          <BotPage fn={setShowBot} />
        </div>
      }
    </>
  )
}

export default App
