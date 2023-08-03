<script setup>
// Function to perform a battle round
const performBattleRound = async (mechs) => {
  // sort by weight
  let sortedMechs = sortMechsByWeight(mechs);

  // perform attacks
  for (let i = 0; i < sortedMechs.length; i++) {
    for (let j = 0; j < sortedMechs.length; j++) {
      if (i !== j && sortedMechs[i].health > 0 && sortedMechs[j].health > 0) {
        await performAttack(
          sortedMechs[i],
          sortedMechs[j],
          Math.floor(Math.random() * 4)
        );
      }
    }
  }

  // filter out destroyed mechs
  return sortedMechs.filter((mech) => mech.health > 0);
};

// Function to perform a battle
const performBattle = async (squadId1, squadId2) => {
  let mechs1 = await getActiveMechs(squadId1);
  let mechs2 = await getActiveMechs(squadId2);

  let allMechs = mechs1.concat(mechs2);

  // while both squads have active mechs
  while (
    mechs1.find((mech) => mech.health > 0) &&
    mechs2.find((mech) => mech.health > 0)
  ) {
    // perform a battle round
    allMechs = await performBattleRound(allMechs);
  }

  // calculate and award salvage/gold
  if (mechs1.find((mech) => mech.health > 0)) {
    // squad 1 wins, gets salvage/gold from squad 2
    postGamePhase(mechs1, mechs2);
  } else if (mechs2.find((mech) => mech.health > 0)) {
    // squad 2 wins, gets salvage/gold from squad 1
    postGamePhase(mechs2, mechs1);
  }
};

// Function for post-game phase
const postGamePhase = async (winningMechs, losingMechs) => {
  // calculate total value of losing mechs' weapons
  let totalValue = 0;
  for (let mech of losingMechs) {
    for (let i = 0; i < 4; i++) {
      let weaponId = mech["slot" + i];
      let weapon = await Weapon.findOne({ where: { id: weaponId } });
      totalValue += weapon.value;
    }
  }

  // award 25% of total value in gold to the winner
  let goldAward = totalValue * 0.25;

  // or choose to salvage a weapon
  let salvage =
    losingMechs[Math.floor(Math.random() * losingMechs.length)][
      "slot" + Math.floor(Math.random() * 4)
    ];

  // choice should be given to the player. For simplicity we're using a 50% chance
  if (Math.random() > 0.5) {
    // give gold
    let player = await Player.findOne({
      where: { id: winningMechs[0].playerId },
    });
    player.cash += goldAward;
    await player.save();
  } else {
    // salvage weapon
    let player = await Player.findOne({
      where: { id: winningMechs[0].playerId },
    });
    let inventory = await Inventory.findOne({ where: { playerId: player.id } });
    inventory.weaponId = salvage;
    await inventory.save();
  }
};
</script>
