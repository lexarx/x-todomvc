const Store = require('./store');
const ObservableList = require('x-observable-list');
const TodoItem = require('./todo-item');
const uuid = require('./uuid');

class TodoController {
	constructor() {
		this.store = new Store('todos-lexarx');
		this.todos = new ObservableList();
		this.todos.changed.add(this.onTodosChanged, this);
		var todos = this.store.load().map(this.createTodoItem, this);
		this.todos.addAll(todos);
	}

	onTodosChanged(index, removedTodos, addedTodos) {
		this.save();
		removedTodos.forEach(todoItem => {
			todoItem.title.changed.remove(this.save, this);
			todoItem.completed.changed.remove(this.save, this);
		});
		addedTodos.forEach(todoItem => {
			todoItem.title.changed.add(this.save, this);
			todoItem.completed.changed.add(this.save, this);
		});
	}

	createTodoItem(data) {
		return new TodoItem(data, this.todos);
	}

	addTodo(title) {
		const todoItem = this.createTodoItem({
			id: uuid(),
			title: title,
			completed: false
		});
		this.todos.add(todoItem);
	}

	save() {
		const todos = this.todos.map(todoItem => ({
			id: todoItem.id,
			title: todoItem.title.get(),
			completed: todoItem.completed.get()
		}));
		this.store.save(todos);
	}
}

module.exports = TodoController;