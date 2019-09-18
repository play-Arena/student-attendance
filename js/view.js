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

  const generateAttendanceTemplate = attendance => {
    return attendance
      .map((dayCheck, index) => {
        return `<td class="attend-col"><input data-id=${index} type="checkbox" />
                </td>`;
      })
      .join("");
  };

  const generateTableBodyTemplate = () => {
    const students = controller.getNames();
    const data = controller.getData();
    return students
      .map(student => {
        const attendance = data[student];
        const attendanceTpl = generateAttendanceTemplate(attendance);
        return `<tr class="student" data-name=${student}>
                    <td class="name-col">${student}</td>
                    ${attendanceTpl}
                    <td class="missed-col">0</td>
                </tr>
        `;
      })
      .join("");
  };

  const getDOMRefs = () => {
    DOMRefsMap["thead"] = { ref: $("#table-head") };
    DOMRefsMap["tbody"] = { ref: $("#table-body") };
  };

  const initView = () => {
    const numberOfDays = controller.getTotalDays();
    getDOMRefs();
    DOMRefsMap["thead"]["tpl"] = generateTableHeaderTemplate(numberOfDays);
    DOMRefsMap["tbody"]["tpl"] = generateTableBodyTemplate();
  };

  const appendTemplate = DOMRefArr => {
    DOMRefArr.forEach(key => {
      DOMRefsMap[key].ref.append(DOMRefsMap[key].tpl);
    });
  };

  const renderView = () => {
    appendTemplate(["thead", "tbody"]);
  };

  return {
    init: initView,
    render: renderView
  };
})();
