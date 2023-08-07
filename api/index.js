import express from "express";
import cors from "cors";

import inventoryRouter from "./routes/inventoryRouter.js";
import hangarRouter from "./routes/hangarRouter.js";
import squadronRouter from "./routes/squadronRouter.js";
import shopRouter from "./routes/shopRouter.js";
import playerRouter from "./routes/playerRouter.js";
import MechRouter from "./routes/mechRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Use the imported routes
app.use("/api/inventory", inventoryRouter);
app.use("/api/hangar", hangarRouter);
app.use("/api/squadron", squadronRouter);
app.use("/api/shop", shopRouter);
app.use("/api/mechs", MechRouter);
app.use("/api/player", playerRouter);

// console.log('cold start at', new Date().toISOString())
export default app;
