function getToDoList() {
  const toDoListFromLocalStorage = localStorage.getItem("toDoList");
  if (toDoListFromLocalStorage === null) {
    var toDoList = [];
  } else {
    var toDoList = JSON.parse(toDoListFromLocalStorage);
  }

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
    const index = toDoList.length - 1;
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    addLi(toDoInfo, index);
    form.reset();
  }
}

function addLi(element, index) {
  const toDoList = getToDoList();
  if (element.done === true) {
    var isChecked = " type= 'checkbox' + checked ";
    var lisId = '<li class = "checked" id="';
  } else {
    var isChecked = " type= 'checkbox'";
    var lisId = '<li id="';
  }
  const ol = document.getElementsByTagName("ol")[0];

  const li = `${lisId}li-${index}">
    <button id='${element.toDo}-delete'>Delete</button>
    <div id = 'textForTimeAndToDo-${index}'>
    <div id = 'textForSort-${index}'>
    <div id ='toDo-${index}'>${element.toDo}</div>
    at
    <div id ='time-${index}'>${element.time}
    </div> </div> </div> </div>
    <div class = 'hidden' id = 'textboxsAndEnterButton-${index}'>
    <input id ='toDo2-${index}'type = 'textbox' value ='${element.toDo}'></input>
    at
    <input type ='time' id ='time2-${index}'type = 'textbox' value ='${element.time}'></input>
    <button type = 'submit' id = 'enterButton-${index}'> Confirm Text Value </button>
    </div> </input> </div> </div>
    <input${isChecked} id='${element.toDo}-checkbox-${index}'></input>
    </li>
  `;

  const indexToString = index.toString();
  ol.insertAdjacentHTML("beforeend", li);
  const deleteButton = document.getElementById(element.toDo + "-delete");
  deleteButton.addEventListener("click", deleteToDo);
  console.log(element.toDo);
  liArray.push(element.toDo);
  const checkboxQuery = element.toDo + "-checkbox-" + indexToString;
  const checkbox = document.getElementById(checkboxQuery);

  checkbox.addEventListener("click", boxCheck);
  const toDoCheckbox = document.getElementById("toDo-" + indexToString);
  const timeCheckbox = document.getElementById("time-" + indexToString);
  timeCheckbox.addEventListener("click", hideTextDiv);
  toDoCheckbox.addEventListener("click", hideTextDiv);
  const enterButton = document.getElementById("enterButton-" + indexToString);
  enterButton.addEventListener("click", hideTextboxDiv);
  const timeSortButton = document.getElementById("timeSortButton-");
  timeSortButton.addEventListener("click", callSortTimes);
  const alphabeticalSortButton = document.getElementById(
    "alphabeticalSortButton-"
  );
  alphabeticalSortButton.addEventListener("click", callSortAlpabetical);
}

function callSortAlpabetical(event) {
  const toDoList = getToDoList();
  toDoList.sort((a, b) => a.toDo.localeCompare(b.toDo));
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  location.reload();
}

function toDoSort() {
  var input, filter, ol, li, a, i, txtValue;
  input = document.getElementById("searchToDo");
  filter = input.value.toLowerCase();
  ol = document.getElementById("List");
  li = ol.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = document.getElementById("textForSort-" + i);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function callSortTimes(event) {
  const toDoList = getToDoList();
  sortTimes(toDoList);

  localStorage;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  location.reload();
}

function sortTimes(toDoList) {
  return toDoList.sort(function (a, b) {
    if (parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]) === 0) {
      return parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1]);
    } else {
      return parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]);
    }
  });
}

function hideTextboxDiv(event) {
  const index = event.target.id.split("-")[1];
  const textboxsAndEnter = document.getElementById(
    "textboxsAndEnterButton-" + index
  );
  textboxsAndEnter.classList.toggle("hidden");
  const textForTimeAndToDo = document.getElementById(
    "textForTimeAndToDo-" + index
  );
  const toDoList = getToDoList();
  const toDoTextboxText = document.getElementById("toDo2-" + index).value;
  const timeTextboxText = document.getElementById("time2-" + index).value;
  const toDoToUpdate = toDoList[index];
  if (textForTimeAndToDo.classList.contains("hidden")) {
    textForTimeAndToDo.classList.toggle("hidden");
    document.getElementById("toDo-" + index).innerHTML = toDoTextboxText;
    document.getElementById("time-" + index).innerHTML = timeTextboxText;
  }
  toDoToUpdate.toDo = toDoTextboxText;
  toDoToUpdate.time = timeTextboxText;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function hideTextDiv(event) {
  const index = event.target.id.split("-")[1];
  const textForTimeAndToDo = document.getElementById(
    "textForTimeAndToDo-" + index
  );
  textForTimeAndToDo.classList.toggle("hidden");
  const textboxsAndEnter = document.getElementById(
    "textboxsAndEnterButton-" + index
  );
  if (textboxsAndEnter.classList.contains("hidden")) {
    textboxsAndEnter.classList.toggle("hidden");
  }
}

function boxCheck(event) {
  const toDoList = getToDoList();
  const indexThatWasChecked = event.target.id.split("-")[2];
  const toDoToUpdate = toDoList[indexThatWasChecked];
  const toDoCheckbox = document.getElementById("toDo-" + indexThatWasChecked);
  const timeCheckbox = document.getElementById("time-" + indexThatWasChecked);
  const liId = "li-" + indexThatWasChecked;
  if (event.target.checked === true) {
    toDoToUpdate.done = true;
    timeCheckbox.removeEventListener("click", hideTextDiv);
    toDoCheckbox.removeEventListener("click", hideTextDiv);
    document.getElementById(liId).classList.add("checked");
  } else {
    toDoToUpdate.done = false;
    document.getElementById(liId).classList.remove("checked");
    timeCheckbox.addEventListener("click", hideTextDiv);
    toDoCheckbox.addEventListener("click", hideTextDiv);
  }

  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

getToDoList().forEach((element, index) => addLi(element, index));

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
    toDoList.forEach((element, index) => addLi(element, index));
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
