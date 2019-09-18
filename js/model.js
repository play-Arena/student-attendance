"use strict";

const model = (() => {
  let attendance = {};
  const initModel = data => {
    attendance = { ...data };
  };
  const getDataCount = () => {
    return Object.keys(attendance).length;
  };
  return {
    init: initModel,
    length: getDataCount
  };
})();
