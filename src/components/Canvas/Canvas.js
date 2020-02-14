import React, { useRef, useEffect } from 'react';
import styled from 'styled-components'

import Anubis from '../../images/anubis_map.png';
import canvasStyle from './Canvas.css';
import RedButton from '../RedButton/RedButton'

const imageBkg = styled.img.attrs({
    src: Anubis,
  })`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: -999;
`;


const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


const renderCanvas = (refCanvas, refImage) => {
  const ctx = refCanvas.current.getContext('2d');
  let image = new Image();

  refCanvas.current.width = window.innerWidth;
  refCanvas.current.height = window.innerHeight;

  image.onload = function() {
    refCanvas.current.width = image.width;
    refCanvas.current.height = image.height;
    ctx.drawImage(refImage, 0, 0);
  };


  ctx.strokeStyle = '#FFBF00';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 10;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(e, color) {
    if (!isDrawing) return; // stop the func from running when hey are not moused

    ctx.beginPath();
    // Start from 0
    ctx.moveTo(lastX, lastY);

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
  // https://youtu.be/8ZGAzJ0drl0?t=363
  refCanvas.current.addEventListener('mousemove', draw);
  refCanvas.current.addEventListener('mousedown', e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  refCanvas.current.addEventListener('mouseup', () => (isDrawing = false));
  refCanvas.current.addEventListener('mouseout', () => (isDrawing = false));
};



const Canvas = () => {
  const refCanvas = useRef(null);
  const refImage = useRef(null);

  useEffect(() => {
    renderCanvas(refCanvas, refImage);
  }, [])

  return (
    <div clasName={canvasStyle}>
      <RedButton>Reset</RedButton>
      <canvas ref={refCanvas} id="draw"></canvas>
      <imageBkg ref={refImage}></imageBkg>
      <img ref={refImage} src={Anubis} />
    </div>
  );
}

export default Canvas