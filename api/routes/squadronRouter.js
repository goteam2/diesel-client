import express from "express";
import { Sequelize } from "sequelize";
import { Player, Mech, Squadron } from "../data/models.js";
import ensureAuthenticated from "../utils/ensureAuthenticated.js";
const router = express.Router();

// Get the current squadron
router.get("/all", ensureAuthenticated, async (req, res) => {
  const token = req.headers["x-access-token"];
  const player = await Player.findOne({ where: { token: token } });
  console.log(player);
  const squadron = await Squadron.findAll({ where: { playerId: player.id } });

  res.json(squadron);
});

// Add a mech to the squadron
router.post("/add", ensureAuthenticated, async (req, res) => {
  const { mechId } = req.body;
  const token = req.headers["x-access-token"];

  const currentSquadron = await Squadron.findAll({
    where: { token: req.user.id },
  });

  if (currentSquadron.length >= 3) {
    return res.status(400).json({ error: "Squadron is already full" });
  }

  await Squadron.create({ playerId: req.user.id, mechId: mechId });

  res.json({ message: "Mech added to squadron" });
});

// testing - create random team
router.get("/createRandomTeam/:playerId", async (req, res) => {
  // add three random mechs to the Squadron
  const playerId = req.params.playerId;
  console.log(playerId);
  const mechs_random = await Mech.findAll({
    order: Sequelize.literal("random()"),
    limit: 3,
  });
  const mechs_random_ids = mechs_random.map((mech) => mech.id);
  // put into array, mechs property

  let selected_mechs = [];
  for (let i = 0; i < mechs_random_ids.length; i++) {
    selected_mechs.push(mechs_random_ids[i]);
  }

  const squadron = await Squadron.create({
    playerId: playerId,
    mechs: selected_mechs,
  });

  res.json(squadron);
});

// testing - get all mechs for player
router.get("/alltesting/:playerId", async (req, res) => {
  const squadron = await Squadron.findAll({
    where: { playerId: req.params.playerId },
  });

  res.json(squadron);
});
export default router;
