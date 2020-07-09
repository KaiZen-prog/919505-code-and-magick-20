'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var userDialog = document.querySelector('.setup');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupSubmit = userDialog.querySelector('.setup-submit');

  var form = userDialog.querySelector('.setup-wizard-form');

  // Валидация полей
  var onUserNameInputInvalid = function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var onUserNameInputChange = function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  // Отправка формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, window.utils.errorHandler);

    onClosePopup();
  };

  // Настройки внешнего вида мага
  var setupWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var setupWizardCoatInput = userDialog.querySelector('input[name="coat-color"]');
  var setupWizardEyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var setupWizardFireballInput = userDialog.querySelector('input[name="fireball-color"]');

  var onChangeCoatColor = function () {
    window.wizards.customize(setupWizardCoat, 'coat', setupWizardCoatInput);
  };

  var onChangeEyeColor = function () {
    window.wizards.customize(setupWizardEyes, 'eye', setupWizardEyesInput);
  };

  var onChangeFireBallColor = function () {
    window.wizards.customize(setupWizardFireball, 'fireBall', setupWizardFireballInput);
  };

  // Обработчик поведения "ручки" окна персонажа, за которую мы можем его перетаскивать
  var onDialogHandleMouseDown = function (evt) {
    window.dialogHandle.onMouseDown(evt);
  };

  // Открытие/закрытие окна настройки персонажа
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');

  var onOpenPopupKeydown = function (evt) {
    window.utils.isEnterEvent(evt, onOpenPopup);
  };

  var onClosePopupKeydown = function (evt) {
    window.utils.isEnterEvent(evt, onClosePopup);
  };

  var onPopupKeyDown = function (evt) {
    window.utils.onKeyDown(evt, onClosePopup, userNameInput, setupSubmit);
  };

  var dialogHandle = userDialog.querySelector('.upload');

  var onOpenPopup = function () {
    window.load(window.wizards.onLoad, window.utils.errorHandler);

    document.addEventListener('keydown', onPopupKeyDown);

    dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);

    setupOpen.removeEventListener('click', onOpenPopup);
    setupOpen.removeEventListener('keydown', onOpenPopupKeydown);

    setupClose.addEventListener('click', onClosePopup);
    setupClose.addEventListener('keydown', onClosePopupKeydown);

    setupWizardCoat.addEventListener('click', onChangeCoatColor);
    setupWizardEyes.addEventListener('click', onChangeEyeColor);
    setupWizardFireball.addEventListener('click', onChangeFireBallColor);

    userNameInput.addEventListener('invalid', onUserNameInputInvalid);
    userNameInput.addEventListener('input', onUserNameInputChange);

    form.addEventListener('submit', onFormSubmit);

    userDialog.classList.remove('hidden');
  };

  var onClosePopup = function () {
    // При каждом закрытии окна настройки персонажа, возвращаем его на исходные координаты
    userDialog.style.top = window.dialogHandle.top;
    userDialog.style.left = window.dialogHandle.left;

    userDialog.classList.add('hidden');
    window.wizards.removeSimilar();

    document.removeEventListener('keydown', onPopupKeyDown);

    dialogHandle.removeEventListener('mousedown', onDialogHandleMouseDown);

    setupOpen.addEventListener('click', onOpenPopup);
    setupOpen.addEventListener('keydown', onOpenPopupKeydown);

    setupClose.removeEventListener('click', onClosePopup);
    setupClose.removeEventListener('keydown', onClosePopupKeydown);

    setupWizardCoat.removeEventListener('click', onChangeCoatColor);
    setupWizardEyes.removeEventListener('click', onChangeEyeColor);
    setupWizardFireball.removeEventListener('click', onChangeFireBallColor);

    userNameInput.removeEventListener('invalid', onUserNameInputInvalid);
    userNameInput.removeEventListener('input', onUserNameInputChange);

    form.removeEventListener('submit', onFormSubmit);
  };

  setupOpen.addEventListener('click', onOpenPopup);
  setupOpen.addEventListener('keydown', onOpenPopupKeydown);
})();
