'use strict';

var wizards = [];

// массивы данных для рандомайзера
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// элементы
var userDialog = document.querySelector('.setup');
var similarElement = userDialog.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// рандомайзер в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// рандомайзер массивов
function getRandomArray(array, n) {
  var i = 0;
  var randomArray = [];
  while (i < n) {
    var randomArrayIndex = getRandomInt(0, array.length - 1);
    if (randomArray.indexOf(array[randomArrayIndex]) < 0) {
      randomArray[i] = array[randomArrayIndex];
      i++;
    }
  }
  return randomArray;
}

// генератор массива объектов
function generateRandomObject(count) {
  var randomNames = getRandomArray(names, count);
  var randomSurnames = getRandomArray(surnames, count);
  var randomCoats = getRandomArray(coatColors, count);
  var randomEyes = getRandomArray(eyesColors, count);

  for (var i = 0; i < count; i++) {
    wizards[i] = {
      'name': randomNames[i] + ' ' + randomSurnames[i],
      'coatColor': randomCoats[i],
      'eyesColor': randomEyes[i]
    };
  }
}

// генератор элементов шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

// отрисовка элементов шаблона
function renderSimilarItems() {
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
    similarListElement.appendChild(fragment);
  }
}

// показываем модалку персонажа
function showSetup() {
  userDialog.classList.remove('hidden');
}

// показываем блок похожих персонажей
function showSimilar() {
  similarElement.classList.remove('hidden');
}

generateRandomObject(4);
showSetup();
showSimilar();
renderSimilarItems();
