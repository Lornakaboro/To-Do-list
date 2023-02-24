// css files here
import "./style.css";
import TaskList from "../modules/displayList.js";
import * as Element from "../modules/elements.js";

const newTask = new TaskList();

const getCheckbox = (element) =>
  ` ${
    element.completed
      ? `<input type="checkbox" aria-label="${element.index}" data-name="status" name="check" checked>`
      : `<input type="checkbox" aria-label="${element.index}" data-name="status" name="check">`
  } `;

const getTaskItem = (element) => `<div class="list show">
                ${getCheckbox(element)}                
                <p class="taskdescription ${
                  element.completed ? "strike" : ""
                }">${element.description}</p>
               <i class="fa fa-ellipsis-v fa-2x menu-icon" aria-label="${
                 element.index
               }"  data-name="edit"></i>
          </div>`;

const getDescription = (element) => `<div class="list edit">
          ${getCheckbox(element)} 
         <input type="text" class="desc" value="${
           element.description
         }" aria-label ="${element.index}" >
         <i class="fa fa-trash-o fa-2x" aria-label="${
           element.index
         }"  data-name="delete"></i>
   </div>`;

const refreshList = () => {
  const list = newTask.listArray;
  let content = "";
  if (list) {
    list.forEach((element) => {
      content += `${
        element.edit ? getDescription(element) : getTaskItem(element)
      }`;
    });
  }
  Element.listBody.innerHTML = content;
};
refreshList();

// Event Listeners
Element.addList.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    const val = Element.addList.value;
    if (val) {
      newTask.addNewTask(val);
      Element.addList.value = "";
      refreshList();
    }
  }
});

Element.listBody.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    if (e.target.dataset.name === "edit") {
      newTask.setEditTask(e.target.ariaLabel);
      refreshList();
    } else if (e.target.dataset.name === "delete") {
      newTask.removeTask(parseInt(e.target.ariaLabel, 10));
      refreshList();
    }
  }
});

Element.listBody.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    const { target } = e;
    if (target.tagName === "INPUT" && target.classList.contains("desc")) {
      const id = parseInt(target.getAttribute("aria-label"), 10);
      newTask.editTask(id, target.value);
      refreshList();
    }
  }
});

Element.listBody.addEventListener("change", (e) => {
  if (e.target.dataset.name === "status") {
    newTask.changeTaskCompletionStatus(parseInt(e.target.ariaLabel, 10));
    refreshList();
  }
});

Element.clear.addEventListener("click", () => {
  newTask.removeCompletedTasks();
  refreshList();
});
