const Observable = require('x-observable');
const filters = require('./filters');
const bind = require('x-bind');

class TodoListItem {
	constructor(todoItem, selectedFilter) {
		this.todoItem = todoItem;
		this.title = todoItem.title;
		this.completed = todoItem.completed;
		this.visible = new Observable(true);
		bind([selectedFilter, todoItem.completed], this.setVisible, this);
	}

	remove() {
		this.todoItem.remove();
	}

	setVisible(selectedFilter, completed) {
		const visible = selectedFilter === filters.ALL ||
			(selectedFilter === filters.COMPLETED && completed) ||
			(selectedFilter === filters.ACTIVE && !completed);
		this.visible.set(visible);
	}
}

module.exports = TodoListItem;