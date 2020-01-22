'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SHADOW = 10;

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

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(256, 256, 256, 1.0)');
};
