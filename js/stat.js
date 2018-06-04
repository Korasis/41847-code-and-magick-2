'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - BAR_GAP * 2;
var playerNameY = CLOUD_HEIGHT - CLOUD_Y + GAP;

var playerTime = 0;
var playerX = 0;
var playerTimeY = 0;
var playerBarY = 0;
var playerBarHeight = 0;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  // ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // too boring :)

  var cloudXGap = CLOUD_WIDTH / 6;
  var cloudYGap = CLOUD_HEIGHT / 5;

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Cloud top
  ctx.bezierCurveTo(x, y, x + 0.5 * cloudXGap, y - getRandomInt(10, 20), x + cloudXGap, y);
  ctx.bezierCurveTo(x + cloudXGap, y, x + 1.5 * cloudXGap, y - getRandomInt(10, 20), x + 2 * cloudXGap, y);
  ctx.bezierCurveTo(x + 2 * cloudXGap, y, x + 2.5 * cloudXGap, y - getRandomInt(10, 20), x + 3 * cloudXGap, y);
  ctx.bezierCurveTo(x + 3 * cloudXGap, y, x + 3.5 * cloudXGap, y - getRandomInt(10, 20), x + 4 * cloudXGap, y);
  ctx.bezierCurveTo(x + 4 * cloudXGap, y, x + 4.5 * cloudXGap, y - getRandomInt(10, 20), x + 5 * cloudXGap, y);
  ctx.bezierCurveTo(x + 5 * cloudXGap, y, x + 5.5 * cloudXGap, y - getRandomInt(10, 20), x + CLOUD_WIDTH, y);

  // Cloud right
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH + 0.25 * cloudXGap + getRandomInt(30, 50), y + 0.5 * cloudYGap, x + CLOUD_WIDTH + 0.5 * cloudXGap, y + cloudYGap);
  ctx.bezierCurveTo(x + CLOUD_WIDTH + 0.5 * cloudXGap, y + cloudYGap, x + CLOUD_WIDTH + 0.75 * cloudXGap + getRandomInt(30, 50), y + 1.5 * cloudYGap, x + CLOUD_WIDTH + cloudXGap, y + 2 * cloudYGap);
  ctx.bezierCurveTo(x + CLOUD_WIDTH + cloudXGap, y + 2 * cloudYGap, x + CLOUD_WIDTH + 1.25 * cloudXGap + getRandomInt(30, 50), y + 2.5 * cloudYGap, x + CLOUD_WIDTH + 1.5 * cloudXGap, y + 3 * cloudYGap);
  ctx.bezierCurveTo(x + CLOUD_WIDTH + 1.5 * cloudXGap, y + 3 * cloudYGap, x + CLOUD_WIDTH + 1.75 * cloudXGap + getRandomInt(30, 50), y + 3.5 * cloudYGap, x + CLOUD_WIDTH + cloudXGap, y + 4 * cloudYGap);
  ctx.bezierCurveTo(x + CLOUD_WIDTH + cloudXGap, y + 4 * cloudYGap, x + CLOUD_WIDTH + 0.5 * cloudXGap + getRandomInt(30, 50), y + 4.5 * cloudYGap, x + CLOUD_WIDTH, y + CLOUD_HEIGHT);

  // Cloud bottom
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + 5.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x + 5 * cloudXGap, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + 5 * cloudXGap, y + CLOUD_HEIGHT, x + 4.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x + 4 * cloudXGap, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + 4 * cloudXGap, y + CLOUD_HEIGHT, x + 3.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x + 3 * cloudXGap, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + 3 * cloudXGap, y + CLOUD_HEIGHT, x + 2.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x + 2 * cloudXGap, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + 2 * cloudXGap, y + CLOUD_HEIGHT, x + 1.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x + cloudXGap, y + CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + cloudXGap, y + CLOUD_HEIGHT, x + 0.5 * cloudXGap, y + CLOUD_HEIGHT + getRandomInt(10, 30), x, y + CLOUD_HEIGHT);

  // Cloud left
  ctx.bezierCurveTo(x, y + CLOUD_HEIGHT, x - 0.25 * cloudXGap - getRandomInt(10, 50), y + 4.5 * cloudYGap, x - 0.5 * cloudXGap, y + 4 * cloudYGap);
  ctx.bezierCurveTo(x - 0.5 * cloudXGap, y + 4 * cloudYGap, x - 0.75 * cloudXGap - getRandomInt(30, 50), y + 3.5 * cloudYGap, x - cloudXGap, y + 3 * cloudYGap);
  ctx.bezierCurveTo(x - cloudXGap, y + 3 * cloudYGap, x - 1.1 * cloudXGap - getRandomInt(30, 50), y + 2.5 * cloudYGap, x - 1.2 * cloudXGap, y + 2 * cloudYGap);
  ctx.bezierCurveTo(x - 1.2 * cloudXGap, y + 2 * cloudYGap, x - 1.1 * cloudXGap - getRandomInt(30, 50), y + 1.5 * cloudYGap, x - cloudXGap, y + cloudYGap);
  ctx.bezierCurveTo(x - cloudXGap, y + cloudYGap, x - 0.5 * cloudXGap - getRandomInt(30, 50), y + 0.5 * cloudYGap, x, y);

  ctx.closePath();
  ctx.fill();
};

// find max
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// generate random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// main renderer
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + BAR_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    playerTime = parseInt(times[i], 10);
    playerX = CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i;
    playerTimeY = CLOUD_Y + BAR_GAP + GAP * 2 + (barHeight - (barHeight * times[i]) / maxTime);
    playerBarY = CLOUD_Y + BAR_GAP + FONT_GAP + GAP + (barHeight - (barHeight * times[i]) / maxTime);
    playerBarHeight = (barHeight * times[i]) / maxTime - GAP;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], playerX, playerNameY);
    ctx.fillText(playerTime, playerX, playerTimeY);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var opacity = getRandomInt(1, 10) / 10;
      var saturation = getRandomInt(0, 255);
      ctx.fillStyle = 'rgba(0, 0, ' + saturation + ', ' + opacity + ')';
    }

    ctx.fillRect(playerX, playerBarY, BAR_WIDTH, playerBarHeight);
  }
};
