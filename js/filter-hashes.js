const filters = require('./filters');

const filterHashes = {};
filterHashes[filters.ALL] = '#/';
filterHashes[filters.ACTIVE] = '#/active';
filterHashes[filters.COMPLETED] = '#/completed';

module.exports = filterHashes;