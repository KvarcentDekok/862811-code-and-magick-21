"use strict";

const setupBlock = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupForm = setupBlock.querySelector(`.setup-wizard-form`);
const setupClose = setupBlock.querySelector(`.setup-close`);
const setupUserName = setupBlock.querySelector(`.setup-user-name`);
const setupWizard = setupBlock.querySelector(`.setup-wizard`);
const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupWizardFireball = setupBlock.querySelector(`.setup-fireball-wrap`);
const coatColorInput = setupBlock.querySelector(`[name="coat-color"]`);
const eyesColorInput = setupBlock.querySelector(`[name="eyes-color"]`);
const fireballColorInput = setupWizardFireball.querySelector(`[name="fireball-color"]`);

let isSimilarWizardsLoaded = false;

function onPopupEscPress(evt) {
  const activeElement = document.activeElement;

  if (evt.key === `Escape` && activeElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
}

function openPopup() {
  setupBlock.classList.remove(`hidden`);

  if (!isSimilarWizardsLoaded) {
    window.backend.load(
        function (response) {
          window.similarWizards.update(response);
          isSimilarWizardsLoaded = true;
        },
        function (error) {
          window.similarWizards.error(`Не удалось загрузить похожих волшебников: ${error}`);
        });
  }

  document.addEventListener(`keydown`, onPopupEscPress);
}

function closePopup() {
  setupBlock.classList.add(`hidden`);
  setupBlock.removeAttribute(`style`);

  document.removeEventListener(`keydown`, onPopupEscPress);
}

function errorSubmit(errorMessage) {
  window.util.addError(errorMessage);
}

function submitForm(evt) {
  const errorBlock = document.querySelector(`.error`);

  if (errorBlock) {
    errorBlock.remove();
  }

  evt.preventDefault();

  window.backend.save(
      new FormData(setupForm),
      function () {
        closePopup();
      },
      function (error) {
        errorSubmit(error);
      });
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
  window.similarWizards.update(
      null,
      window.colorize.changeColorNext(window.colorize.coat, coatColorInput, setupWizardCoat, `fill`),
      `coat`
  );
});

setupWizardEyes.addEventListener(`click`, function () {
  window.similarWizards.update(
      null,
      window.colorize.changeColorNext(window.colorize.eyes, eyesColorInput, setupWizardEyes, `fill`),
      `eyes`
  );
});

setupWizardFireball.addEventListener(`click`, function () {
  window.colorize.changeColorNext(window.colorize.fireball, fireballColorInput, setupWizardFireball, `background`);
});

setupForm.addEventListener(`submit`, function (evt) {
  submitForm(evt);
});

