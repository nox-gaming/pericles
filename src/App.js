import React, { useState, useRef, useEffect } from 'react';

import './App.css';

function App() {
  const canvas = useRef();
  const [ user, setUser ] = useState({})

  useEffect(() => {
    console.log(canvas.current)
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 50;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let direction = true;

    function draw(e, color){
      if(!isDrawing) return; // stop the func from running when hey are not moused
      console.log(e)
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      // Start from 0
      ctx.moveTo(lastX, lastY);

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      [lastX, lastY] = [e.offsetX, e.offsetY];
      hue++;
      if(hue > 360) {
        hue = 0
      }
      if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
      }
      if (direction) {
        ctx.lineWidth++;
      } else {
        ctx.lineWidth--;
      }
    }
    // https://youtu.be/8ZGAzJ0drl0?t=363
    canvas.current.addEventListener('mousemove', draw)
    canvas.current.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    })
    canvas.current.addEventListener('mouseup', () => isDrawing = false)
    canvas.current.addEventListener('mouseout', () => isDrawing = false)
  }, [])


  useEffect(() => {
    setUser(user)
  }, [user])




  return (
    <div className="App">
      <canvas
        ref={canvas}
        id="draw"
        width="800"
        height="600"
        ></canvas>
    </div>
  );
}

export default App;
