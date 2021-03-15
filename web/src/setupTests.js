import 'mutationobserver-shim';
import 'regenerator-runtime/runtime.js';

if (global.document) {
	document.createRange = () => ({
		setStart: () => { },
		setEnd: () => { },
		commonAncestorContainer: {
			nodeName: 'BODY',
			ownerDocument: document,
		},
	});
}

export const store_initial = {};
export const store_not_authorized = { auth: { backgroundAuthReqCompleted: true } };
export const store_error_login = { auth: { backgroundAuthReqCompleted: true, error: { message: 'User with this email not registered', name: 'Error' } } };
export const store_authorized = { auth: { me: { id: 1, name: 'Test User' } } };
