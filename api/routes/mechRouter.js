import express from "express";
import { Mech } from "../data/models.js";
import ensureAuthenticated from "../utils/ensureAuthenticated.js";

const router = express.Router();

// Get the current squadron
router.get("/all", ensureAuthenticated, async (req, res) => {
  const squadron = await Mech.findAll({ where: { playerId: req.user.id } });

  res.json(squadron);
});

// Add available mech
router.post("/add", ensureAuthenticated, async (req, res) => {
  const { mech } = req.body;

  await Mech.create(mech);

  res.json({ message: "Mech added to squadron" });
});

export default router;
