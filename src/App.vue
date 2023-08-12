<template>
  <div class="h-full grid grid-rows-main-layout grid-cols-1 | bg-light">
    <Header />
    <main class="main-wrapper flex items-stretch justify-stretch | p-0">
      <router-view v-slot="{ Component }" class="row-span-4">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-show="player.id > 0" />
    <ErrorMessage :error="playerStore.error" />
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
import ErrorMessage from "@/components/ErrorMessage.vue";

const playerStore = storeToRefs(usePlayerStore());

const player = ref(playerStore);
</script>

<style lang="scss" scoped>
.main-wrapper {
  // height: calc(120px 1fr calc(0.25 * 100vw));
}
// Here would go any scoped styles for this component
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// BUTTON STYLES
</style>
