import express from "express";
import prisma from "../utils/_prisma.js";

import ensureAuthenticated from "../utils/_ensureAuthenticated.js";
const router = express.Router();

// Get the current squadron
router.get("/all", ensureAuthenticated, async (req, res) => {
  const token = req.headers["x-access-token"];

  const player = await prisma.player.findUnique({ where: { id: req.user.id } });
  console.log(player);

  const squadron = await prisma.squadron.findMany({
    where: { playerId: player.id },
  });

  res.json(squadron);
});

// Add a mech to the squadron
router.post("/add", ensureAuthenticated, async (req, res) => {
  const { mechId } = req.body;
  const token = req.headers["x-access-token"];

  const currentSquadron = await prisma.squadron.findMany({
    where: { playerId: req.user.id },
  });

  if (currentSquadron.length >= 3) {
    return res.status(400).json({ error: "Squadron is already full" });
  }

  await prisma.squadron.create({
    data: { playerId: req.user.id, mechId: mechId },
  });

  res.json({ message: "Mech added to squadron" });
});

// testing - create random team
router.get("/createRandomTeam/:playerId", async (req, res) => {
  // add three random mechs to the Squadron
  const playerId = req.params.playerId;
  console.log(playerId);

  const mechs_random = await prisma.$queryRawUnsafe(
    // DO NOT pass in or accept user input here
    `SELECT * FROM "Mech" ORDER BY random() LIMIT 3;`
  );
  const mechs_random_ids = mechs_random.map((mech) => mech.id);
  // put into array, mechs property

  let selected_mechs = [];
  for (let i = 0; i < mechs_random_ids.length; i++) {
    selected_mechs.push(mechs_random_ids[i]);
  }
  console.log(mechs_random, selected_mechs);

  // const squadron = await Squadron.create({
  //   playerId: playerId,
  //   mechs: selected_mechs,
  // });
  const squadron = await prisma.squadron.create({
    data: {
      playerId: parseInt(playerId),
      mechs: selected_mechs,
    },
  });

  res.json(squadron);
});

// testing - get all mechs for player
router.get("/alltesting/:playerId", async (req, res) => {
  // const squadron = await Squadron.findAll({
  //   where: { playerId: req.params.playerId },
  // });
  const squadron = await prisma.squadron.findMany({
    where: { playerId: req.params.playerId },
  });

  res.json(squadron);
});
export default router;
