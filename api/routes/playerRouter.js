import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../utils/_prisma.js";
import ensureAuthenticated from "../utils/_ensureAuthenticated.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register a new player
router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  // const existingPlayer = await Player.findOne({ where: { name } });

  const existingPlayer = await prisma.player.findUnique({
    where: { name: name },
  });

  if (existingPlayer) {
    return res.status(400).json({ error: "Player already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newPlayer = await prisma.player.create({
    data: { name: name, password: hashedPassword },
  });
  const token = jwt.sign({ id: newPlayer.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  //update token
  newPlayer.token = token;

  await prisma.player.update({
    where: { id: newPlayer.id },
    data: { token: token },
  });

  res.status(201).json({
    message: "Player created successfully",
    player: {
      token: token,
      tokenExpires: Date.now() + 3600000,

      id: newPlayer.id,
      name: newPlayer.name,
      cash: newPlayer.cash,
      diamonds: newPlayer.diamonds,
    },
  });
});

// Player login
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const player = await prisma.player.findUnique({ where: { name: name } });
  if (!player) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const validPassword = await bcrypt.compare(password, player.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  //update date_last_played
  player.date_last_played = Date.now();

  // await player.save();

  const token = jwt.sign({ id: player.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  player.token = token;

  await prisma.player.update({
    where: { id: player.id },
    data: { token: token },
  });

  res.json({
    message: "Logged in successfully",
    player: {
      token: token,
      tokenExpires: Date.now() + 3600000,

      id: player.id,
      name: player.name,
      cash: player.cash,
      diamonds: player.diamonds,
    },
  });
});

// log out
router.post("/logout", ensureAuthenticated, async (req, res) => {
  res.json({ message: "Logged out successfully", player: null });
});

router.put("/update", ensureAuthenticated, async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  const player = await prisma.player.findUnique({ where: { id: req.userId } });
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  if (name) {
    player.name = name;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    player.password = hashedPassword;
  }

  await prisma.player.update({
    where: { id: player.id },
    data: { name: player.name, password: player.password },
  });

  res.json({ message: "Player updated successfully" });
});

// refresh token
router.post("/refresh", async (req, res) => {
  const { token, playerId } = req.body;
  if (!token || !playerId) {
    return res.status(400).json({ error: "Invalid request" });
  }
  try {
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    console.log("generating new token for", player);

    const token = jwt.sign({ id: player.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    player.token = token;

    await prisma.player.update({
      where: { id: player.id },
      data: { token: token },
    });

    res.json({
      message: "Token refreshed successfully",
      player: {
        token: token,
        tokenExpires: Date.now() + 3600000,
        id: player.id,
        name: player.name,
        cash: player.cash,
        diamonds: player.diamonds,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error refreshing token", details: err });
  }
});

export default router;
