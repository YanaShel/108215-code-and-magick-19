'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SHADOW = 10;
var GAP = 15;
var GAP_FONT = 20;
var GAP_BETWEEN_COLUMNS = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function (ctx, x, y, width, heigth, color) {
  var offset = 5;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - offset, y + heigth * 0.25);
  ctx.lineTo(x + offset, y + heigth * 0.50);
  ctx.lineTo(x - offset, y + heigth * 0.75);
  ctx.lineTo(x, y + heigth);
  ctx.lineTo(x + width * 0.25, y + heigth - offset);
  ctx.lineTo(x + width * 0.50, y + heigth + offset);
  ctx.lineTo(x + width * 0.75, y + heigth - offset);
  ctx.lineTo(x + width, y + heigth);
  ctx.lineTo(x + width + offset, y + heigth * 0.75);
  ctx.lineTo(x + width - offset, y + heigth * 0.50);
  ctx.lineTo(x + width + offset, y + heigth * 0.25);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width * 0.75, y + offset);
  ctx.lineTo(x + width * 0.50, y - offset);
  ctx.lineTo(x + width * 0.25, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

var drawRect = function (ctx, x, y, width, heigth) {
  ctx.fillRect(x, y, width, heigth);
};

var drawText = function (ctx, text, x, y) {
  ctx.fillText(text, x, y);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(256, 256, 256, 1.0)');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  drawText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + GAP_FONT);
  drawText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + GAP_FONT * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    // отрисовка имени игрока
    drawText(ctx, names[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + GAP_BETWEEN_COLUMNS) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
  }

  for (var j = 0; j < times.length; j++) {
    // отрисовка колонки
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturationColor = Math.floor(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + saturationColor + '%, 50%)';
    }
    drawRect(ctx, CLOUD_X + GAP * 2 + (BAR_WIDTH + GAP_BETWEEN_COLUMNS) * j, CLOUD_HEIGHT - GAP_FONT, BAR_WIDTH, -times[j] * barHeight / maxTime);
    // время прохождения игры
    ctx.fillStyle = '#000';
    drawText(ctx, Math.floor(times[j]), CLOUD_X + GAP * 2 + (BAR_WIDTH + GAP_BETWEEN_COLUMNS) * j, CLOUD_HEIGHT - (times[j] * barHeight / maxTime) - GAP_FONT - GAP);
  }
};
