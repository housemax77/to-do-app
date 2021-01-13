function getToDoList() {
  const toDoListFromLocalStorage = localStorage.getItem("toDoList");
  if (toDoListFromLocalStorage === null) {
    var toDoList = [];
  } else {
    var toDoList = JSON.parse(toDoListFromLocalStorage);
  }
  debugger;
  return toDoList;
}

const liArray = [];

function handleSubmit(event) {
  event.preventDefault();
  const toDoList = getToDoList();

  const toDo = document.getElementById("toDo").value;
  const time = document.getElementById("time").value;
  const isItemValid = testToDo(toDo, toDoList);
  const isTimeValid = testTime(time);

  if (isItemValid === true && isTimeValid === true) {
    const toDoInfo = {
      done: false,
      toDo: toDo,
      time: time,
    };
    toDoList.push(toDoInfo);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    addLi(toDoInfo);
    form.reset();
  }
}

function addLi(element) {
  debugger;
  if (element.done === true) {
    debugger;
    var isChecked = " type='checkbox' + checked ";
    var lisId = '<li class = "checked"' + 'id="';
    input.setAttribute("value", element.toDo);
  } else {
    var isChecked = " type='checkbox'";
    var lisId = '<li id="';
  }
  const ol = document.getElementsByTagName("ol")[0];
  const li =
    lisId +
    element.toDo +
    "-li" +
    '"> <button id="' +
    element.toDo +
    "-delete" +
    '"> Delete </button>"' +
    "<input type = 'textbox' id ='" +
    element.toDo +
    "-textbox'>" +
    "</input>" +
    " at " +
    "<input type = 'textbox' id ='" +
    element.time +
    "-textbox'>" +
    "</input>" +
    " </div> <input" +
    isChecked +
    " id='" +
    element.toDo +
    "-checkbox' />" +
    "</li>";
  // ol.replace("undefined", "");
  debugger;
  ol.insertAdjacentHTML("beforeend", li);
  const deleteButton = document.getElementById(element.toDo + "-delete");
  const checkbox = document.getElementById(element.toDo + "-checkbox");
  deleteButton.addEventListener("click", deleteToDo);
  debugger;
  checkbox.addEventListener("click", boxCheck);
  console.log(element.toDo);
  liArray.push(element.toDo);
  const toDoCheckBox = element.toDo.replace(
    element.toDo,
    element.toDo + "-textbox"
  );
  const toDoCheckboxId = document.getElementById(toDoCheckBox);
  debugger;
  toDoCheckboxId.value = element.toDo;
  const timeCheckBox = element.time.replace(
    element.time,
    element.time + "-textbox"
  );
  const timeCheckboxId = document.getElementById(timeCheckBox);
  debugger;
  timeCheckboxId.value = element.time;
  timeCheckboxId.addEventListener("change", timeChange);
  toDoCheckboxId.value = element.toDo;
  toDoCheckboxId.addEventListener("change", toDoChange);

  debugger;
}

function timeChange(event) {
  debugger;
  const toDoList = getToDoList();
  const indexThatWasChecked = toDoList.findIndex(
    (item) => item.time === event.target.id.replace("-textbox", "")
  );
  const toDoToUpdate = toDoList[indexThatWasChecked];
  toDoToUpdate.time = event.target.value;
  debugger;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  debugger;
}

function toDoChange(event) {
  debugger;
  const toDoList = getToDoList();
  const indexThatWasChecked = toDoList.findIndex(
    (item) => item.toDo === event.target.id.replace("-textbox", "")
  );
  const toDoToUpdate = toDoList[indexThatWasChecked];
  toDoToUpdate.toDo = event.target.value;
  debugger;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  debugger;
}

function boxCheck(event) {
  debugger;
  const toDoList = getToDoList();
  const indexThatWasChecked = toDoList.findIndex(
    (item) => item.toDo === event.target.id.replace("-checkbox", "")
  );
  const toDoToUpdate = toDoList[indexThatWasChecked];
  debugger;
  // const liId = toDoToUpdate.toDo.replace(
  //   toDoToUpdate.toDo,
  //   toDoToUpdate.toDo + "-liText"
  //   );
  const liId = event.target.id.replace("checkbox", "li");
  debugger;
  if (event.target.checked === true) {
    toDoToUpdate.done = true;
    document.getElementById(liId).classList.add("checked");
  } else {
    debugger;
    toDoToUpdate.done = false;
    document.getElementById(liId).classList.remove("checked");
  }
  debugger;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

getToDoList().forEach((element) => addLi(element));

const form = document.getElementById("form");

function testToDo(toDo, toDoInfo) {
  if (toDo === "") {
    alert("You can not submit empty to do's.");
    return false;
  }

  if (toDoInfo.find((todo) => todo.toDo === toDo)) {
    alert("You can not submit duplicate to do's.");
    form.reset();
    return false;
  }
  return true;
}
function deleteToDo(event) {
  debugger;
  const toDoList = getToDoList();
  const rightIndex = toDoList.indexOf(event.target.id - "-delete");
  if (
    confirm(
      "Do you want to delete " + event.target.id.replace("-delete", "") + "?"
    )
  ) {
    toDoList.splice(rightIndex, 1);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    location.reload();
    toDoList.forEach((element) => addLi(element));
    // debugger;
  } else {
    return false;
  }
}

function testTime(time) {
  if (time === "") {
    alert("You can not submit empty time.");
    return false;
  }
  return true;
}

form.addEventListener("submit", handleSubmit);
