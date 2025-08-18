import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='notes-nav-container'>
      <h2>Mis notas</h2>
       <div className='notes-navigation-items'>
          <a className = "nav-note" href="">Nota 1</a>
          <a className = "nav-note" href="">Nota 2</a>
          <a className = "nav-note" href="">Nota 3</a>
          <a className = "nav-note" href="">Nota 3</a>
          <a className = "nav-note" href="">Nota 3</a>
          <a className = "nav-note" href="">Nota 3</a>
          <a className = "nav-note" href="">Nota 3</a>
        </div>
      </div>
      <div className='note-area'>
        
        <div id='current-note'>
          <h2>Nota</h2>
          <textarea name="" id="" placeholder='Titulo'></textarea>
          <textarea id='current-note-text'placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'></textarea>
          <button> Guardar Nota</button>
          <button>Eliminar Nota</button>
        </div>
      </div>
    </>
  )
}

export default App
