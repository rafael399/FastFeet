import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ msg: 'ok' }));

routes.post('/recipients', RecipientController.store);

export default routes;
