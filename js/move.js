'use strict';

(function () {
  var dialogHandle = window.userDialog.userDialog.querySelector('.upload');

  window.move = {
    dialogHandle: dialogHandle,

    // Запоминаем изначальное положение окна настройки персонажа
    dialogTop: window.userDialog.userDialog.style.top,
    dialogLeft: window.userDialog.userDialog.style.left,

    onDialogHandleMouseDown: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onDialogHandleMouseMove = function (moveEvt) {
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
        window.userDialog.userDialog.style.top = (window.userDialog.userDialog.offsetTop - shift.y) + 'px';
        window.userDialog.userDialog.style.left = (window.userDialog.userDialog.offsetLeft - shift.x) + 'px';
      };

      var onDialogHandleMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onDialogHandleMouseMove);
        document.removeEventListener('mouseup', onDialogHandleMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            dialogHandle.removeEventListener('click', onClickPreventDefault);
          };
          dialogHandle.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onDialogHandleMouseMove);
      document.addEventListener('mouseup', onDialogHandleMouseUp);
    }
  };
})();
