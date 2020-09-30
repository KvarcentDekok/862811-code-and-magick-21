"use strict";

const names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const eyesColors = [`black`, `red`, `blue`, `yellow`, `green`];
const fireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const setupBlock = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setupBlock.querySelector(`.setup-close`);
const setupUserName = setupBlock.querySelector(`.setup-user-name`);
const setupWizard = setupBlock.querySelector(`.setup-wizard`);
const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupWizardFireball = setupBlock.querySelector(`.setup-fireball-wrap`);
const coatColorInput = setupBlock.querySelector(`[name="coat-color"]`);
const eyesColorInput = setupBlock.querySelector(`[name="eyes-color"]`);
const fireballColorInput = setupWizardFireball.querySelector(`[name="fireball-color"]`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getName() {
  return `${names[getRandomInt(0, names.length - 1)]} ${surnames[getRandomInt(0, surnames.length - 1)]}`;
}

function renderWizard(wizard, similarWizardTemplate) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  const setupSimilarLabel = wizardElement.querySelector(`.setup-similar-label`);
  const wizardCoat = wizardElement.querySelector(`.wizard-coat`);
  const wizardEyes = wizardElement.querySelector(`.wizard-eyes`);

  setupSimilarLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
}

function initSimilarWizards() {
  const NUMBER_OF_WIZARDS = 4;

  const wizards = [];
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const similarWizardsFragment = document.createDocumentFragment();
  const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
  const setupSimilarListBlock = setupSimilarBlock.querySelector(`.setup-similar-list`);

  for (let i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards[i] = {
      name: getName(),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    };

    similarWizardsFragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  setupSimilarListBlock.appendChild(similarWizardsFragment);
  setupSimilarBlock.classList.remove(`hidden`);
}

function onPopupEscPress(evt) {
  const activeElement = document.activeElement;

  if (evt.key === `Escape` && activeElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
}

function openPopup() {
  setupBlock.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
}

function closePopup() {
  setupBlock.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
}

function changeColor(colors, input, element, property) {
  let color;

  if (colors.indexOf(input.value) === colors.length - 1) {
    color = colors[0];
  } else {
    color = colors[colors.indexOf(input.value) + 1];
  }

  element.style[property] = color;
  input.value = color;
}

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupWizardCoat.addEventListener(`click`, function () {
  changeColor(coatColors, coatColorInput, setupWizardCoat, `fill`);
});

setupWizardEyes.addEventListener(`click`, function () {
  changeColor(eyesColors, eyesColorInput, setupWizardEyes, `fill`);
});

setupWizardFireball.addEventListener(`click`, function () {
  changeColor(fireballColors, fireballColorInput, setupWizardFireball, `background`);
});

initSimilarWizards();
