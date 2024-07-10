document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load saved todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToDOM(todo));

    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = input.value.trim();
        if (todoText !== '') {
            const todo = { text: todoText, id: Date.now() };
            addTodoToDOM(todo);
            saveTodoToStorage(todo);
            input.value = '';
        }
    }

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.dataset.id = todo.id.toString();
        li.addEventListener('click', function() {
            li.classList.add('completed');
            setTimeout(() => {
                removeTodoFromDOM(li);
                removeTodoFromStorage(todo.id);
            }, 1000);
        });
        todoList.appendChild(li);
    }

    function removeTodoFromDOM(todoElement) {
        todoElement.remove();
    }

    function saveTodoToStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromStorage(id) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Example of using localStorage directly
    localStorage.setItem('username', 'todos');
    const storedUsername = localStorage.getItem('username');
    console.log('Stored Username:', storedUsername);

    // Remove the username from localStorage
    localStorage.removeItem('todos');
});