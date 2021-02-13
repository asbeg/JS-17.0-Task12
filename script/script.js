const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerButton = document.querySelector('.header-button');

let todoData = [];
if (localStorage.getItem('todoData') !== null) {
    todoData = JSON.parse(localStorage.getItem("todoData"));
}

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' + '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' + '</div>';

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemoved = li.querySelector('.todo-remove');
        btnTodoRemoved.addEventListener('click', function () {
            todoData.splice(todoData.indexOf(item), 1);
            li.parentNode.removeChild(li);
            localStorage.clear();
            render();
        });

        localStorage.setItem('todoData', JSON.stringify(todoData));
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.length === 0) {
        headerButton.disabled;
    } else {
        const newTodo = {
            value: headerInput.value,
            completed: false
        }
        todoData.push(newTodo);
        headerInput.value = '';
    }
    render();
});

render();