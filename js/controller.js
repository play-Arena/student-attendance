"use strict";

const controller = (() => {
  const localStorageKey = "attendance";

  const getDataFromLocalStore = () => {
    try {
      return JSON.parse(localStorage.getItem(localStorageKey));
    } catch (err) {
      return;
    }
  };

  const setDataToLocalStore = data => {
    let stringifiedData;
    try {
      stringifiedData = JSON.stringify(data);
    } catch (err) {
      console.log("Invalid JSON");
      return;
    }
    localStorage.setItem(localStorageKey, stringifiedData);
  };

  const prepareData = () => {
    let data = getDataFromLocalStore();
    if (!data || data.length === 0) {
      data = utils.getMockData();
      setDataToLocalStore(data);
    }
    return data;
  };

  const initController = () => {
    model.init(prepareData());
  };

  return {
    init: initController
  };
})();
