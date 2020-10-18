"use strict";

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMaxElement(array) {
  let maxElement = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
}

function getRandomElement(array) {
  return array[window.util.getRandomInt(0, array.length - 1)];
}

window.util = {
  getRandomInt: getRandomInteger,
  getMaxElem: getMaxElement,
  getRandomElem: getRandomElement
};
