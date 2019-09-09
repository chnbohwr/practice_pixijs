/* eslint-disable no-param-reassign */
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

const registerKeyEvent = (potion) => {
  const keyDownMap = {
    37: () => { potion.vx = -5; }, // left
    38: () => { potion.vy = -5; }, // up
    39: () => { potion.vx = 5; }, // right
    40: () => { potion.vy = 5; }, // down
  };
  const keyUpMap = {
    37: () => { potion.vx = 0; }, // left
    38: () => { potion.vy = 0; }, // up
    39: () => { potion.vx = 0; }, // right
    40: () => { potion.vy = 0; }, // down
  };
  const keyDownEvent = (e) => { keyDownMap[e.keyCode](); };
  const keyUpEvent = (e) => { keyUpMap[e.keyCode](); };
  window.addEventListener('keydown', keyDownEvent);
  window.addEventListener('keyup', keyUpEvent);
};

const initApp = async () => {
  console.log('initApp');
  const app = new PIXI.Application({
    width: 500,
    height: 500,
    view: document.getElementById('pixi'),
  });
  window.app = app;
  app.loader.add('potion', 'resources/potion.png');
  await promiseLoad(app.loader);
  const frame = new PIXI.Rectangle(0, 0, 64, 64);
  app.loader.resources.potion.texture.frame = frame;
  const potion = new PIXI.Sprite(app.loader.resources.potion.texture);
  potion.vx = 0; potion.vy = 0;
  app.stage.addChild(potion);
  app.ticker.add(() => { potion.x += potion.vx; potion.y += potion.vy; });
  registerKeyEvent(potion);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
