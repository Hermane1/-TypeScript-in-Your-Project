"use strict"; // Enforces strict mode, which helps catch common coding mistakes and "unsafe" actions such as defining global variables accidentally.

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the input field, add button, and todo list elements.
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load saved todos from localStorage. Use default empty array if none found.
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    // Add each saved todo to the DOM.
    savedTodos.forEach(todo => addTodoToDOM(todo));

    // Attach event listeners to the add button and input field.
    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', function (event) {
        // Add a todo when the Enter key is pressed.
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Function to add a new todo item.
    function addTodo() {
        const todoText = input.value.trim(); // Get and trim the input text.
        if (todoText !== '') { // Proceed only if the input is not empty.
            // Create a new todo object with a unique ID based on the current timestamp.
            const todo = { text: todoText, id: Date.now() };
            // Add the new todo to the DOM.
            addTodoToDOM(todo);
            // Save the new todo to localStorage.
            saveTodoToStorage(todo);
            // Clear the input field.
            input.value = '';
        }
    }

    // Function to add a todo item to the DOM.
    function addTodoToDOM(todo) {
        const li = document.createElement('li'); // Create a new list item element.
        li.textContent = todo.text; // Set the text content to the todo's text.
        li.dataset.id = todo.id.toString(); // Store the todo ID in a data attribute for easy access.
        // Add an event listener to handle click events on the list item.
        li.addEventListener('click', function () {
            li.classList.add('completed'); // Mark the todo as completed by adding a CSS class.
            // After 1 second, remove the todo from the DOM and localStorage.
            setTimeout(() => {
                removeTodoFromDOM(li);
                removeTodoFromStorage(todo.id);
            }, 1000);
        });
        // Append the new list item to the todo list.
        todoList.appendChild(li);
    }

    // Function to remove a todo item from the DOM.
    function removeTodoFromDOM(todoElement) {
        todoElement.remove(); // Remove the element from the DOM.
    }

    // Function to save a todo item to localStorage.
    function saveTodoToStorage(todo) {
        // Retrieve the current todos from localStorage or initialize as an empty array.
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo); // Add the new todo to the array.
        // Save the updated todos array back to localStorage.
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to remove a todo item from localStorage.
    function removeTodoFromStorage(id) {
        // Retrieve the current todos from localStorage or initialize as an empty array.
        let todos = localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : [];
        // Filter out the todo with the given ID.
        todos = todos.filter(todo => todo.id !== id);
        // Save the updated todos array back to localStorage.
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
