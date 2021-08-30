import cluster from 'cluster';
import { cpus } from 'os';

import { port, maxCPUs } from '../config';

import app from './app';

const cCPUs = cpus().length;
const workers = Math.min(cCPUs, maxCPUs || 999);

main();

function forkWorker() {
	let worker = cluster.fork();
	worker.on('message', message => {
		console.log('Message from worker', message);
		if (/* checking whether the message needs to be processed */ true) { // eslint-disable-line no-constant-condition
			// process message
		}
		else console.errror('Unknown message from worker', { message });
	});
}

function main() {
	if (cluster.isPrimary && process.env.THREADS !== 'single') {
		cluster.on('online', worker => {
			console.log('Worker is online', { workerProcessPID: worker.process.pid });
		});

		cluster.on('exit', (worker, code, signal) => {
			console.log('Worker died', { workerProcessPID: worker.process.pid, code, signal });
			forkWorker();
		});

		for (var i = 0; i < workers; i++) forkWorker();
	}
	else {
		process.on('message', function (message) {
			console.log('Message from master', message);
			// Do some stuff in child process
		});

		app.listen(port, () => console.log('Simple REST server listening', { port }));
	}
}

