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

  const getTotalDays = () => {
    return model.getTotalDays();
  };

  const prepareData = () => {
    let data = getDataFromLocalStore();
    if (!data || data.length === 0) {
      data = utils.getMockData(getTotalDays());
      setDataToLocalStore(data);
    }
    return data;
  };

  const modifyDataPoint = (name, dayIndex, isPresent) => {
    model.modifyData(name, dayIndex, isPresent);
    setDataToLocalStore(model.getData());
  };

  const initController = () => {
    model.init(prepareData());
    view.init();
    view.render();
  };

  return {
    init: initController,
    changeAttendance: modifyDataPoint,
    getTotalDays
  };
})();
