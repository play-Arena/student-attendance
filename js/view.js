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
        const checked = dayCheck ? "checked" : "";
        return `<td class="attend-col"><input data-id="${index}" type="checkbox" ${checked} />
                </td>`;
      })
      .join("");
  };

  const changeAttendance = ev => {
    const clickedInput = $(ev.currentTarget);
    const dayIndex = clickedInput.data("id");
    const studentName = clickedInput.closest("tr").data("name");
    !!clickedInput.attr("checked")
      ? clickedInput.removeAttr("checked")
      : clickedInput.attr("checked", "checked");
    const isPresent = !!clickedInput.attr("checked");
    controller.changeAttendance(studentName, dayIndex, isPresent);
  };

  const attachClickListenersonInputs = () => {
    $("td.attend-col input").click(changeAttendance);
  };

  const generateTableBodyTemplate = () => {
    const students = controller.getNames();
    const data = controller.getData();
    return students
      .map(student => {
        const attendance = data[student];
        const attendanceTpl = generateAttendanceTemplate(attendance);
        const missedDays = controller.getMissedDays(student);
        return `<tr class="student" data-name="${student}">
                    <td class="name-col">${student}</td>
                    ${attendanceTpl}
                    <td class="missed-col">${missedDays}</td>
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
    attachClickListenersonInputs();
  };

  const updateAbsentCount = (name, isPresent) => {
    const countDOM = $(`tr[data-name="${name}"] .missed-col`);
    let currentCount = !!countDOM.text() ? +countDOM.text() : 0;
    isPresent ? currentCount-- : currentCount++;
    countDOM.text(currentCount);
  };

  return {
    init: initView,
    render: renderView,
    updateCount: updateAbsentCount
  };
})();
