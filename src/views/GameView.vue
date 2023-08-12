<template>
  <div class="game-wrapper h-full w-full">
    <div class="relative" id="backgroundCanvas">
      <!-- FRIENDLIES -->
      <Mech class="bottom-8 left-2" mechId="1" />

      <Mech class="bottom-36 left-24" mechId="2" />

      <Mech class="bottom-52 left-0" mechId="3" />

      <!-- ENEMIES -->
      <Mech class="bottom-6 right-3" mechId="4" flip />

      <Mech class="bottom-20 right-28" mechId="5" flip />

      <Mech class="bottom-36 right-0" mechId="6" flip />
    </div>
    <div
      id="controls"
      class="grid grid-cols-2 | bg-light/60 border-t-4 border-black"
    >
      <div
        id="action-list"
        class="text-black uppercase text-center text-xs font-semibold | grid grid-cols-2 grid-rows-2 gap-x-2 | justify-stretch items-center | py-4 px-2"
      >
        <div class="p-2 | border-4 border-black bg-white">ENGAGE</div>
        <div class="p-2 | border-4 border-black bg-white">SUPPORT</div>
        <div class="p-2 | border-4 border-black bg-white">COMMAND</div>
        <div class="p-2 | border-4 border-black bg-white">EXTRACT</div>
      </div>
      <div id="mech-list" class="grid grid-cols-1 p-4">
        <div class="p-4 bg-white border-4 border-black"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Mech from "@/components/props/Mech.vue";
</script>

<style lang="scss" scoped>
#backgroundCanvas {
  background-image: url("@/assets/backgrounds/snowy_plain.png");
  backdrop-filter: brightness(0.5);
  background-size: fill;
  background-repeat: no-repeat;
  background-position: bottom center;
  //   z-index: -1;

  height: 80%;
  width: 100%;
}

#controls {
  height: 20%;
  width: 100%;
}
</style>
