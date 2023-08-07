<template>
  <div
    class="w-full h-full | gap-y-4 | flex flex-col justify-start items-stretch"
  >
    <!-- SQUAD LIST -->
    <div
      class="squad-list | border-4 border-black | bg-white | py-4"
      v-if="!squadronStore.loading.value"
    >
      <article
        :key="key"
        v-for="(squad, key) in squadronStore.squadrons.value"
        v-show="squadronStore.selectedSquadron.value == key"
        :data-squad-id="squad.id"
        :data-active-squad="squadronStore.selectedSquadron.value == key"
        @slidechange="setSelectedMech"
      >
        <swiper-container
          slides-per-view="1.5"
          effect="coverflow"
          :centered-slides="true"
        >
          <swiper-slide v-for="(mech, idx) in squad.mechs" v-key="mech.id">
            <div
              class="grid grid-cols-12 grid-rows-4 gap-x-4 | mb-2 p-4 | border-4 border-black | bg-light"
            >
              <!-- MECH ID BLOCK -->
              <div class="col-span-4 row-span-6 | grid grid-cols-1 grid-rows-4">
                <div
                  class="row-span-4 | grid place-content-center | bg-black | aspect-square"
                >
                  <span class="text-6xl font-black text-white">{{
                    idx + 1
                  }}</span>
                </div>

                <!-- <div
                  class="col-span-4 row-span-2 | grid grid-cols-1 grid-rows-2 justify-center gap-2"
                >
                  <game-btn class="text-sm mb-0">Equip</game-btn>
                  <game-btn class="text-sm mb-0">Replace</game-btn>
                </div> -->
              </div>

              <!-- MECH NAME -->

              <div
                class="col-span-8 row-span-1 | uppercase font-black text-black"
              >
                <div>{{ mech.name }}</div>
              </div>
              <div
                class="col-span-8 row-span-1 | uppercase font-black text-secondary"
              >
                <div>{{ mech.class }}</div>
              </div>

              <!-- MECH STATS - LEFT -->
              <!-- <div
                class="col-span-8 row-span-2 | grid grid-cols-2 grid-rows-3 justify-center gap-0 | text-sm"
              >
                <span class=""> ATK: {{ mech.attack }} </span>
                <span class=""> DEF: {{ mech.defense }} </span>
                <span class=""> ACC: {{ mech.accuracy }} </span>
                <span class=""> SPD: {{ mech.speed }} </span>
                <span class=""> EVA: {{ mech.evasion }} </span>
                <span class=""> WGT: {{ mech.weight }} </span>
              </div> -->

              <!-- MECH AUGMENTS -->
              <!-- <div
                class="col-span-8 grid grid-rows-1 grid-cols-4 | place-items-center gap-2"
              >
                <icon name="augment_offensive" class="stroke-rare" />
                <icon name="augment_offensive" class="stroke-uncommon" />
                <icon name="augment_defensive" class="stroke-legendary" />
                <icon name="augment_defensive" class="stroke-common" />
              </div> -->
            </div></swiper-slide
          >
        </swiper-container>
      </article>
    </div>

    <div
      class="active-mech | grid grid-cols-1 place-items-center w-full gap-y-4"
      v-if="squadronStore.getSelectedMech"
    >
      <div
        class="col-span-8 row-span-2 w-full | grid grid-cols-2 grid-rows-3 place-items-center gap-0 | text-lg | bg-white border-4 border-black p-4"
      >
        <span class="">
          ATK: {{ squadronStore.getSelectedMech.value.attack }}
        </span>
        <span class="">
          DEF: {{ squadronStore.getSelectedMech.value.defense }}
        </span>
        <span class="">
          ACC: {{ squadronStore.getSelectedMech.value.accuracy }}
        </span>
        <span class="">
          SPD: {{ squadronStore.getSelectedMech.value.speed }}
        </span>
        <span class="">
          EVA: {{ squadronStore.getSelectedMech.value.evasion }}
        </span>
        <span class="">
          WGT: {{ squadronStore.getSelectedMech.value.weight }}
        </span>
      </div>

      <!-- MECH AUGMENTS -->
      <div
        class="col-span-8 grid grid-rows-1 grid-cols-4 w-full | place-items-center gap-2 | bg-white border-4 border-black p-4"
      >
        <icon name="augment_offensive" class="stroke-rare" />
        <icon name="augment_offensive" class="stroke-uncommon" />
        <icon name="augment_defensive" class="stroke-legendary" />
        <icon name="augment_defensive" class="stroke-common" />
      </div>
    </div>
    <!-- SQUAD SELECT -->
    <div
      class="squad-select grid grid-cols-12 gap-x-4 | row-span-2 | mt-auto"
      v-if="!squadronStore.loading.value"
    >
      <div
        class="col-span-4 | grid grid-cols-6 items-center gap-x-2 | transition-all duration-75 hover:scale-105 | relative"
        role="button"
        @click="$router.push('hangar')"
      >
        <div class="flex justify-end items-center | col-span-2">
          <icon name="back" height="h-auto" width="w-10" class="fill-black" />
        </div>
        <div class="rounded-full bg-black py-4 col-span-3 flex justify-center">
          <icon name="hangar" height="h-auto" width="w-6" class="fill-white" />
        </div>
      </div>
      <div
        class="col-span-8 | flex | bg-transparent hover:stroke-white hover:bg-white active:bg-white text-black | relative"
        @click="selectOpen = !selectOpen"
        role="button"
      >
        <div
          class="text-2xl font-black | flex items-center justify-start ps-4 | flex-1 border-4 border-black"
        >
          SQUAD {{ squadronStore.selectedSquadron.value + 1 }}
        </div>
        <div
          class="border-2 border-black bg-black | flex items-center h-full p-4 aspect-square"
        >
          <icon
            name="chevron_down"
            class="w-[24px] h-[auto] stroke-light rotate-180"
          />
        </div>

        <!-- dropdown  TODO INCLUDE LATER-->
        <div
          class="absolute bottom-0 mb-14 | w-full | overflow-hidden | bg-white border-4 border-black | uppercase text-2xl font-black text-center"
          :class="selectOpen ? 'block' : 'hidden'"
        >
          <div
            role="button"
            v-for="(squad, i) in squadronStore.squadrons.value"
            class="p-3 | border-black border-b-4 last:border-b-0 | cursor-pointer | bg-white hover:bg-light"
            :class="
              squadronStore.selectedSquadron.value === i
                ? 'text-basegray'
                : 'text-black '
            "
            @click="selectSquad(i)"
          >
            Squad {{ i + 1 }}
          </div>
        </div>
      </div>
    </div>
    <!-- LOADER -->
    <div
      class="loader | flex place-self-center"
      v-if="squadronStore.loading.value"
    >
      <svg
        class="animate-spin h-16 w-16 text-black inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
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

import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

const selectOpen = ref(false);
const selectSquad = (id) => {
  changeSelectedSquadron(id);
};
const setSelectedMech = (mech) => {
  squadronStore.selectedMech.value = mech.detail[0].activeIndex;
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

  const swiperEl = document.querySelector("swiper-container");

  swiperEl.addEventListener("slidechange", (event) => {
    console.log("slide changed", event);
  });
});
</script>

<style lang="scss" scoped>
.squad-list {
  // overflow-y: scroll;
}
</style>
