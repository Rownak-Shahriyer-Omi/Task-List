const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

const createLink = () => {
  // create a li element(input)
  const li = document.createElement("li");

  // Add a class name
  li.className = "collection-item";

  // create a text node and add it to list item
  li.appendChild(document.createTextNode(taskInput.value));

  // create a link node
  const link = document.createElement("a");

  // add class name to icon
  link.className = "delete-item secondary-content";

  // creating an icon and adding icon to link item
  const icon = document.createElement("i");
  icon.className = "fa fa-remove";
  link.appendChild(icon);

  // adding link to the list litem
  li.appendChild(link);

  // adding individual li item to the list
  taskList.appendChild(li);
  taskInput.value = "";
};

// Event Listeners
const addTask = (event) => {
  if (taskInput.value === "") {
    alert("Add a task!!!");
  } else {
    createLink();
    event.preventDefault();
  }
};

const removeTask = (event) => {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      event.target.parentElement.parentElement.remove();
    }
  }
};

const removeAllTask = (event) => {
  if (taskList.childElementCount > 0) {
    if (confirm("Are you damn sure")) {
      taskList.innerHTML = "";
    }
  } else {
    alert("You don't have any task to remove!!!");
  }
};

// const print = () => console.log("key up");
// const printa = () => console.log("key down");

const filterTask = (event) => {
  const text = event.target.value.toLowerCase();
  console.log(text);
  taskList.childNodes.forEach((list_item) => {
    if (list_item.textContent.toLocaleLowerCase().indexOf(text) !== -1) {
      //it matched as !== -1
      list_item.style.display = "block";
    } else {
      list_item.style.display = "none";
    }
  });
};

// load all event listeners

const loadEventListeners = () => {
  // Add a task
  form.addEventListener("submit", addTask);
  // remove a task
  taskList.addEventListener("click", removeTask);
  // remove all task
  clearBtn.addEventListener("click", removeAllTask);
  // filter all task
  filter.addEventListener("keyup", filterTask);
  // filter.addEventListener("keydown", printa);
};

loadEventListeners();
