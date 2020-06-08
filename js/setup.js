'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomString = function (strings) {
  return strings[getRandomInteger(strings.length)];
};

var getRandomInteger = function (i) {
  var rand = Math.random() * i;
  return Math.floor(rand);
};

var wizards = [
  {
    name: getRandomString(WIZARD_NAMES) + ' ' + getRandomString(WIZARD_SURNAMES),
    coatColor: WIZARD_COATCOLORS[getRandomInteger(WIZARD_COATCOLORS.length)],
    eyeColor: WIZARD_EYECOLORS[getRandomInteger(WIZARD_EYECOLORS.length)],
  },
  {
    name: getRandomString(WIZARD_NAMES) + ' ' + getRandomString(WIZARD_SURNAMES),
    coatColor: WIZARD_COATCOLORS[getRandomInteger(WIZARD_COATCOLORS.length)],
    eyeColor: WIZARD_EYECOLORS[getRandomInteger(WIZARD_EYECOLORS.length)],
  },
  {
    name: getRandomString(WIZARD_NAMES) + ' ' + getRandomString(WIZARD_SURNAMES),
    coatColor: WIZARD_COATCOLORS[getRandomInteger(WIZARD_COATCOLORS.length)],
    eyeColor: WIZARD_EYECOLORS[getRandomInteger(WIZARD_EYECOLORS.length)],
  },
  {
    name: getRandomString(WIZARD_NAMES) + ' ' + getRandomString(WIZARD_SURNAMES),
    coatColor: WIZARD_COATCOLORS[getRandomInteger(WIZARD_COATCOLORS.length)],
    eyeColor: WIZARD_EYECOLORS[getRandomInteger(WIZARD_EYECOLORS.length)],
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
