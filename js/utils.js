"use strict";

const utils = (() => {
  const mockNames = [
    "Slappy the Frog",
    "Lilly the Lizard",
    "Paulrus the Walrus",
    "Gregory the Goat",
    "Adam the Anaconda"
  ];

  const getRandomBoolean = () => {
    return Math.random() >= 0.5;
  };

  const generateMockData = (size = 5) => {
    const mockData = {};
    mockNames.forEach((name, index) => {
      const dayCheck = [];
      for (let i = 0; i < size; i++) {
        dayCheck[i] = getRandomBoolean();
      }
      mockData[name] = [...dayCheck];
      dayCheck.length = 0;
    });
    return mockData;
  };

  return {
    getMockData: generateMockData
  };
})();
