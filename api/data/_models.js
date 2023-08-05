import crypto from "crypto";

import prisma from "../utils/_prisma.js";

import companies_json from "./_Companies.js";
import mechs_json from "./_Mechs.js";

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
          type: "weapon",
          attack: weapon.attack,
          defense: weapon.defense,
          criticalHit: weapon.criticalHit,
          accuracy: weapon.accuracy,
          evasion: weapon.evasion,
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
          type: "armor",
          attack: armor.attack,
          defense: armor.defense,
          criticalHit: armor.criticalHit,
          accuracy: armor.accuracy,
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

  let equipment = weapons.concat(armor);
  try {
    await prisma.Company.createMany({ data: companies_reduced });
    await prisma.Equipment.createMany({ data: equipment });
    await prisma.Mech.createMany({ data: mechs });
  } catch (error) {
    console.log(error);
  }
}
init();

// export { Company, Weapon, Armor, Inventory, Mech, Hangar, Squadron, Player };
