import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { router } from './routes';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const port = 3001;

app.use('/', router);

app.set('port',port);
app.listen(port, () => console.log(`listening on port ${port}`));