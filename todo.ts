interface Todo {
    text: string;
    id: number;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input') as HTMLInputElement;
    const addButton = document.getElementById('add-button') as HTMLButtonElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;

    // Load saved todos from localStorage
const savedTodos: Todo[] = JSON.parse(localStorage.getItem('todos')!) || [];
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
            const todo: Todo = { text: todoText, id: Date.now() };
            addTodoToDOM(todo);
            saveTodoToStorage(todo);
            input.value = '';
        }
    }

    function addTodoToDOM(todo: Todo) {
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

    function removeTodoFromDOM(todoElement: HTMLElement) {
        todoElement.remove();
    }

    function saveTodoToStorage(todo: Todo) {
const todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromStorage(id: number) {
let todos: Todo[] = localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')!) : [];
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
