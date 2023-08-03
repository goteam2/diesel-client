import express from "express";
import prisma from "../utils/_prisma.js";
import ensureAuthenticated from "../utils/_ensureAuthenticated.js";

const router = express.Router();

// Get the current squadron
router.get("/all", ensureAuthenticated, async (req, res) => {
  const squadron = await prisma.mech.findMany({
    where: { playerId: req.user.id },
  });

  res.json(squadron);
});

// Add available mech
router.post("/add", ensureAuthenticated, async (req, res) => {
  const { mech } = req.body;

  await prisma.mech.create({ data: mech });

  res.json({ message: "Mech added to squadron" });
});

export default router;
