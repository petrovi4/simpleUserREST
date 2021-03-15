import { serializeError } from 'serialize-error';

// The serializer parameter allows us to customize the serialization format of the query result
export function successRes(res, data, serializer) {
	if ('function' === typeof serializer) res.json({ status: 'success', data: serializer(data) });
	else res.json({ status: 'success', data });
}


export function errorRes(res, error) {
	// To handle errors, you should define error classes and their corresponding HTTP codes and messages.
	// But for the prototype it is enough that there is
	if (process.env.NODE_ENV === 'development') res.status(500).send({ status: 'error', error: serializeError(error) });
	else res.status(500).send({ status: 'error', error: { message: error?.message || 'Server error' } });
}

export function errorHandler(err, _dummy_req, res, _dummy_next) { // _dummy prefix tells to eslint to ignore unused params
	errorRes(res, err);
}
