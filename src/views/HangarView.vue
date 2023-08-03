<template>
  <div class="w-full max-w-xs gap-y-2">
    <game-btn link="/squadron" color="white"> SQUADRON </game-btn>
    <game-btn link="/equipment" color="white"> EQUIPMENT</game-btn>
    <game-btn link="/comms" color="white">COMMS</game-btn>
    <game-btn @click="leaveGame" color="white">EXIT</game-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import GameBtn from "@/components/ui/GameBtn.vue";
const { leaveGame } = usePlayerStore();
const playerStore = storeToRefs(usePlayerStore());
</script>

<style scoped lang="scss">
.btn {
  @apply py-2 px-4 rounded;

  &.btn-blue {
    @apply bg-blue-500 hover:bg-blue-700 text-white;
  }

  &.btn-red {
    @apply bg-red-500 hover:bg-red-700 text-white;
  }
}
main {
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 10px;
}
</style>
