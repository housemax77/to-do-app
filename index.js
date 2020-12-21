const toDoList = localStorage.getItem("toDoList");

function handleSubmit(event) {
  event.preventDefault();
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
function checkLocalStorage() {
  if (toDoList === null) {
    return [];
  } else {
    return JSON.parse(toDoList);
  }
}

const liArray = [];

function addLi(element) {
  const ol = document.getElementsByTagName("ol")[0];
  const li =
    '<li id="' +
    element.toDo +
    "-li" +
    '"> <button id="' +
    element.toDo +
    "-delete" +
    '"> Delete </button>' +
    element.toDo +
    " at " +
    element.time +
    "<input type='checkbox' id='" +
    element.toDo +
    "-checkbox' />" +
    "</li>";
  ol.insertAdjacentHTML("beforeend", li);
  const deleteButton = document.getElementById(element.toDo + "-delete");
  const checkbox = document.getElementById(element.toDo + "-checkbox");
  deleteButton.addEventListener("click", deleteToDo);
  checkbox.addEventListener("change", boxCheck);
  console.log(element.toDo);
  liArray.push(element.toDo);
  document.getElementById(element.toDo);
}

document.getElementsByTagName("ol")[0].addEventListener("click", deleteToDo);

toDoList.forEach((element) => addLi(element));

const form = document.getElementById("form");

function testToDo(toDo, toDoInfos) {
  if (toDo === "") {
    alert("You can not submit empty to do's.");
    return false;
  }

  if (toDoInfos.find((todo) => todo.toDo === toDo)) {
    alert("You can not submit duplicate to do's.");
    form.reset();
    return false;
  }
  return true;
}
function deleteToDo(event) {
  debugger;
  const getToDoList = localStorage.getItem("toDoList");
  var makeArray = JSON.parse(getToDoList);
  const rightIndex = makeArray.indexOf(event.target.id - "-delete");
  if (confirm("Do you want to delete " + event.target.id + "?")) {
    makeArray.splice(rightIndex, 1);
    localStorage.setItem("toDoList", JSON.stringify(makeArray));
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
