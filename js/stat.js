'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var SLOGAN_GAP = 30;
var FONT_GAP = 16;
var COLUMN_GAP_X = 40;
var COLUMN_GAP_Y = 20;
var TIME_GAP = 10;
var COLUMN_DISTANCE = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  var randomNumber = Math.floor(Math.random() * 100);
  return 'hsl(240, ' + randomNumber.toString() + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + SLOGAN_GAP, CLOUD_Y + SLOGAN_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + SLOGAN_GAP, CLOUD_Y + SLOGAN_GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + COLUMN_GAP_X + (COLUMN_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - COLUMN_GAP_Y);
    ctx.fillText(Math.round(times[i]).toString(), CLOUD_X + COLUMN_GAP_X + (COLUMN_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - COLUMN_GAP_Y - FONT_GAP - ((BAR_HEIGHT * times[i]) / maxTime) - TIME_GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomColor();
    }
    ctx.fillRect(CLOUD_X + COLUMN_GAP_X + (COLUMN_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - COLUMN_GAP_Y - FONT_GAP, BAR_WIDTH, -1 * (BAR_HEIGHT * times[i]) / maxTime);
  }
};
