import express from "express";
import ensureAuthenticated from "../utils/_ensureAuthenticated.js";
import prisma from "../utils/_prisma.js";

const router = express.Router();
// import * as model from "../data/models.js";
// console.log(model);

// Equip items on mech
router.post("/inventory/equip", ensureAuthenticated, async (req, res) => {
  const { mechId, slot, itemId, type } = req.body; // type is 'Weapon' or 'Armor'

  // const mech = await Mech.findOne({ where: { id: mechId } });
  const mech = await prisma.mech.findUnique({ where: { id: mechId } });

  // If the slot is already occupied
  if (mech["slot" + slot]) {
    // Create an inventory item for the currently equipped item
    const inventoryItem = {
      playerId: req.user.id,
    };
    inventoryItem[`${type.toLowerCase()}Id`] = mech["slot" + slot];

    // await Inventory.create(inventoryItem);
    await prisma.inventory.create({ data: inventoryItem });
  }

  // Equip the new item
  mech["slot" + slot] = itemId;

  await prisma.mech.update({ where: { id: mechId }, data: mech });

  // Remove the new item from inventory

  await prisma.inventory.delete({
    where: { playerId: req.user.id, [`${type.toLowerCase()}Id`]: itemId },
  });

  res.json({ message: "Item equipped" });
});

// Move mechs to and from hangar/squadron
router.post("/hangar/move-mech", ensureAuthenticated, async (req, res) => {
  const { mechId, location } = req.body; // location is 'Hangar' or 'Squadron'

  const fromModel = location === "Hangar" ? Squadron : Hangar;
  const toModel = location === "Hangar" ? Hangar : Squadron;

  await prisma[fromModel].delete({ where: { playerId: req.user.id, mechId } });
  await prisma[toModel].create({ data: { playerId: req.user.id, mechId } });

  res.json({ message: `Mech moved to ${location}` });
});

export default router;
