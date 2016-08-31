const element = require('x-element');
const bind = require('x-bind');
const setVisibility = require('./visibility');
const filters = require('./filters');
const filterHashes = require('./filter-hashes');

function createFooter(todos, todoCounter, selectedFilter) {
	return new Footer(todos, todoCounter, selectedFilter).node;
}

const filterTitles = {};
filterTitles[filters.ALL] = 'All';
filterTitles[filters.ACTIVE] = 'Active';
filterTitles[filters.COMPLETED] = 'Completed';

class Footer {
	constructor(todos, todoCounter, selectedFilter) {
		this.todos = todos;
		this.todoCounter = todoCounter;
		this.selectedFilter = selectedFilter;
		this.render();
	}

	render() {
		const remainingText = element('span', {
			className: 'todo-count'
		});
		bind(this.todoCounter.remaining, remaining => {
			remainingText.textContent = remaining + ' ' +
				(remaining === 1 ? 'item' : 'items') + ' left';
		});

		const clearCompletedButton = element('button', {
			className: 'clear-completed',
			textContent: 'Clear completed',
			onclick: this.onClearCompletedButtonClick.bind(this)
		});
		bind(this.todoCounter.completed, completed => {
			setVisibility(clearCompletedButton, completed > 0);
		});

		this.node = element('footer', {
			className: 'footer'
		}, [
			remainingText,
			element('ul', {className: 'filters'}, [
				this.filterListItem(filters.ALL),
				this.filterListSeparator(),
				this.filterListItem(filters.ACTIVE),
				this.filterListSeparator(),
				this.filterListItem(filters.COMPLETED)
			]),
			clearCompletedButton
		]);
		bind(this.todoCounter.all, todos => {
			setVisibility(this.node, todos > 0);
		});
	}

	filterListSeparator() {
		return document.createTextNode(' ');
	}

	filterListItem(filter) {
		const link = element('a', {
			textContent: filterTitles[filter],
			href: filterHashes[filter]
		});
		bind(this.selectedFilter, selectedFilter => {
			link.className = filter === selectedFilter ? 'selected' : null;
		});
		return element('li', null, link);
	}

	onClearCompletedButtonClick() {
		for (let i = this.todos.size() - 1; i >= 0; i--) {
			if (this.todos.get(i).completed.get()) {
				this.todos.removeAt(i);
			}
		}
	}
}

module.exports = createFooter;