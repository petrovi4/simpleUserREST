import initDB from './initDB';
main();

async function main() {
	await initDB();

	process.exit(0);
}
