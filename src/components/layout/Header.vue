<template>
  <header>
    <div class="bg-black grid place-items-center h-12">
      <h1 class="text-center text-2xl font-black text-light">
        {{ currentRoute }}
      </h1>
    </div>
    <div class="grid grid-cols-2 | py-4 px-6 | bg-white">
      <div class="flex justify-start items-center">
        <icon name="money" class="" />
        <span class="ml-2 font-black text-4xl">{{ playerStore.cash }}</span>
      </div>
      <div class="flex justify-end items-center">
        <icon name="diamonds" />
        <span class="ml-2 font-black text-4xl">{{ playerStore.diamonds }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
const playerStore = storeToRefs(usePlayerStore());

import Icon from "@/components/Icon.vue";

const route = useRoute();
const currentRoute = ref(null);

watch(route, (newVal, oldVal) => {
  currentRoute.value = newVal.name.toUpperCase();
  if (newVal.name === "home") {
    currentRoute.value = "HEAVY DIESEL";
  }
  // console.log("route changed", newVal, oldVal, pageIcon.value);
});
</script>

<style lang="scss" scoped></style>
