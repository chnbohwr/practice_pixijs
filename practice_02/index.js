import * as PIXI from 'pixi.js';
import { radians, degrees } from 'radians';
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
  app.loader.add('potion', 'resources/potion.png');
  await promiseLoad(app.loader);
  const frame = new PIXI.Rectangle(0, 0, 64, 64);
  app.loader.resources.potion.texture.frame = frame;
  const potion = new PIXI.Sprite(app.loader.resources.potion.texture);
  potion.x = 64;
  potion.y = 64;
  potion.anchor.x = 0.5;
  potion.anchor.y = 0.5;
  potion.rotation = degrees(90);
  app.stage.addChild(potion);

  app.ticker.add(() => {
    let degree = radians(potion.rotation);
    if (degree < 360) {
      degree += 1;
    } else {
      degree = 0;
    }
    potion.rotation = degrees(degree);
  });
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
