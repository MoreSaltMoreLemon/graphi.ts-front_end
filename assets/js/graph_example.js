function drawExampleGraph() {
  
  let canvas = document.querySelector("canvas");
  let g = new Graphi(canvas);

  g.draw(canvas);
  canvas.addEventListener('mousemove', g.trackPos.bind(g));
  const sine = g.genFn(Math.sin, { x: 0, y: 200 }, canvas.width, 200, 50, 20);
  g.drawPoints(sine, 2, "blue");
  g.drawLine(sine, "blue");

  function naturalLog(x) {
      return Math.log(x);
  }
  function sahirFn(x) {
      return Math.pow(Math.atan(x), 1 / 3);
  }
  function trackPos(event) {
      console.log(event.y);
  }
}