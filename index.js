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
  const toDoList = localStorage.getItem("toDoList");
  if (toDoList === null) {
    return [];
  } else {
    return JSON.parse(toDoList);
  }
}

const toDoList = checkLocalStorage();

function uncheck(event) {
  const checkboxId = event.target.id;
  document.getElementById(checkboxId).checked = false;
}
 

function boxCheck(event) {
  debugger;
  const getList = document.getElementById("List");
  const id = event.target.id + "-li";
  const targetCheckbox = document.getElementById(checkbox);
  const getId = document.getElementById(id);
  const newToDos = toDoList.filter((toDo) => toDo.toDo !== event.target.id);
  if (window.confirm("Do you really want to delete " + event.target.id + "?")) {
    localStorage.setItem("toDoList", JSON.stringify(newToDos));
    getId.remove();
  }
  else if (targetCheckbox.checked === true) {
    const toDoArray = JSON.parse(toDoList);
    
  } 

function addLi(element) {
  const ol = document.getElementsByTagName("ol")[0];
  const li =
    '<li id="' +
    element.toDo +
    "-li" +
    '"> <button id="' +
    element.toDo +
    '"> Delete </button>' +
    element.toDo +
    " at " +
    element.time +
    "<input type='checkbox' id='" +
    element.toDo +
    "-checkbox' />" +
    "</li>";

  ol.insertAdjacentHTML("beforeend", li);
  console.log(element.toDo);
  const checkbox = document.getElementById(element.toDo);
  document.getElementById(element.toDo);
  window.addEventListener("check", boxCheck);
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

function testTime(time) {
  if (time === "") {
    alert("You can not submit empty time.");
    return false;
  }
  return true;
}

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
      time: time
    };
    toDoList.push(toDoInfo);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    addLi(toDoInfo);
    form.reset();
  }
}

form.addEventListener("submit", handleSubmit);
