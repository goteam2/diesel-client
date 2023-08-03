import { Sequelize, DataTypes, Model } from "sequelize";
// import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
// import pg from "pg";

import companies_json from "./Companies.json" assert { type: "json" };
import mechs_json from "./Mechs.json" assert { type: "json" };

// Initialize a connection instance
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite",
//   // logging: false,
// });

// const sequelize = new Sequelize(
//   "postgres://default:O2zscVR6IhSP@ep-lucky-term-55691145.us-west-2.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
// );

const sequelize = new Sequelize(
  "postgres://default:O2zscVR6IhSP@ep-lucky-term-55691145.us-west-2.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
  {
    // dialectModule: pg,
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 0,
    },
    ssl: true,
  }
);
// Define the Company model
class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ideology: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Company",
  }
);

// Define the Weapon model
class Weapon extends Model {}

Weapon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    criticalHit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Companies", // 'companies' refers to table name
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Weapon",
  }
);

// Define the Armor model
class Armor extends Model {}

Armor.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    evasion: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    criticalHit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Companies", // 'companies' refers to table name
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Armor",
  }
);

// Define Inventory model
// Define the Inventory model
class Inventory extends Model {}

Inventory.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weaponId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    armorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
  }
);

// Define the Hangar model
class Hangar extends Model {}

Hangar.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mechId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Hangar",
  }
);

// Define the Squadron model
class Squadron extends Model {}

Squadron.init(
  {
    squadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mechs: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Squadron",
  }
);
class Mech extends Model {}

Mech.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    class: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    attack: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    defense: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    accuracy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    speed: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    evasion: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    criticalHit: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    slots: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    equipment: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mechs",
  }
);

// Define the Player model
class Player extends Model {}

Player.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cash: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    diamonds: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    date_last_played: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Player",
  }
);

async function init() {
  // Create the tables in the database

  let companies = companies_json;
  let mechs = mechs_json;

  console.log(Object.keys(companies));
  console.log(Object.keys(companies_json));

  companies = companies.map((company) => {
    let uuid = crypto.randomUUID();

    return {
      id: uuid,
      name: company.name,
      specialization: company.specialization,
      origin: company.origin,
      ideology: company.ideology,
      weapons: company.weapons,
      armor: company.armor,
    };
  });
  // Get all weapons and armor
  let companies_reduced = companies.map((company) => {
    return {
      id: company.id,
      name: company.name,
      specialization: company.specialization,
      origin: company.origin,
      ideology: company.ideology,
    };
  });

  const weapons = companies
    .map((company) => {
      return company.weapons.map((weapon) => {
        return {
          name: weapon.name,
          attack: weapon.attack,
          criticalHit: weapon.criticalHit,
          accuracy: weapon.accuracy,
          price: weapon.price,
          id: weapon.id,
          companyId: company.id,
        };
      });
    })
    .flat();
  const armor = companies
    .map((company) => {
      return company.armor.map((armor) => {
        return {
          name: armor.name,
          attack: armor.attack,
          defense: armor.defense,
          evasion: armor.evasion,
          criticalHit: armor.criticalHit,
          accuracy: armor.accuracy,
          price: armor.price,
          id: armor.id,
          companyId: company.id,
        };
      });
    })
    .flat();

  try {
    await sequelize.sync({ force: true });

    await Company.bulkCreate(companies_reduced);
    await Weapon.bulkCreate(weapons);
    await Armor.bulkCreate(armor);
    await Mech.bulkCreate(mechs);
  } catch (error) {
    console.log(error);
  }
}
// sequelize.sync({ alter: true });
init();

export { Company, Weapon, Armor, Inventory, Mech, Hangar, Squadron, Player };
