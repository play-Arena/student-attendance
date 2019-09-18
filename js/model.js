"use strict";

const model = (() => {
  let attendance = {};
  const days = 12;

  const setData = data => {
    attendance = { ...data };
  };

  const initModel = data => {
    setData(data);
  };

  const getDataCount = () => {
    return Object.keys(attendance).length;
  };

  const modifyData = (studentName, index, datum) => {
    attendance[studentName][index] = datum;
  };

  const getTotalDays = () => {
    return days;
  };

  const getData = () => {
    return { ...attendance };
  };

  return {
    init: initModel,
    length: getDataCount,
    getData,
    modifyData,
    getTotalDays
  };
})();
