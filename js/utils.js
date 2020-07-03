'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESCAPE = 27;

  window.utils = {
    getRandom: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    },

    onKeyDown: function (evt, action, userNameInput, setupSubmit) {
      if ((evt.keyCode === KEY_CODE_ESCAPE) && (userNameInput !== document.activeElement)) {
        evt.preventDefault();
        action();
      } else if ((evt.keyCode === KEY_CODE_ENTER) && (setupSubmit !== document.activeElement)) {
        evt.preventDefault();
      }
    }
  };
})();
