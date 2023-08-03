<template>
  <div class="flex flex-col | bg-light">
    <Header />
    <Currency v-show="player.id > 0" />
    <main class="flex flex-col | justify-center items-center | h-full | p-4">
      <transition name="fade">
        <router-view />
      </transition>
    </main>
    <Footer v-show="player.id > 0" />
  </div>
</template>

<script setup>
// Here would go any composition API methods, computed properties, etc.
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";

import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Currency from "@/components/layout/Currency.vue";

const playerStore = storeToRefs(usePlayerStore());

const player = ref(playerStore);
watch(playerStore, (newVal, oldVal) => {
  console.log("player changed", newVal, oldVal);
  player.value = newVal;
});
</script>

<style lang="scss" scoped>
// Here would go any scoped styles for this component
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

// BUTTON STYLES
</style>
