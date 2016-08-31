const element = require('x-element');
const bind = require('x-bind');
const setVisibility = require('./visibility');
const todoList = require('./todo-list');

function createMainSection(todos, todoCounter, selectedFilter) {
	return new MainSection(todos, todoCounter, selectedFilter).node;
}

class MainSection {
	constructor(todos, todoCounter, selectedFilter) {
		this.todos = todos;
		this.todoCounter = todoCounter;
		this.selectedFilter = selectedFilter;
		this.render();
	}

	render() {
		const toggleAllCheckbox = element('input', {
			className: 'toggle-all',
			type: 'checkbox',
			onchange: this.onToggleAllCheckboxChange.bind(this)
		});
		bind(this.todoCounter.remaining, remaining => {
			toggleAllCheckbox.checked = remaining === 0;
		});

		this.node = element('section', {
			className: 'main'
		}, [
			toggleAllCheckbox,
			todoList(this.todos, this.selectedFilter)
		]);
		bind(this.todoCounter.all, todos => {
			setVisibility(this.node, todos > 0);
		});
	}

	onToggleAllCheckboxChange(event) {
		this.todos.forEach(todoItem => {
			todoItem.completed.set(event.target.checked);
		});
	}
}

module.exports = createMainSection;