const filters = require('./filters');
const filterHashes = require('./filter-hashes');

function bindToHash(selectedFilter) {
	const hashController = new HashController(selectedFilter);
	hashController.start();
}

class HashController {
	constructor(selectedFilter) {
		this.selectedFilter = selectedFilter;
	}

	start() {
		this.selectFilter();
		window.addEventListener('hashchange', this.selectFilter.bind(this));
	}

	findFilterByHash() {
		return [filters.ALL, filters.ACTIVE, filters.COMPLETED]
			.find(filter => filterHashes[filter] === window.location.hash);
	}

	selectFilter() {
		const filter = this.findFilterByHash() || filters.ALL;
		this.selectedFilter.set(filter);
	}
}

module.exports = bindToHash;