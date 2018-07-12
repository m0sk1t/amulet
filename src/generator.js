const generateImage = (canvas, cb) => {
  const ctx = canvas.getContext('2d');
  const valuesCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

  canvas.width = 200;
  canvas.height = 200;

  const renderAmulet = () => {
    const array = new Uint32Array(valuesCount);
    const values = crypto.getRandomValues(array);
    for (let i = 0; i < valuesCount; i++) {
      for (let l = 0; l < valuesCount; l++) {
        const value = String(values[i]);
        ctx.save();
        ctx.fillStyle = `rgb(${+(value[0] + value[1])},${+(value[2] + value[3])},${+(value[4] + value[5])})`;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.translate(100, 100);
        ctx.rotate(((2 * Math.PI) / valuesCount) * l);
        ctx.quadraticCurveTo(+(value[0] + value[1]), +(value[2] + value[3]), +(value[4] + value[5]), +(value[6] + value[7]));
        // ctx.quadraticCurveTo(+(value[0] + value[1]), +(value[2] + value[3]), 150, 150);
        // ctx.quadraticCurveTo(0, 0, 150, 150);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  const interval = setInterval(renderAmulet, 16);

  setTimeout(() => {
    clearInterval(interval);
    cb(new Image(canvas, height, width));
    // const data = canvas.toDataURL("image/png");
    // const wnd = window.open('about:blank','image from canvas');
    // wnd.document.write("<img src='" + data + "' alt='from canvas'/>");
  }, 160);

}

export default generateImage;
