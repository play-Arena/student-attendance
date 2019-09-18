"use strict";

const model = (() => {
  let attendance = {};
  let totalDays = 0;

  const setData = data => {
    attendance = { ...data };
  };

  const initModel = data => {
    setData(data);
  };

  const modifyData = (studentName, index, datum) => {
    attendance[studentName][index] = datum;
  };

  const setTotalDays = days => {
    totalDays = days;
  };

  const getTotalDays = () => {
    return totalDays;
  };

  const getData = () => {
    return { ...attendance };
  };

  return {
    init: initModel,
    getData,
    modifyData,
    getTotalDays,
    setTotalDays
  };
})();
