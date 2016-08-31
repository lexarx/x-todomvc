const element = require('x-element');
const ObservableList = require('x-observable-list');
const TodoListItem = require('./todo-list-item');
const renderList = require('x-observable-list-renderer');
const todoItemView = require('./todo-item-view');

function createTodoList(todos, selectedFilter) {
	return new TodoList(todos, selectedFilter).node;
}

class TodoList {
	constructor(todos, selectedFilter) {
		this.todos = todos;
		this.todos.changed.add(this.onTodosChanged, this);
		this.selectedFilter = selectedFilter;
		const todoListItems = this.todos.map(this.createTodoListItem, this);
		this.todoListItems = new ObservableList(todoListItems);
		this.render();
	}

	createTodoListItem(todoItem) {
		return new TodoListItem(todoItem, this.selectedFilter);
	}

	onTodosChanged(index, removedTodos, addedTodos) {
		const todoListItems = addedTodos.map(this.createTodoListItem, this);
		this.todoListItems.replaceRange(index, removedTodos.length, todoListItems);
	}

	render() {
		this.node = element('ul', {
			className: 'todo-list'
		});
		renderList(this.node, this.todoListItems, todoItemView);
	}
}

module.exports = createTodoList;