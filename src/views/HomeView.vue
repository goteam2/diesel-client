<template>
  <div class="w-full max-w-xs gap-y-2">
    <game-btn link="/register" color="white"> REGISTER </game-btn>
    <game-btn link="/login" color="white"> LOG IN</game-btn>
  </div>
</template>

<script setup>
// Here would go any composition API methods, computed properties, etc.
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";

import GameBtn from "@/components/ui/GameBtn.vue";

import { useRouter } from "vue-router";
const router = useRouter();
const playerStore = storeToRefs(usePlayerStore());

onMounted(() => {
  if (playerStore.token.value) {
    router.push("/hangar");
  }
});
</script>

<style scoped lang="scss">
// Here would go any scoped styles for this component
</style>
