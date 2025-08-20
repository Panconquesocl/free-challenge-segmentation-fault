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
import pepe from './assets/pepe.avif'
import chicken from "./assets/chicken-walking.gif";
import megaChicken from "./assets/muscular-chicken.gif";
import wdf from "./assets/wdf.png"
import wdf2 from "./assets/wdf2.png"
import NoteList from "./components/NoteList"
import peluca from './assets/peluca.jpg'


function App() {
  const storedUserData = localStorage.getItem('notes');
  const [chickensImg, setChickens] = useState(chicken);
  const [destroyed, setDestroyed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState("# Nota de Prueba \n Aqui puedes escribir lo que quieras, intentalo!:D \n\n Presiona guardar para guadar tus notas\n Puedes usar los atajos de arriba para formatear texto");
  const [popUps, setPopUps] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const saveCurrentNote = () => {setNotes(prev => [...prev, value]);}
  const deleteCurrentNote = () => {setNotes(prev => prev.filter(note=> note!== value));}
  const handleChickenPartyButton = () => {
    const   resizeChickens = ()  => {
      const chickens = document.querySelectorAll('.extra-chicken');
      chickens.forEach(chicken => {
        chicken.style.width = "360px";
        chicken.style.height = "360px";
      });
    
    }

    setChickens(megaChicken);
    const elements = document.querySelectorAll('.extra-chicken, .main-cursor');
    elements.forEach(el => {el.style.width = "80px";el.style.height = "80px";});
  }
  
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

  function showSorrySequence() {
    const h1Sorry = document.getElementById("sorryH1");
    const h2Sorry = document.getElementById("sorryH2");
    const imgSorry = document.getElementById("sorryImg");
  
    // Mostrar el primer h1
    h1Sorry.style.display = "block";
  
    // Mostrar el h2 después de 1s
    setTimeout(() => {
      h2Sorry.style.display = "block";
    }, 2500);
  
    // Mostrar la imagen con fade-in después de 2s
    setTimeout(() => {
      imgSorry.style.display = "block";
      imgSorry.style.opacity = 0; // comenzamos en transparente
  
      let opacity = 0;
      function fadeIn() {
        opacity += 0.02; // velocidad del fade (ajustable)
        if (opacity <= 1) {
          imgSorry.style.opacity = opacity;
          requestAnimationFrame(fadeIn);
        }
      }
  
      fadeIn();
    }, 4500);
  }
  function explodeAndCollapse(centerX = window.innerWidth/2, centerY = window.innerHeight/2, duration = 5000) {
    const elements = [...document.body.querySelectorAll("*")];
  
    const startTime = performance.now();
    
    const particles = elements.map((el) => {
      const rect = el.getBoundingClientRect();
      const origX = rect.left + rect.width / 2;
      const origY = rect.top + rect.height / 2;
  
      // Posición inicial
      el.style.position = "relative";
      el.style.transformOrigin = "center center";
  
      // Generar velocidad aleatoria para el “revuelto”
      const velocityX = (0) * 20; // px/frame
      const velocityY = (0) * 20;
      const rotationSpeed = (0.1) * 15 ; // grados/frame
  
      return {
        el,
        origX,
        origY,
        x: 0,
        y: 0,
        angle: 0,
        velocityX,
        velocityY,
        rotationSpeed
      };
    });
  
    function animate(now) {
      const t = now - startTime;
      const progress = Math.min(t / duration, 1); // 0 a 1
  
      particles.forEach(p => {
        let moveProgress = progress < 0.5 ? progress * 2 : 1; // revuelto en 0-0.5
        let collapseProgress = progress >= 0.5 ? (progress - 0.5) * 2 : 0; // colapso en 0.5-1
  
        // Fase 1: revuelto
        if (moveProgress > 0 && progress < 0.5) {
          p.x += p.velocityX * 2; 
          p.y += p.velocityY * 2; 
          p.angle += p.rotationSpeed * 2;
        }
  
        // Fase 2: colapso al centro
        if (collapseProgress > 0) {
          const dx = centerX - (p.origX + p.x);
          const dy = centerY - (p.origY + p.y);
          // suavizamos el movimiento con easing (cuadrática)
          p.x += dx * collapseProgress * 0.1;
          p.y += dy * collapseProgress * 0.1;
          // Reducimos el tamaño suavemente
          const scale = 1 - collapseProgress;
          p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg) scale(${scale})`;
          p.el.style.opacity = `${scale}`;
        } else {
          p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;
        }
      });
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ocultar todo al final
        particles.forEach(p => {
          p.el.style.display = "none";
        });
      }
    }
  
    requestAnimationFrame(animate);
    setTimeout(()=>{setDestroyed(true);
      document.getElementById("root").style="display:block;";
    },6000)
    setTimeout(()=>{
      showSorrySequence();
    },6100)
    
  }

  const fillWithPopUps = ()=> {
    for(let i =0; i<5000; i++){
      setTimeout(()=>{
        const randomTop = Math.random() * (window.innerHeight - 200); // 200px aprox altura popup
        const randomLeft = Math.random() * (window.innerWidth - 300); // 300px aprox ancho popup
    
        const newPopUp = {
          id: Date.now() + Math.random(),
          top: randomTop,
          left: randomLeft,
        };
        setPopUps(prev => [...prev, newPopUp]);
      },Math.log(i) * 800) // 8 segundos hasta que gg
    
  }}
  
  if (destroyed) {
    return(
    <>
      <h1 id = "sorryH1" style = {{display:"none"}}>No hay nada mas que hacer aqui</h1>
      <h2 id = "sorryH2" style = {{display:'none'}}>Lo siento bro.....</h2> 
      <img id = "sorryImg" style = {{display:'none'}} src={pepe} alt="Aqui deberia haber una imagen... F" />
    </>)
  }

  else{
  // if (storedUserData){setNotes(storedUserData); console.log(storedUserData)}
  // else {localStorage.setItem("notes", JSON.stringify({"notesArray": []}))}

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
        <ChickenCursor chickenImg={chickensImg}/>

        <div className='notes-nav-container'>
          <h2>Mis Notas Guardadas</h2>
          <h3>Scrollea a la derecha para ver tus notas guardadas :'D</h3>
          <NoteList notes={notes} setValue={setValue}></NoteList>
        </div>

        <div id='note-area-container'>
          <div className='note-area'>
            <div className='ads-container'>
              <a onClick={explodeAndCollapse} ><img className="ad" src={Ad1} alt="AD" /></a>
              <img className="ad" src={ballonsAd} alt="AD" />
              <img className="ad" src={yahooAd} alt="AD" />
              <img className="ad" src={votaImg} alt="AD" />
              <div id="config-container">
                <button onClick={handleChickenPartyButton} >Desactivar Pollos</button>
                <button onClick={fillWithPopUps}> Desactivar Anuncios</button> 
                
              </div>
              
            </div>

            <div id='current-note'>
              <h2>MY AWESOME AND STRESS-FREE NOTE TAKING WEBPAGE!!!</h2>
              <MDEditor id='current-note-text' value={value} onChange={handleType} autoFocus={true} height="50vh"/>
              <button onClick = {saveCurrentNote}>Guardar Nota</button>
              <button onClick = {deleteCurrentNote}>Eliminar Nota</button>
            </div>

            <div className='ads-container'>
              <img className="ad" src={meme} alt="AD" />
              <img className="ad" src={dancingBabies} alt="AD" />
              <img className="ad" src={wdf} alt="AD" />
              <img className="ad" src={wdf2} alt="AD" />
              <img className="ad" src={peluca} alt="AD" />
            </div>
          </div>
        </div>
      </div>
    </>
  )}
}

export default App;