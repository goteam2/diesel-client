<template>
  <transition name="fade">
    <div
      class="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-red-500 text-black text-md font-black uppercase | border-4 border-black shadow-lg"
      v-if="playerStore.error.value"
    >
      <div class="flex justify-between items-center">
        <div>{{ playerStore.error.value }}</div>
        <button @click="closeError">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-5 w-5 ml-2 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
const playerStore = storeToRefs(usePlayerStore());

const closeError = () => {
  playerStore.error.value = null;
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
