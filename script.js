const inputTask = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const btnAdd = document.getElementById("btnAdd");
const btnSortOrder = document.getElementById("btnSortOrder");
const btnSortDate = document.getElementById("btnSortDate");
const btnSortAlphabet = document.getElementById("btnSortAlphabet");

const todoList = document.getElementById("todoList");

let tasks = [];

function renderTodoList() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.classList.toggle("completed", task.completed);

    div.innerHTML = `
            <p>${task.newTask}</p>
            <p>${task.deadline}</p>
            <input type = "checkbox" ${task.completed ? "checked" : ""} >
            <button class="delete">delete</button>
        `;

    div
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", (e) => {
        task.completed = e.target.checked;
        renderTodoList();
      });

    div.querySelector(".delete").addEventListener("click", () => {
      tasks = tasks.filter((t) => t !== task);
      renderTodoList();
    });

    todoList.appendChild(div);
  });
}

btnAdd.addEventListener("click", () => {
  const newTask = inputTask.value.trim();
  const deadline = inputDate.value;

  if (newTask === "") {
    alert("Please write task");
    inputTask.scrollIntoView({ behavior: "smooth" });
    inputTask.focus();
    return;
  }
  if (deadline === "") {
    alert("Please write deadline");
    inputDate.scrollIntoView({ behavior: "smooth" });
    inputDate.focus();
    return;
  }
  if (tasks.some((task) => task.newTask === newTask)) {
    alert("This task already added! add a new task");
    inputTask.value = "";
    inputDate.value = "";
    inputTask.focus();
    return;
  }
  tasks.push({
    newTask: newTask,
    deadline: deadline,
    completed: false,
    createdDate: new Date(),
  });
  inputTask.value = "";
  inputDate.value = "";

  renderTodoList();
});

btnSortOrder.addEventListener("click", () => {
  tasks.sort((a, b) => a.createdDate - b.createdDate);
  renderTodoList();
});

btnSortDate.addEventListener("click", () => {
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  renderTodoList();
});

btnSortAlphabet.addEventListener("click", () => {
  tasks.sort((a, b) => a.newTask.localeCompare(b.newTask));
  renderTodoList();
});
