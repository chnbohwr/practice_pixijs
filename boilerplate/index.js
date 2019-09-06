import * as PIXI from 'pixi.js';
const stage = new PIXI.Container();

const initApp = () => {
  console.log('initApp');
  const renderer = PIXI.autoDetectRenderer(800, 600, document.getElementById('pixi'));
  renderer.render(stage);
}

document.onreadystatechange = () =>
  (document.readyState == "complete") && initApp();