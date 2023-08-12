<template>
  <footer class="w-full">
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
          class="bg-black p-5 | h-full w-full | grid place-items-center"
        >
          <icon
            :name="btn.icon"
            height="h-14"
            width="w-full"
            class="fill-light"
          />
        </label>
      </router-link>
    </form>
  </footer>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useRoute } from "vue-router";
const playerStore = storeToRefs(usePlayerStore());

import Icon from "@/components/Icon.vue";

import marketIcon from "@/assets/icons/market.svg";
import hangarIcon from "@/assets/icons/hangar.svg";
import missionsIcon from "@/assets/icons/missions.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import commsIcon from "@/assets/icons/comms.svg";

const icons = {
  market: marketIcon,
  hangar: hangarIcon,
  missions: missionsIcon,
  communications: commsIcon,
};

const navItems = [
  {
    id: 0,
    name: "market",
    icon: "market",
    link: "/market",
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
    name: "comms",
    icon: "comms",
    link: "/comms",
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
