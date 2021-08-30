const path = require('path');

exports.maxCPUs = 1;
exports.port = 8080;

exports.db = {
	development: {
		dialect: 'sqlite',
		storage: path.join(__dirname, 'database.sqlite'),
	},
	test: {
		dialect: 'sqlite',
		storage: path.join(__dirname, 'test.sqlite'),
	},
	production: {
		dialect: 'sqlite',
		storage: path.join(__dirname, 'prod.sqlite'),
	},
};
