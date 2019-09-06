/* eslint-disable no-param-reassign */
import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import { degrees } from 'radians';
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

const addAlien = (app) => {
  const { mainTexture: { textures } } = app.loader.resources;
  const alienBeige = new PIXI.Sprite(textures['alienBeige.png']);
  const alienBlue = new PIXI.Sprite(textures['alienBlue.png']);
  alienBeige.x = 100;
  alienBeige.y = 100;
  alienBlue.x = 160;
  alienBlue.y = 100;
  alienBlue.buttonMode = true;
  alienBlue.interactive = true;
  app.stage.addChild(alienBeige);
  app.stage.addChild(alienBlue);
  return { alienBeige, alienBlue };
};



const initApp = async () => {
  console.log('initApp');
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    view: document.getElementById('pixi'),
  });
  window.app = app;
  app.loader.add({ name: 'mainTexture', url: 'resources/texture.json' });
  await promiseLoad(app.loader);
  const alienSprite = addAlien(app);
  let count = 0;
  const moveAlien = () => {
    alienSprite.alienBlue.x = 100 + Math.sin(degrees(count)) * 100;
    alienSprite.alienBlue.y = 100 + Math.cos(degrees(count)) * 100;
    alienSprite.alienBeige.y = 100 + Math.sin(degrees(count)) * 20;
    alienSprite.alienBlue.rotation = degrees(count);
    if (count === 360) { count = 0; } else { count += 1; }
  };
  app.ticker.add(moveAlien);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
