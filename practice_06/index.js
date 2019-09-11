import * as PIXI from 'pixi.js';
import Stats from 'stats.js';

const settingStats = () => {
  const stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.left = null;
  stats.dom.style.right = 0;
  document.body.appendChild(stats.dom);
  const calc = () => { stats.begin(); stats.end(); requestAnimationFrame(calc); };
  calc();
};

const generateDisplacementFilter = () => {
  const desFilter = new PIXI.filters.DisplacementFilter(PIXI.Sprite.from('resources/repple.png'));
  console.log(desFilter);
  return desFilter;
};



const initApp = async () => {
  const app = new PIXI.Application({
    width: 1200,
    height: 900,
    view: document.getElementById('pixi'),
  });
  app.stage.interactive = true;

  // make container
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // make container backgound
  const background = PIXI.Sprite.from('resources/background.jpg');
  container.addChild(background);

  // make sprite and filter
  const desSprite = PIXI.Sprite.from('resources/ripple3.png');
  desSprite.anchor.set(0.5);
  const desFilter = new PIXI.filters.DisplacementFilter(desSprite);
  container.filters = [desFilter];
  app.stage.addChild(desSprite);

  desFilter.scale.x = 50;
  desFilter.scale.y = 50;

  const onPointerMove = (eventData) => {
    desSprite.x = eventData.data.global.x;
    desSprite.y = eventData.data.global.y;
  };

  app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
  window.app = app;
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
