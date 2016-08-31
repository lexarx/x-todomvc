const Observable = require('x-observable');

class TodoItem {
	constructor(data, todos) {
		this.id = data.id;
		this.title = new Observable(data.title);
		this.completed = new Observable(data.completed);
		this.todos = todos;
	}

	remove() {
		this.todos.remove(this);
	}
}

module.exports = TodoItem;