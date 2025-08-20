import React, { useEffect, useRef, useState } from "react";
import "./Chicken.css";

export default function ChickenCursor({chickenImg}) {
  const mainCursor = useRef(null);
  const [extraChickens, setExtraChickens] = useState([]);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    chickenX: 0,
    chickenY: 0,
  });

  const speed = 0.04;

  useEffect(() => {
    const handleMouseMove = (event) => {
      positionRef.current.mouseX = event.clientX - 10;
      positionRef.current.mouseY = event.clientY - 15;
    };

    const handleKeyDown = () => {
      const randX = Math.random() * window.innerWidth;
      const randY = Math.random() * window.innerHeight;
      setExtraChickens((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: randX,
          y: randY,
          angle: 0,
          isExploding: false,
          explodeX: 0,
          explodeY: 0,
        },
      ]);

      // Hacer explotar todos los pollos existentes
      setExtraChickens((prev) =>
        prev.map((ch) => ({
          ...ch,
          isExploding: true,
          explodeX: (Math.random() - 0.5) * 20,
          explodeY: (Math.random() - 0.5) * 20,
        }))
      );
    };

    const handleClick = () => {
      setExtraChickens((prev) =>
        prev.map((ch) => ({
          ...ch,
          isExploding: true,
          explodeX: (Math.random() - 0.5) * 20,
          explodeY: (Math.random() - 0.5) * 20,
        }))
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    const animate = () => {
      const { mouseX, mouseY, chickenX, chickenY } = positionRef.current;

      // Pollo principal sigue al mouse
      positionRef.current.chickenX += (mouseX - chickenX) * speed;
      positionRef.current.chickenY += (mouseY - chickenY) * speed;

      const dx = mouseX - positionRef.current.chickenX;
      const dy = mouseY - positionRef.current.chickenY;

      // Orientación horizontal
      const facingRight = dx >= 0;

      // Ángulo completo para rotate
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      if (mainCursor.current) {
        mainCursor.current.style.transform = `
          translate3d(${positionRef.current.chickenX}px, ${positionRef.current.chickenY}px, 0)
          rotate(${angleDeg}deg)
          scaleX(${facingRight ? 1 : -1})
        `;
      }

      // Animación de pollos extra
      setExtraChickens((prev) =>
        prev.map((ch) => {
          let newX = ch.x;
          let newY = ch.y;
          let angle = ch.angle || 0;
          let explodeX = ch.explodeX || 0;
          let explodeY = ch.explodeY || 0;

          if (ch.isExploding) {
            newX += explodeX;
            newY += explodeY;

            if (newX < 0 || newX > window.innerWidth - 50) explodeX *= -1;
            if (newY < 0 || newY > window.innerHeight - 50) explodeY *= -1;
          } else {
            const dxCh = mouseX - newX;
            const dyCh = mouseY - newY;
            newX += dxCh * speed;
            newY += dyCh * speed;
          }

          const dxMouse = mouseX - newX;
          const dyMouse = mouseY - newY;
          const facingRightExtra = dxMouse >= 0;
          angle = (Math.atan2(dyMouse, dxMouse) * 180) / Math.PI;

          return {
            ...ch,
            x: newX,
            y: newY,
            angle,
            facing: facingRightExtra ? "right" : "left",
            explodeX,
            explodeY,
          };
        })
      );

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  


  return (
    <div>
      <img
        className="main-cursor"
        src={chickenImg}
        alt="Chicken"
        ref={mainCursor}
      />
      {extraChickens.map((ch) => (
        <img
          key={ch.id}
          src={chickenImg}
          alt="Chicken"
          className="extra-chicken"
          style={{
            position: "absolute",
            left: ch.x,
            top: ch.y,
            transform: `rotate(${ch.angle}deg) scaleX(${ch.facing === "right" ? 1 : -1})`,
            transition: "transform 0.1s linear",
          }}
        />
      ))}
    </div>
  );
}