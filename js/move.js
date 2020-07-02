'use strict';

(function () {
  var dialogHandle = window.dialog.userDialog.querySelector('.upload');

  window.move = {
    dialogHandle: dialogHandle,

    // Запоминаем изначальное положение окна настройки персонажа
    dialogTop: window.dialog.userDialog.style.top,
    dialogLeft: window.dialog.userDialog.style.left,

    onMouseDown: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        window.dialog.userDialog.style.top = (window.dialog.userDialog.offsetTop - shift.y) + 'px';
        window.dialog.userDialog.style.left = (window.dialog.userDialog.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            dialogHandle.removeEventListener('click', onClickPreventDefault);
          };
          dialogHandle.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
