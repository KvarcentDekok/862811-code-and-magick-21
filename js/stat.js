"use strict";

(function () {
  window.renderStatistics = function (ctx, names, times) {
    const CLOUD_X = 100;
    const CLOUD_Y = 10;
    const CLOUD_WIDTH = 420;
    const CLOUD_HEIGHT = 270;
    const FONT = `16px PT Mono`;
    const TEXT_COLOR = `#000000`;
    const GAP = 50;
    const BAR_WIDTH = 40;
    const leftX = CLOUD_X + GAP;
    const bottomY = CLOUD_Y + CLOUD_HEIGHT - 36;
    const minYBar = CLOUD_Y + 82;
    const maxHeightBar = CLOUD_HEIGHT - 128;

    renderRect(ctx, `rgba(0, 0, 0, 0.7)`, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderRect(ctx, `#FFFFFF`, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    renderText(ctx, FONT, CLOUD_X + 20, CLOUD_Y + 20, `Ура вы победили!`, TEXT_COLOR);
    renderText(ctx, FONT, CLOUD_X + 20, CLOUD_Y + 36, `Список результатов:`, TEXT_COLOR);

    for (let i = 0; i < names.length; i++) {
      renderText(ctx, FONT, leftX + (BAR_WIDTH + GAP) * i, bottomY, names[i], TEXT_COLOR);

      let barColor;
      let maxTime = window.util.getMaxElem(times);
      let currentHeightBar = maxHeightBar * times[i] / maxTime;
      let currentYBar = minYBar + (maxHeightBar - currentHeightBar);
      let currentYTime = currentYBar - 20;

      if (names[i] === `Вы`) {
        barColor = `rgba(255, 0, 0, 1)`;
      } else {
        barColor = `hsl(240, ${window.util.getRandomInt(1, 100)}%, 50%)`;
      }

      renderRect(ctx, barColor, leftX + (BAR_WIDTH + GAP) * i, currentYBar, BAR_WIDTH, currentHeightBar);
      renderText(ctx, FONT, leftX + (BAR_WIDTH + GAP) * i, currentYTime, Math.round(times[i]), TEXT_COLOR);
    }
  };

  function renderRect(ctx, color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function renderText(ctx, font, x, y, text, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = `hanging`;
    ctx.fillText(text, x, y);
  }
})();

