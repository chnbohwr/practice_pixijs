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

const initApp = async () => {
  let scale = 1500;
  const app = new PIXI.Application({
    width: 600,
    height: 600,
    view: document.getElementById('pixi'),
  });
  //app.stage.interactive = true;
  const container = new PIXI.Container();
  app.stage.addChild(container);
  const displacementSprite = PIXI.Sprite.from('resources/ripple4.png');
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  app.stage.addChild(displacementSprite);
  container.filters = [displacementFilter];
  displacementFilter.scale.x = scale;
  displacementFilter.scale.y = scale;
  displacementSprite.scale.set(0.6);
  displacementSprite.anchor.set(0.5);
  const bg = PIXI.Sprite.from('resources/background.jpg');
  bg.width = app.renderer.width;
  bg.height = app.renderer.height;
  bg.alpha = 1;
  container.addChild(bg);
  bg.interactive = true;

  const onClick = () => {
    if (scale > 0) {
      scale -= 10;
      displacementFilter.scale.x = scale;
      displacementFilter.scale.y = scale;
      requestAnimationFrame(onClick);
    } else {
      scale = 1500;
      displacementFilter.scale.x = scale;
      displacementFilter.scale.y = scale;
    }
  };

  bg.on('click', () => {
    if (scale === 1500) { onClick(); }
  });
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    settingStats();
    initApp();
  }
};
