import { Router } from "express";
import { Game, Score } from "../models";

const router = Router();

router.post("/new", async (req, res) => {
  const { creator } = req.body;

  const newGame = new Game({ creator });

  // Deploy a new game contract with the ABI, and store the contract address.

  newGame.contract = "";

  await newGame.save();

  return res.status(201).json({
    success: true,
    message: "Game created",
  });
});

router.get("/:id/winner", async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        success: false,
        data: {
          message: "Specified game does not exist",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: { winner: game.winner },
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      data: { message: error.message },
    });
  }
});

router.get("/:gameId/final-scores", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        data: {
          message: "Specified game does not exist",
        },
      });
    }

    const scores = await Score.find({ gameId });

    return res.status(200).json({
      success: true,
      data: { scores },
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      data: { message: "An error has occured" },
    });
  }
});

export default router;
