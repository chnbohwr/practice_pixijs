import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import { promiseLoad } from '../utils/index';

const settingStats = () => {
  const stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.left = null;
  stats.dom.style.right = 0;
  document.body.appendChild(stats.dom);
  const calc = () => { stats.begin(); stats.end(); requestAnimationFrame(calc); };
  calc();
};

const initApp = async () => {
  console.log('initApp');
  const app = new PIXI.Application({
    width: 100,
    height: 100,
    view: document.getElementById('pixi'),
  });
  window.app = app;
  app.loader.add('cat', 'resources/cat.png');
  await promiseLoad(app.loader);
  const cat = new PIXI.Sprite(app.loader.resources.cat.texture);
  app.stage.addChild(cat);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
