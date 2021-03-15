const fs = require('fs');
const path = require('path');
const promises = require('fs/promises');


export default async function initTestDB() {
	const emptyDB = path.join(__dirname, '../empty.sqlite')
	const testDB = path.join(__dirname, '../test.sqlite')

	await promises.rm(testDB, {force: true})
	await promises.copyFile(emptyDB, testDB)
}
