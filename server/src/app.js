import Express from 'express';
import cookieParser from 'cookie-parser';

import routes from './routes';
import { parseUser } from './helpers/auth';
import { errorHandler } from './helpers/responses';

const app = Express();

app.use(cookieParser());

app.use(Express.json({ limit: '10kb', type: 'json' }));

app.use(parseUser);

app.use('/api/v1.0/', routes);
app.use(errorHandler);

export default app;
