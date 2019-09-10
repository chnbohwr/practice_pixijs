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
  console.log('initApp');
  const app = new PIXI.Application({
    width: 600,
    height: 600,
    view: document.getElementById('pixi'),
  });
  window.app = app;
  let count = 0;
  const str = new PIXI.Text(count.toString(), { fill: 0xffffff });
  app.stage.addChild(str);
  const updateText = () => {
    if (count < Number.MAX_SAFE_INTEGER) {
      count += 1;
    } else {
      count = 0;
    }
    str.text = count.toString();
  };
  app.ticker.add(updateText);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // settingStats();
    initApp();
  }
};
