"use strict";

(function () {
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
    setupBlock.removeAttribute(`style`);

    document.removeEventListener(`keydown`, onPopupEscPress);
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
    window.colors.change(window.colors.coat, coatColorInput, setupWizardCoat, `fill`);
  });

  setupWizardEyes.addEventListener(`click`, function () {
    window.colors.change(window.colors.eyes, eyesColorInput, setupWizardEyes, `fill`);
  });

  setupWizardFireball.addEventListener(`click`, function () {
    window.colors.change(window.colors.fireball, fireballColorInput, setupWizardFireball, `background`);
  });
})();
