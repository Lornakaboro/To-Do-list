import './style.css';

const tasks = [
  {
    id: 1,
    toDo: 'Meditation',
    completed: true,
  },
  {
    id: 2,
    toDo: 'Learn Javasript',
    completed: true,
  },
  {
    id: 3,
    toDo: 'Exercise',
    completed: true,
  },
  {
    id: 4,
    toDo: 'Play guitar',
    completed: true,
  },
];

const listItems = document.getElementById('todo-list');

function filledTask() {
  let myTasks = '';
  tasks.forEach((job) => {
    myTasks += `
                <div class="task-list">
                    <input type="checkbox">
                    <p>${job.toDo}</p>
               
           <a><i class="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i>
                    </a>
                </div>`;
  });
  listItems.innerHTML = myTasks;
}
filledTask();