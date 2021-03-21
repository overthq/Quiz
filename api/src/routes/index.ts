import { Router } from "express";

import games from "./games";
import scores from "./scores";

const router = Router();

router.use("/games", games);
router.use("/scores", scores);

export default router;
