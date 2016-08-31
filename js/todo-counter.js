const Observable = require('x-observable');

class TodoCounter {
	constructor(todos) {
		this.todos = todos;
		this.all = new Observable();
		this.completed = new Observable();
		this.remaining = new Observable();
		this.update();
		this.todos.forEach(this.subscribeToChanges, this);
		this.todos.changed.add(this.onTodosChanged, this);
	}

	update() {
		const all = this.todos.size();
		this.all.set(all);
		const completed = this.todos.reduce(
			(sum, todoItem) => sum + Number(todoItem.completed.get()), 0);
		this.completed.set(completed);
		this.remaining.set(all - completed);
	}

	onTodosChanged(index, removedTodos, addedTodos) {
		this.update();
		removedTodos.forEach(todoItem => {
			todoItem.completed.changed.remove(this.update, this);
		});
		addedTodos.forEach(this.subscribeToChanges, this);
	}

	subscribeToChanges(todoItem) {
		todoItem.completed.changed.add(this.update, this);
	}
}

module.exports = TodoCounter;