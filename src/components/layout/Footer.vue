<template>
  <div class="w-full">
    <div class="grid grid-cols-12 mx-auto | items-center px-4 py-2">
      <div
        class="col-span-9 | uppercase font-black text-5xl | flex justify-start items-center"
      >
        {{ currentRoute }}
      </div>
      <div class="col-span-3 flex justify-end items-center">
        <component :is="icons[pageIcon]" class="fill-black h-10 w-10" />
      </div>
    </div>
    <form class="grid grid-cols-4" name="bottom-nav">
      <router-link
        class="grid place-items-center aspect-square"
        :to="btn.link"
        role="button"
        v-for="btn in navItems"
        :key="btn.name"
        :btn-id="btn.id"
      >
        <input
          :id="'bottom-nav-input_' + btn.id"
          type="radio"
          class="hidden"
          name="bottom-nav"
          :value="btn.name"
          v-model="currentRoute"
        />
        <label
          :for="'bottom-nav-input_' + btn.id"
          class="bg-black p-5 | h-full w-full"
        >
          <icon
            :name="btn.icon"
            height="h-full"
            width="w-full"
            class="fill-light"
          />
        </label>
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useRoute } from "vue-router";
const playerStore = storeToRefs(usePlayerStore());

import Icon from "@/components/Icon.vue";

import shopIcon from "@/assets/icons/shop.svg";
import hangarIcon from "@/assets/icons/hangar.svg";
import missionsIcon from "@/assets/icons/missions.svg";
import settingsIcon from "@/assets/icons/settings.svg";

const icons = {
  shop: shopIcon,
  hangar: hangarIcon,
  missions: missionsIcon,
  settings: settingsIcon,
};

const route = useRoute();
const currentRoute = ref(null);
const pageIcon = ref("shop");
// watch route and set pageIcon
watch(route, (newVal, oldVal) => {
  pageIcon.value = newVal.name;
  currentRoute.value = newVal.name;
  console.log("route changed", newVal, oldVal, pageIcon.value);
});

const navItems = [
  {
    id: 0,
    name: "shop",
    icon: "shop",
    link: "/shop",
  },
  {
    id: 1,
    name: "hangar",
    icon: "hangar",
    link: "/hangar",
  },

  {
    id: 2,
    name: "missions",
    icon: "missions",
    link: "/missions",
  },
  {
    id: 3,
    name: "settings",
    icon: "settings",
    link: "/settings",
  },
];
</script>

<style lang="scss" scoped>
input[type="radio"]:checked + label {
  transition: 0.03s transform ease;
  transform: rotate(45deg) scale(0.7);
  & svg {
    transform: rotate(-45deg);
  }
}
</style>
