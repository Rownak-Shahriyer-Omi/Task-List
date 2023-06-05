const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// everything inside the localStorage is saved as string
// So, when we get item = JSON.parse (convert string to obj)
// When we set item = JSON.stringify (convert obj to string)

const storeTaskInLocalStorage = (task) => {
  // getting item on localStorage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  // setting item in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTaskInLocalStorage = (list_item) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // my discovered way
  // tasks[tasks.indexOf(list_item.innerText)] = "";
  // tasks = tasks.filter((task) => task !== "");

  // instractors discovered way
  // tasks.forEach((task, index) => {
  //   // remove element from tasks array
  //   if (list_item.innerText === task) {
  //     tasks.splice(index, 1);
  //   }
  // });

  // my revolutionary way
  tasks.splice(tasks.indexOf(list_item.innerText), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeAllTaskInLocalStorage = () => {
  // localStorage.removeItem("tasks");
  localStorage.clear();
};

const getTaskFromLocalStorage = (event) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    // create a li element(input)
    const li = document.createElement("li");

    // Add a class name
    li.className = "collection-item";

    // create a text node and add it to list item
    li.appendChild(document.createTextNode(task));

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
  });
};

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

  // store to localStorage
  storeTaskInLocalStorage(taskInput.value);

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

// event.target.parentElement.parentElement.innerText
//   event.target.parentElement.parentElement.textContent for firefox;
const removeTask = (event) => {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      event.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskInLocalStorage(event.target.parentElement.parentElement);
    }
  }
};

const removeAllTask = (event) => {
  if (taskList.childElementCount > 0) {
    if (confirm("Are you damn sure")) {
      taskList.innerHTML = "";
      removeAllTaskInLocalStorage();
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

  // event listener for page relode
  document.addEventListener("DOMContentLoaded", getTaskFromLocalStorage);
};

loadEventListeners();
