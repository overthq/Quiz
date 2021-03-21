import { Router } from "express";
import { Score } from "../models";

const router = Router();

router.post("/:scoreId/update", async (req, res) => {
  const { scoreId } = req.params;
  const { increment } = req.body;

  await Score.findByIdAndUpdate(scoreId, {
    $inc: { score: increment },
  });

  return res.status(200).json({
    success: true,
    message: "Score successfully updated",
  });
});

export default router;
