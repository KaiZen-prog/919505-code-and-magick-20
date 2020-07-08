'use strict';

(function () {
  var URL_SEND = 'https://javascript.pages.academy/code-and-magick';
  var URL_GET = 'https://javascript.pages.academy/code-and-magick/data';

  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var successHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var errorHandler = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    successHandler(xhr, onLoad, onError);
    errorHandler(xhr, onError);

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };


  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    successHandler(xhr, onSuccess, onError);
    errorHandler(xhr, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };
})();
