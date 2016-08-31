class Store {
	constructor(name) {
		this.name = name;
	}

	load() {
		const data = localStorage[this.name];
		return data ? JSON.parse(data) : [];
	}

	save(data) {
		localStorage[this.name] = JSON.stringify(data);
	}
}

module.exports = Store;