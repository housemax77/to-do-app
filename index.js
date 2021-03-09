// import { event } from "cypress/types/jquery";

function getToDoList() {
  const toDoListFromLocalStorage = localStorage.getItem("toDoList");
  if (toDoListFromLocalStorage === null) {
    var toDoList = [];
  } else {
    var toDoList = JSON.parse(toDoListFromLocalStorage);
  }

  // window.addEventListener("beforeunload", function (event) {
  //   event.preventDefault();
  //   const toDoList = getToDoList();
  //   toDoList.forEach((toDo, index) => {
  //     // checkBeforeUnload(toDo, index);
  //   });
  // });

  // function checkBeforeUnload(toDo, index) {
  //   const timeChanged =
  //     document.getElementById("time2-" + index).value !== toDo.time;
  //   const toDoChanged =
  //     document.getElementById("toDo2-" + index).value !== toDo.toDo;
  //   const enterButton = "enterButton-" + index;
  //   // if (toDoChanged === true) {
  //   hideTextboxDiv(enterButton);
  // } else if (timeChanged === true) {
  //   hideTextboxDiv(enterButton);
  // }
  // }

  function whatToSortBy() {
    const getLocalStorage = localStorage.getItem("sortBy");
    const getText = document.getElementById("sortBy");
    if (getLocalStorage === null) {
      getText.innerHTML = "Not Sorting";
    } else {
      getText.innerHTML = getLocalStorage;
    }
  }

  whatToSortBy();

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

  if (isItemValid && isTimeValid) {
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
  const sortBy = localStorage.getItem("sortBy");
  if (sortBy === "Sorting By Time") {
    callSortTimes();
  } else if (sortBy === "Sorting Alphabetically") {
    sortAlpabetically(event);
  }
}

function addLi(element, index) {
  if (element.done === true) {
    var isChecked = " type= 'checkbox' + checked ";
    var lisId = '<li class = "checked" id="';
  } else {
    var isChecked = " type= 'checkbox'";
    var lisId = '<li id="';
  }
  const ol = document.getElementsByTagName("ol")[0];

  const li = `${lisId}li-${index}" aria-label='${element.toDo} Li Index ${index}'>
    <button aria-label='Delete ${element.toDo} To Do' id='${element.toDo}-delete'>Delete</button>
    <div id = 'textForTimeAndToDo-${index}'>
      <div id = 'textForSort-${index}'>
        <div id ='toDo-${index}'>${element.toDo}</div>
          at
      <div id ='time-${index}'>${element.time}
    </div> </div> </div> </div>
      <div class = 'hidden' id ='textboxsAndEnterButton-${index}'>
      <input type = "text" id ='toDo2-${index}' aria-label="Enter New Text For ${element.toDo} Here" value="${element.toDo}"/>
      at
      <input type = "time" id ='time2-${index}' aria-label="Enter New Time For ${element.time} Here" value="${element.time}"/>
      <button type = 'submit' id = 'enterButton-${index}'> Save Changes </button>
    </div> </input> </div>  
      <input ${isChecked} aria-label="Check ${element.toDo} At Index ${index} As Done" id='${element.toDo}-checkbox-${index}'></input>
    </li>
  `;
  ol.insertAdjacentHTML("beforeend", li);
  const indexToString = index.toString();
  const enterButton = document.getElementById("enterButton-" + indexToString);
  const deleteButton = document.getElementById(element.toDo + "-delete");
  deleteButton.addEventListener("click", deleteToDo);
  console.log(element.toDo);
  liArray.push(element.toDo);
  const checkboxQuery = element.toDo + "-checkbox-" + indexToString;
  const checkbox = document.getElementById(checkboxQuery);
  checkbox.addEventListener("click", boxCheck);
  const timeText = document.getElementById("time-" + indexToString);
  const toDoText = document.getElementById("toDo-" + indexToString);
  timeText.addEventListener("click", hideTextDiv);
  toDoText.addEventListener("click", hideTextDiv);
  enterButton.addEventListener("click", hideTextboxDiv);
  const timeSortButton = document.getElementById("timeSortButton-");
  timeSortButton.addEventListener("click", callSortTimes);
  const alphabeticalSortButton = document.getElementById(
    "alphabeticalSortButton-"
  );
  alphabeticalSortButton.addEventListener("click", sortAlpabetically);
  // hideTextboxDiv(enterButton);
}

function sortAlpabetically(event) {
  getToDoList().forEach((element, index) => {
    const timeTextbox = document.getElementById("time2-" + index);
    debugger;
    document.getElementById("time-" + index).innerHTML = timeTextbox.value;
    document.getElementById(
      "toDo-" + index
    ).innerHTML = document.getElementById("toDo2-" + index).value;
    localStorage.getItem("sortBy");
    localStorage.setItem("sortBy", "Sorting Alphabetically");

    const toDoList = getToDoList();
    toDoList.sort((a, b) => a.toDo.localeCompare(b.toDo));
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    renderLis();
    localStorage.setItem("sortBy", "Sorting Alphabetically");
  });
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

function callSortTimes() {
  const toDoList = getToDoList();
  sortTimes(toDoList);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  renderLis();
  document.getElementById("sortBy").innerHTML = "Sorting By Time";
  localStorage.setItem("sortBy", "Sorting By Time");
  location.reload;
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
  debugger;
  const sortBy = localStorage.getItem("sortBy");
  if (sortBy === "Sorting By Time") {
    callSortTimes();
  } else if (sortBy === "Sorting Alphabetically") {
    sortAlpabetically(event);
  }
  var index = event.target.id.split("-")[1];
  const textboxAndEnter = document.getElementById(
    "textboxsAndEnterButton-" + index
  );
  const textForTimeAndToDo = document.getElementById(
    "textForTimeAndToDo-" + index
  );
  const toDoList = getToDoList();
  const toDoTextboxText = document.getElementById("toDo2-" + index).value;
  const timeTextboxText = document.getElementById("time2-" + index).value;
  const toDoToUpdate = toDoList[index];
  toDoToUpdate.toDo = toDoTextboxText;
  toDoToUpdate.time = timeTextboxText;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  if (textForTimeAndToDo.classList.contains("hidden")) {
    document.getElementById("toDo-" + index).innerHTML = toDoTextboxText;
    document.getElementById("time-" + index).innerHTML = timeTextboxText;
  }
  textboxAndEnter.classList.toggle("hidden");
  textForTimeAndToDo.classList.toggle("hidden");
}

function hideTextDiv(event) {
  if (event.target.id === null) {
    var index = document.getElementById(event);
  } else {
    var index = event.target.id.split("-")[1];
  }
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
  const toDoTextbox = document.getElementById("toDo-" + indexThatWasChecked);
  const timeTextbox = document.getElementById("time-" + indexThatWasChecked);
  const liId = "li-" + indexThatWasChecked;
  if (event.target.checked === true) {
    toDoToUpdate.done = true;
    timeTextbox.removeEventListener("click", hideTextDiv);
    toDoTextbox.removeEventListener("click", hideTextDiv);
    document.getElementById(liId).classList.add("checked");
  } else {
    toDoToUpdate.done = false;
    document.getElementById(liId).classList.remove("checked");
    timeTextbox.addEventListener("click", hideTextDiv);
    toDoTextbox.addEventListener("click", hideTextDiv);
  }

  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
function renderLis() {
  document.getElementById("List").innerHTML = "";
  getToDoList().forEach((element, index) => addLi(element, index));
}

renderLis();

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
    localStorage.setItem(
      "toDoList",
      JSON.stringify(toDoList).replace("undefined", "")
    );
    document.getElementById("List").innerHTML = renderLis();
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
