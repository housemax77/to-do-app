// import { event } from "cypress/types/jquery";

function getToDoList() {
  // Reading from localStorage is "expensive" (in other words, slow and uses a lot of CPU). So, consider writing to a global variable declared at the top of this file, and use it instead of constantly reading from localStorage.
  const toDoListFromLocalStorage = localStorage.getItem("toDoList");
  const toDoList =
    toDoListFromLocalStorage === null
      ? []
      : JSON.parse(toDoListFromLocalStorage);
  return toDoList;
}

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  const toDoList = getToDoList();
  toDoList.forEach((toDo, index) => {
    checkBeforeUnload(toDo, index);
  });
});

function checkBeforeUnload(toDo, index) {
  const timeChanged =
    document.getElementById("timeTextbox" + index).value !== toDo.time;
  const toDoChanged =
    document.getElementById("toDo2-" + index).value !== toDo.toDo;
  const enterButton = "enterButton-" + index;
  if (toDoChanged === true || timeChanged === true) {
    hideTextboxDiv(enterButton.split("-")[1]);
  }
}

function passSortingMethod() {
  const whatToSortBy = localStorage.getItem("sortBy");
  const getText = document.getElementById("sortBy");
  if (whatToSortBy === null) {
    getText.innerHTML = "Not Sorting";
  } else {
    getText.innerHTML = whatToSortBy;
  }
}

passSortingMethod();

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
      // Use object shorthand (can omit the right side when it matches the left)
      toDo: toDo,
      time: time,
    };
    toDoList.push(toDoInfo);
    const lastElementIndex = toDoList.length - 1;
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    addLi(toDoInfo, lastElementIndex);
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
    <button class= "delete-button" aria-label='Delete ${element.toDo} To Do' id='${element.toDo}-delete'>Delete</button>
    <div aria-label="To Do and time text ${index}" id = 'textForTimeAndToDo-${index}'>
        <div id ='toDo-${index}'>${element.toDo}</div>
          at
      <div id ='time-${index}'>${element.time}
    </div> </div> </div> </div>
      <div class = 'hidden' id ='textboxsAndEnterButton-${index}'>
      <input type = "text" id ='toDo2-${index}' aria-label="Enter New Text For ${element.toDo} Here" value="${element.toDo}"/>
      at
      <input type = "time" id ='timeTextbox${index}' aria-label="Enter New Time For ${element.time} Here" value="${element.time}"/>
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
  checkbox.addEventListener("click", evaluateOnBoxCheck);
  const timeText = document.getElementById("time-" + indexToString);
  const toDoText = document.getElementById("toDo-" + indexToString);
  timeText.addEventListener("click", hideTextDiv);
  toDoText.addEventListener("click", hideTextDiv);
  enterButton.addEventListener("click", handleSort);
  const timeSortButton = document.getElementById("timeSortButton-");
  timeSortButton.addEventListener("click", callSortTimes);
  const alphabeticalSortButton = document.getElementById(
    "alphabeticalSortButton-"
  );
  alphabeticalSortButton.addEventListener("click", sortAlpabetically);
}

function sortAlpabetically(event) {
  getToDoList().forEach((element, index) => {
    const timeTextbox = document.getElementById("timeTextbox" + index);
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
  });
}

function toDoSort() {
  // VAR is dead. Prefer const. Consider let. https://wesbos.com/is-var-dead
  const input = document.getElementById("searchToDo");
  const filter = input.value.toLowerCase();
  const ol = document.getElementById("List");
  const li = ol.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    const a = document.getElementById("textForTimeAndToDo-" + i);
    const txtValue = a.textContent || a.innerText;
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
  toDoList.forEach((element, index) =>
    document.getElementById("li-" + index).remove()
  );
  toDoList.forEach(addLi);
}

function sortTimes(toDoList) {
  return toDoList.sort(function (a, b) {
    const splitedTimeA = a.time.split(":");
    const splitedTimeB = b.time.split(":");
    if (parseInt(splitedTimeA[0]) - parseInt(splitedTimeB[0]) === 0) {
      return parseInt(splitedTimeA[1]) - parseInt(splitedTimeB[1]);
    } else {
      return parseInt(splitedTimeA[0]) - parseInt(splitedTimeB[0]);
    }
  });
}

function handleSort(event) {
  const index = event.target.id.split("-")[1];
  const textboxAndEnter = document.getElementById(
    "textboxsAndEnterButton-" + index
  );
  const textForTimeAndToDo = document.getElementById(
    "textForTimeAndToDo-" + index
  );
  textboxAndEnter.classList.toggle("hidden");
  textForTimeAndToDo.classList.toggle("hidden");
  const sortBy = localStorage.getItem("sortBy");
  if (sortBy === "Sorting By Time") {
    callSortTimes();
  } else if (sortBy === "Sorting Alphabetically") {
    sortAlpabetically(event);
  }
  hideTextboxDiv(index);
}

function hideTextboxDiv(index) {
  const textboxAndEnter = document.getElementById(
    "textboxsAndEnterButton-" + index
  );
  const toDoList = getToDoList();
  const toDoTextboxText = document.getElementById("toDo2-" + index).value;
  const timeTextboxText = document.getElementById("timeTextbox" + index).value;
  const toDoToUpdate = toDoList[index];
  toDoToUpdate.toDo = toDoTextboxText;
  toDoToUpdate.time = timeTextboxText;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  if (textboxAndEnter.classList.contains("hidden")) {
    document.getElementById("toDo-" + index).innerHTML = toDoTextboxText;
    document.getElementById("time-" + index).innerHTML = timeTextboxText;
  }
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
  textboxsAndEnter.classList.toggle("hidden");
}

function evaluateOnBoxCheck(event) {
  const toDoList = getToDoList();
  const indexThatWasChecked = event.target.id.split("-")[2];
  const toDoToUpdate = toDoList[indexThatWasChecked];
  const toDoTextbox = document.getElementById("toDo-" + indexThatWasChecked);
  const timeTextbox = document.getElementById("time-" + indexThatWasChecked);
  const liId = "li-" + indexThatWasChecked;
  const isTextboxChecked = event.target.checked;
  toDoToUpdate.done = isTextboxChecked;
  if (isTextboxChecked) {
    timeTextbox.removeEventListener("click", hideTextDiv);
    toDoTextbox.removeEventListener("click", hideTextDiv);
    document.getElementById(liId).classList.add("checked");
  } else {
    document.getElementById(liId).classList.remove("checked");
    timeTextbox.addEventListener("click", hideTextDiv);
    toDoTextbox.addEventListener("click", hideTextDiv);
  }

  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function renderLis() {
  document.getElementById("List").innerHTML = "";
  // Can use point-free style here instead if you prefer:
  // getToDoList().forEach(addLi);
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
    return false;
  }
  return true;
}

function deleteToDo(event) {
  const toDoList = getToDoList();
  // Why is this called rightIndex? Perhaps indexToDelete?
  const rightIndex = toDoList.indexOf(event.target.id - "-delete");
  const userConfirmedDelete = confirm(
    "Do you want to delete " + event.target.id.replace("-delete", "") + "?"
  );

  if (!userConfirmedDelete) return false;
  toDoList.splice(rightIndex, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  document.getElementById("List").innerHTML = renderLis();
  toDoList.forEach((element, index) => addLi(element, index));
}

function testTime(time) {
  if (time !== "") {
    return true;
  } else {
    alert("You can not submit empty time.");
    return false;
  }
}

form.addEventListener("submit", handleSubmit);
