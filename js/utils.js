'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESCAPE = 27;

  var getRandomArrayElement = function (array) {
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  };

  var getRandomArrayElementsCollection = function (array, newArrayLength) {
    var newArray = [];

    for (var i = 0; i < newArrayLength; i++) {
      var rand = Math.floor(Math.random() * array.length);

      newArray.push(array[rand]);
      array.splice(rand, 1);
    }
    return newArray;
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      action();
    }
  };

  var onKeyDown = function (evt, action, userNameInput, setupSubmit) {
    if ((evt.keyCode === KEY_CODE_ESCAPE) && (userNameInput !== document.activeElement)) {
      evt.preventDefault();
      action();
    } else if ((evt.keyCode === KEY_CODE_ENTER) && (setupSubmit !== document.activeElement)) {
      evt.preventDefault();
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayElementsCollection: getRandomArrayElementsCollection,
    isEnterEvent: isEnterEvent,
    onKeyDown: onKeyDown,
    errorHandler: errorHandler
  };
})();
