<template>
  <div class="grid grid-cols-2 py-4 px-6">
    <div class="flex justify-start items-center">
      <icon name="money" class="" />
      <span class="ml-2 font-black text-4xl">{{ playerStore.cash }}</span>
    </div>
    <div class="flex justify-end items-center">
      <icon name="diamonds" />
      <span class="ml-2 font-black text-4xl">{{ playerStore.diamonds }}</span>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
const playerStore = storeToRefs(usePlayerStore());

import Icon from "@/components/Icon.vue";
</script>

<style lang="scss" scoped></style>
