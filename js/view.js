"use strict";

const view = (() => {
  const DOMRefsMap = {};
  const generateTableHeaderTemplate = numberOfDays => {
    const dayIterator = new Array(numberOfDays).keys();
    const tplArray = [];
    for (let dayIndex of dayIterator) {
      tplArray.push(`<th>${++dayIndex}</th>`);
    }
    const daysHeaderTemplate = tplArray.join("");
    return `<tr>
      <th class="name-col">Student Name</th>
      ${daysHeaderTemplate}
      <th class="missed-col">Days Missed-col</th>
    </tr>`;
  };

  const getDOMRefs = () => {
    DOMRefsMap["thead"] = { ref: $("#table-head") };
    DOMRefsMap["tbody"] = { ref: $("#table-body") };
  };

  const initView = () => {
    const numberOfDays = controller.getTotalDays();
    getDOMRefs();
    DOMRefsMap["thead"]["tpl"] = generateTableHeaderTemplate(numberOfDays);
  };

  const renderView = () => {
    DOMRefsMap["thead"].ref.append(DOMRefsMap["thead"].tpl);
  };

  return {
    init: initView,
    render: renderView
  };
})();
