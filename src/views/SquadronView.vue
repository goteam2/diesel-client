<template>
  <div
    class="w-full h-full | grid grid-cols-1 grid-rows-12 gap-y-2 | justify-start items-start"
  >
    <!-- top bar -->
    <div class="squad-select grid grid-cols-12 gap-x-2 | row-span-2">
      <div
        class="col-span-4 | flex items-center justify-center gap-x-2 | bg-black hover:bg-secondary rounded-full p-4 | relative"
        role="button"
        @click="$router.push('hangar')"
      >
        <icon name="back" class="w-6 h-6 fill-white" />
        <icon name="hangar" class="w-6 h-6 fill-white" />
      </div>
      <div
        class="col-span-8 | flex items-center justify-center bg-black hover:bg-secondary active:bg-secondary text-white rounded-3xl | relative"
        @click="selectOpen = !selectOpen"
        role="button"
      >
        <span class="text-3xl font-black"
          >SQUAD {{ squadronStore.selectedSquadron.value + 1 }}</span
        >
        <icon name="down" class="ms-3 w-6 h-6 fill-black" />

        <!-- dropdown  TODO INCLUDE LATER-->
        <div
          class="absolute top-0 | w-full | rounded-3xl p-4 | bg-secondary | uppercase text-3xl font-black text-center"
          :class="selectOpen ? 'block' : 'hidden'"
        >
          <div
            role="button"
            v-for="(squad, i) in squadronStore.squadrons.value"
            @click="selectSquad(i)"
          >
            Squad {{ i + 1 }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="squad-list | row-span-10 grid-rows-12 | max-h-full overflow-y-scroll | border-4 border-black | bg-white | p-4 mt-2"
      v-if="squadronStore.loading"
    >
      <div
        v-for="(mech, idx) in squadronStore.getSelectedSquadron.value.mechs"
        v-key="mech.id"
        class="grid grid-cols-12 grid-rows-7 gap-y-2 gap-x-4 | mb-2 p-4 | border-4 border-black | bg-light"
      >
        <!-- MECH ID BLOCK -->
        <div class="col-span-4 row-span-5 | flex flex-col justify-between">
          <div class="grid place-content-center | bg-black | aspect-square">
            <span class="text-6xl font-black text-white">{{ idx + 1 }}</span>
          </div>
          <!-- MECH WEAPONS -->
          <div class="grid grid-rows-2 grid-cols-2 | place-items-center gap-2">
            <icon name="augment_offensive" class="stroke-rare" />
            <icon name="augment_offensive" class="stroke-uncommon" />
            <icon name="augment_defensive" class="stroke-legendary" />
            <icon name="augment_defensive" class="stroke-common" />
          </div>
        </div>

        <!-- MECH NAME -->

        <div class="col-span-8 row-span-1 | uppercase font-black text-black">
          <div>{{ mech.name }}</div>
        </div>
        <div
          class="col-span-8 row-span-1 | uppercase font-black text-secondary"
        >
          <div>{{ mech.class }}</div>
        </div>

        <!-- MECH STATS -->

        <!-- MECH STATS - LEFT -->
        <div
          class="col-span-8 row-span-2 | grid grid-cols-2 grid-rows-3 justify-center gap-0 | text-sm"
        >
          <span class=""> ATK: {{ mech.attack }} </span>
          <span class=""> DEF: {{ mech.defense }} </span>
          <span class=""> ACC: {{ mech.accuracy }} </span>
          <span class=""> SPD: {{ mech.speed }} </span>
          <span class=""> EVA: {{ mech.evasion }} </span>
          <span class=""> WGT: {{ mech.weight }} </span>
        </div>
        <div
          class="col-span-8 row-span-1 | grid grid-cols-2 grid-rows-1 justify-center gap-x-2"
        >
          <game-btn class="text-sm mb-0">Equip</game-btn>
          <game-btn class="text-sm mb-0">Replace</game-btn>
        </div>
      </div>
    </div>
    <svg
      class="animate-spin h-5 w-5 text-black inline"
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSquadronStore } from "@/stores/useSquadronStore";

import Icon from "@/components/Icon.vue";
import GameBtn from "@/components/ui/GameBtn.vue";

const playerStore = storeToRefs(usePlayerStore());
const squadronStore = storeToRefs(useSquadronStore());

const { fetchSquadrons, changeSelectedSquadron } = useSquadronStore();
const squadron = ref(null);
const selectOpen = ref(false);
const selectSquad = (id) => {
  changeSelectedSquadron(id);
};

onMounted(async () => {
  // axios to get the player's squadron
  try {
    await fetchSquadrons();
    console.log(squadronStore.selectedSquadron.value);
  } catch (err) {
    console.log(err);
    playerStore.error.value = err;
  }
});
</script>

<style lang="scss" scoped></style>
