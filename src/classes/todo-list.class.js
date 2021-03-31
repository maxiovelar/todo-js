import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        // this.todos = [];
        this.uploadLocalStorage();

    }

    
    newTodo(todo) {
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    
    eliminateTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id)
        this.saveLocalStorage();

    }

    
    markCompleted(id) {

        for(const todo of this.todos) {

            console.log(id, todo.id);
            if (todo.id == id) {
    
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }

        }

    }

    
    eliminateCompleted() {

        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveLocalStorage();

    }


    saveLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));

    }


    uploadLocalStorage(){

        // if (localStorage.getItem('todo')) {

        //     this.todos = JSON.parse(localStorage.getItem('todo'));

        // } else {
        //     this.todos = [];
        // }

        this.todos = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));

    }

}