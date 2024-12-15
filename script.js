const inputTask = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const btnAdd = document.getElementById("btnAdd");

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
  });
  inputTask.value = "";
  inputDate.value = "";

  renderTodoList();
});
