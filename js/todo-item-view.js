const element = require('x-element');
const bind = require('x-bind');
const setClassName = require('x-class-name');
const setVisibility = require('./visibility');

function createTodoItemView(todoItem) {
	return new TodoItemView(todoItem).node;
}

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItemView {
	constructor(todoItem) {
		this.todoItem = todoItem;
		this.render();
	}

	render() {
		const toggleAllCheckbox = element('input', {
			className: 'toggle',
			type: 'checkbox',
			onchange: event => {
				this.todoItem.completed.set(event.target.checked);
			}
		});
		bind(this.todoItem.completed, completed => {
			toggleAllCheckbox.checked = completed;
		});

		const titleText = element('label', {
			ondblclick: () => {
				this.toggleEditing(true);
			}
		});
		bind(this.todoItem.title, title => {
			titleText.textContent = title;
		});

		this.titleInput = element('input', {
			className: 'edit',
			onblur: () => {
				this.toggleEditing(false);
			},
			onkeydown: this.onTitleEditorKeyDown.bind(this)
		});
		bind(this.todoItem.title, title => {
			this.titleInput.value = title;
		});

		this.node = element('li', null, [
			element('div', {
				className: 'view'
			}, [
				toggleAllCheckbox,
				titleText,
				element('button', {
					className: 'destroy',
					onclick: () => {
						this.todoItem.remove();
					}
				})
			]),
			this.titleInput
		]);
		bind(this.todoItem.visible, visible => {
			setVisibility(this.node, visible);
		});
		bind(this.todoItem.completed, completed => {
			setClassName(this.node, 'completed', completed);
		});
	}

	toggleEditing(enabled) {
		if (enabled) {
			this.titleInput.focus();
			const length = this.titleInput.value.length;
			this.titleInput.setSelectionRange(length, length);
		} else {
			this.todoItem.title.set(this.titleInput.value);
		}
		setClassName(this.node, 'editing', enabled);
	}

	onTitleEditorKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			this.titleInput.value = this.todoItem.title.get();
			this.toggleEditing(false);
		} else if (event.which === ENTER_KEY) {
			this.todoItem.title.set(this.titleInput.value);
			this.toggleEditing(false);
		}
	}
}

module.exports = createTodoItemView;