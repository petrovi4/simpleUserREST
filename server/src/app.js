import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes';
import { parseUser } from './helpers/auth';
import { errorHandler } from './helpers/responses';

const app = Express();

app.use(cookieParser());

app.use(bodyParser.json({ limit: '10kb', type: 'json' }));

app.use(parseUser);

app.use('/api/v1.0/', routes);
app.use(errorHandler);

export default app;
