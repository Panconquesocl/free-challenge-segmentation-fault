import { useState, useEffect } from 'react'
import './App.css'
import MDEditor from '@uiw/react-md-editor';
import ChickenCursor from './components/chicken.jsx'
import Ad1 from './assets/popups/ad1.png' 
import ballonsAd from './assets/gifs/ballons.gif'
import yahooAd from './assets/popups/yahooAd.gif'
import dancingBabies from './assets/gifs/dancing_babies.gif'
import votaImg from './assets/popups/VOTA.png'
import PopUp from './components/PopUp.jsx';
import meme from './assets/meme.png';

function App() {
  const [value, setValue] = useState("# Nota N \n Lorem ipsum dolor sit amet...");
  const [popUps, setPopUps] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  
  const handleType = (value) => {
    if (Math.random() < 0.3) { 
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      
      const extrachar = alphabet[randomIndex];
      console.log(extrachar);
      setValue(value + extrachar);
    }
    else{
      setValue(value);
    }
  };

  const closePopup = (id) => {
    setPopUps(prev => prev.filter(p => p.id !== id));
  };

  // solo agregamos el event listener una vez (useEffect), no en cada render
  useEffect(() => {
    const handleClick = () => {
      if (Math.random() < 0.2) { // 20% de probabilidad
        const randomTop = Math.random() * (window.innerHeight - 200); // 200px aprox altura popup
        const randomLeft = Math.random() * (window.innerWidth - 300); // 300px aprox ancho popup
  
        const newPopUp = {
          id: Date.now() + Math.random(),
          top: randomTop,
          left: randomLeft,
        };
        setPopUps(prev => [...prev, newPopUp]);
      }
    };
  
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div id='main-container'>
        {/* Render de todos los popups activos */}
        {popUps.map((popup) => (
  <PopUp 
    key={popup.id} 
    handleClose={() => closePopup(popup.id)} 
    top={popup.top} 
    left={popup.left} 
  />
))}
        {/* <popUp></popUp> */}
        <ChickenCursor />

        <div className='notes-nav-container'>
          <h2>Notas Guardadas</h2>
          <h3>Scrollea a la derecha para ver tus notas :'D</h3>
          <div className='notes-navigation-items'>
            <MDEditor.Markdown className="nav-note" source={value} style={{ whiteSpace: 'pre-wrap' }} />
            <MDEditor.Markdown className="nav-note" source={value} style={{ whiteSpace: 'pre-wrap' }} />
            <MDEditor.Markdown className="nav-note" source={value} style={{ whiteSpace: 'pre-wrap' }} />
          </div>
        </div>

        <div id='note-area-container'>
          <div className='note-area'>
            <div className='ads-container'>
              <a href=""><img className="ad" src={Ad1} alt="AD" /></a>
              <a href=""><img className="ad" src={ballonsAd} alt="AD" /></a>
              <a href=""><img className="ad" src={yahooAd} alt="AD" /></a>
              <a href=""><img className="ad" src={votaImg} alt="AD" /></a>
              {/* <button type='select'>Desactivar Pollos</button> */}
              <div id="config-container">
                <button>Desactivar Pollos</button>
                <button> Desactivar Anuncios</button> 
              </div>
              
            </div>

            <div id='current-note'>
              <h2>MY AWESOME AND STRESS-FREE NOTE TAKING WEBPAGE!!!</h2>
              <MDEditor id='current-note-text' value={value} onChange={handleType} autoFocus={true} height="50vh"/>
              <button>Guardar Nota</button>
              <button>Eliminar Nota</button>
            </div>

            <div className='ads-container'>
              <a href=""><img className="ad" src={Ad1} alt="AD" /></a>
              <a href=""><img className="ad" src={dancingBabies} alt="AD" /></a>
              <a href=""><img className="ad" src={meme} alt="AD" /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;