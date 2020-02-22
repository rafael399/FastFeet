import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ msg: 'ok' }));

export default routes;
