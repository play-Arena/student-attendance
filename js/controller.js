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

  const getData = () => {
    return model.getData();
  };

  const prepareData = () => {
    let data = getDataFromLocalStore();
    model.setTotalDays(12);
    if (!data || data.length === 0) {
      data = utils.getMockData(getTotalDays());
      setDataToLocalStore(data);
    }
    return data;
  };

  const modifyDataPoint = (name, dayIndex, isPresent) => {
    model.modifyData(name, dayIndex, isPresent);
    view.updateCount(name, isPresent);
    setDataToLocalStore(getData());
  };

  const getStudentNames = () => {
    return Object.keys(getData()).sort();
  };

  const getAbsentDayCount = name => {
    const data = getData();
    const currentStudent = data[name];
    return currentStudent.reduce((acc, curr) => {
      return !curr ? ++acc : acc;
    }, 0);
  };

  const initController = () => {
    model.init(prepareData());
    view.init();
    view.render();
  };

  return {
    init: initController,
    changeAttendance: modifyDataPoint,
    getTotalDays,
    getData,
    getNames: getStudentNames,
    getMissedDays: getAbsentDayCount
  };
})();
