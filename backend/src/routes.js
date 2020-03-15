import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ msg: 'ok' }));

routes.post('/recipients', RecipientController.store);
routes.post('/sessions', SessionController.store);

export default routes;
