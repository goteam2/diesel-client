import express from "express";
// import { Player, Mech, Squadron, Hangar } from "../data/_models.js";
import prisma from "../utils/_prisma.js";
import ensureAuthenticated from "../utils/_ensureAuthenticated.js";

const router = express.Router();

// Get the current hangar
router.get("/", ensureAuthenticated, async (req, res) => {
  // const hangar = await Hangar.findAll({ where: { playerId: req.user.id } });
  const hangar = await prisma.hangar.findMany({
    where: { playerId: req.user.id },
  });

  res.json(hangar);
});

// Add a mech to the hangar
router.post("/add", ensureAuthenticated, async (req, res) => {
  const { mechId } = req.body;

  // const squadron = await Squadron.findOne({ where: { mechId: mechId } });
  const squadron = await prisma.squadron.findUnique({
    where: { mechId: mechId },
  });

  if (!squadron) {
    return res.status(400).json({ error: "Mech not found in squadron" });
  }

  // await Hangar.create({ playerId: req.user.id, mechId: mechId });
  await prisma.hangar.create({
    data: { playerId: req.user.id, mechId: mechId },
  });

  // await Squadron.destroy({ where: { mechId: mechId } });
  await prisma.squadron.delete({ where: { mechId: mechId } });

  res.json({ message: "Mech moved to hangar" });
});

// Remove a mech from the hangar
router.post("/remove", ensureAuthenticated, async (req, res) => {
  const { mechId } = req.body;

  // const hangar = await Hangar.findOne({ where: { mechId: mechId } });
  const hangar = await prisma.hangar.findUnique({ where: { mechId: mechId } });

  if (!hangar) {
    return res.status(400).json({ error: "Mech not found in hangar" });
  }

  // await Squadron.create({ playerId: req.user.id, mechId: mechId });
  await prisma.squadron.create({
    data: { playerId: req.user.id, mechId: mechId },
  });
  // await Hangar.destroy({ where: { mechId: mechId } });
  await prisma.hangar.delete({ where: { mechId: mechId } });

  res.json({ message: "Mech moved to squadron" });
});

export default router;
