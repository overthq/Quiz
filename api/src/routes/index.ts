import { Router } from 'express';

import games from './games';
import players from './players';

const router = Router();

router.use('/games', games);
router.use('/players', players);

export default router;
