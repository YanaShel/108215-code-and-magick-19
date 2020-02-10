'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var StatusCode = {
    OK: 200,
    FOUND: 302,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };
  var TIMEOUT_IN_MS = 10000;

  var getStatusCode = function (xhr, onLoad, onError) {
    switch (xhr.status) {
      case StatusCode.OK:
        onLoad(xhr.response);
        break;
      case StatusCode.FOUND:
        onError('Запрошенный документ временно доступен по другому URI');
        break;
      case StatusCode.BAD_REQUEST:
        onError('Cервер обнаружил в вашем запросе синтаксическую ошибку');
        break;
      case StatusCode.NOT_FOUND:
        onError('Ошибка в написании адреса Web-страницы');
        break;
      case StatusCode.INTERNAL_SERVER_ERROR:
        onError('Ошибка сервера');
        break;
      case StatusCode.SERVICE_UNAVAILABLE:
        onError('Сервер временно не имеет возможности обрабатывать запросы по техническим причинам');
        break;
      default:
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      getStatusCode(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      getStatusCode(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
