import express from "express";
import prisma from "../utils/_prisma.js";
import ensureAuthenticated from "../utils/_ensureAuthenticated.js";

const router = express.Router();

// Get the current shop
router.get("/", ensureAuthenticated, async (req, res) => {
  // Combine weapon and armor tables

  const armors = await prisma.armor.findMany();
  const weapons = await prisma.weapon.findMany();
  const items = [...weapons, ...armors];

  // Randomly select 5 items
  const shopItems = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    shopItems.push(items[randomIndex]);
    items.splice(randomIndex, 1); // Remove selected item from the array
  }

  res.json(shopItems);
});

// Buy an item
router.post("/buy", ensureAuthenticated, async (req, res) => {
  const { itemId, itemType } = req.body; // itemType is 'Weapon' or 'Armor'

  const item = await prisma[itemType.toLowerCase()].findUnique({
    where: { id: itemId },
  });

  const player = await prisma.player.findUnique({ where: { id: req.user.id } });

  if (player.gold < item.purchasePrice) {
    return res.status(400).json({ error: "Not enough gold" });
  }

  player.gold -= item.purchasePrice;
  await prisma.player.update({ where: { id: req.user.id }, data: player });

  // await Inventory.create({
  //   playerId: req.user.id,
  //   [`${itemType.toLowerCase()}Id`]: itemId,
  // });
  await prisma.inventory.create({
    data: {
      playerId: req.user.id,
      [`${itemType.toLowerCase()}Id`]: itemId,
    },
  });

  res.json({ message: "Item purchased successfully" });
});

// Sell an item
router.post("/sell", ensureAuthenticated, async (req, res) => {
  const { itemId, itemType } = req.body; // itemType is 'Weapon' or 'Armor'

  const item = await prisma[itemType.toLowerCase()].findUnique({
    where: { id: itemId },
  });

  const player = await prisma.player.findUnique({ where: { id: req.user.id } });

  player.gold += item.purchasePrice;
  // await player.save();
  await prisma.player.update({ where: { id: req.user.id }, data: player });

  await prisma.inventory.delete({
    where: { playerId: req.user.id, [`${itemType.toLowerCase()}Id`]: itemId },
  });

  res.json({ message: "Item sold successfully" });
});

export default router;
