import { useState } from "react";
import lottery from "../assets/popups/lottery.gif"
import casino from "../assets/popups/casino.gif"
import aliens from "../assets/popups/aliens.gif"
import looneytoons from "../assets/popups/looneytoons.gif"
import explorer from "../assets/popups/explorer.gif"
import evanescence from "../assets/popups/evanescence.gif"
import glitterchu from "../assets/popups/glitterchu.gif"
import drugquiz from "../assets/popups/drugquiz.gif"
import pringles from "../assets/popups/aliens.gif"
import "./PopUp.css"

const images = [lottery, casino, aliens, looneytoons, explorer, evanescence,glitterchu, drugquiz, pringles]

export default function PopUp({ handleClose, top, left }) {
  // Elegir imagen aleatoria SOLO una vez
  const [image] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  })

  return (
    <div
      className="popUp"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <button onClick={handleClose}>X</button>
      <a>
        <img src={image} alt="popUp" />
      </a>
    </div>
  )
}