import { Todo } from '../classes';
import { todoList } from '../index';

// Refereces to HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDelete = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filter');



export const createTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

};


// Events
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        console.log(txtInput.value);
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);

        createTodoHtml(newTodo);
        txtInput.value = '';

    }

});


divTodoList.addEventListener('click', (event) => {

    const elementName = event.target.localName;  // ---> input, label, button
    const elementTodo = event.target.parentElement.parentElement;
    const todoId = elementTodo.getAttribute('data-id');

    if (elementName.includes('input')) { //---> click on check

        todoList.markCompleted(todoId);
        elementTodo.classList.toggle('completed');

    } else if (elementName.includes('button')) { //---> we have to eliminate the todo

        todoList.eliminateTodo(todoId);
        divTodoList.removeChild(elementTodo);

    }


});


btnDelete.addEventListener('click', () => {

    todoList.eliminateCompleted();

    for (let i = divTodoList.children.length-1; i >= 0; i--) {

        const element = divTodoList.children[i];

        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }

    }

});


ulFilters.addEventListener('click', (event) => {

    const filter = event.target.text;
    if (!filter) {return;}

    anchorFilters.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for (const element of divTodoList.children) {

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch (filter) {

            case 'Pendings':
                if (completed) {
                    element.classList.add('hidden');
                }
            break;    
            
            case 'Completed':
                if (!completed) {
                    element.classList.add('hidden');
                }
            break;

        }
    }

});