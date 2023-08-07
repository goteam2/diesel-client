<template>
  <div
    class="w-full h-full | gap-y-4 | flex flex-col justify-start items-stretch"
  ></div>
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

const selectOpen = ref(false);
const selectSquad = (id) => {
  changeSelectedSquadron(id);
};

onMounted(async () => {
  // axios to get the player's squadron
  if (squadronStore.squadrons.value.length === 0) {
    try {
      await fetchSquadrons();
      console.log(squadronStore.selectedSquadron.value);
    } catch (err) {
      console.log(err);
      playerStore.error.value = err;
    }
  }
});
</script>

<style lang="scss" scoped></style>
