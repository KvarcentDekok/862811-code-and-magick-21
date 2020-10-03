"use strict";

(function () {
  window.util = {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getMaxElement(array) {
      let maxElement = array[0];

      for (let i = 1; i < array.length; i++) {
        if (array[i] > maxElement) {
          maxElement = array[i];
        }
      }

      return maxElement;
    },
    getRandomElement(array) {
      return array[this.getRandomInt(0, array.length - 1)];
    }
  };
})();
