const TodoController = require('./todo-controller');
const TodoCounter = require('./todo-counter');
const element = require('x-element');
const mainSection = require('./main-section');
const footer = require('./footer');
const bindToHash = require('./hash-controller');
const Observable = require('x-observable');

function createTodoApp() {
	return new TodoApp().node;
}

const ENTER_KEY = 13;

class TodoApp {
	constructor() {
		this.todoController = new TodoController();
		this.todoCounter = new TodoCounter(this.todoController.todos);
		this.selectedFilter = new Observable();
		bindToHash(this.selectedFilter);
		this.render();
	}

	render() {
		this.newTodoInput = element('input', {
			className: 'new-todo',
			placeholder: 'What needs to be done?',
			autofocus: true,
			onkeydown: this.onNewTodoInputKeyDown.bind(this)
		});

		this.node = element('section', {className: 'todoapp'}, [
			element('header', {className: 'header'}, [
				element('h1', {textContent: 'todos'}),
				this.newTodoInput
			]),
			mainSection(this.todoController.todos, this.todoCounter, this.selectedFilter),
			footer(this.todoController.todos, this.todoCounter, this.selectedFilter)
		]);
	}

	onNewTodoInputKeyDown(event) {
		if (event.which === ENTER_KEY) {
			const title = this.newTodoInput.value.trim();
			if (title) {
				this.todoController.addTodo(title);
				this.newTodoInput.value = '';
			}
		}
	}
}

module.exports = createTodoApp;