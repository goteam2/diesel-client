<template>
  <div
    class="mech"
    :class="flip ? 'slide-from-right' : 'slide-from-left'"
    :style="'animation-delay:' + mechId * 100 + 'ms'"
  >
    <div class="health-bar | bg-legendary | w-full h-2">
      <div class="health-bar__fill | bg-common | w-3/4"></div>
    </div>
    <img
      :src="'/src/assets/mechs/Mech' + mechId + '.webp'"
      class="h-full w-full"
      :style="'animation-delay:' + mechId * 100 + 'ms'"
      :class="flip ? 'transform -scale-x-100' : ''"
    />
    <div class="nameplate | text-white text-xs | w-full h-2">
      <div class="nameplate__name | text-center | w-full h-full">
        <span class="uppercase">Mech {{ mechId }}</span>
      </div>
    </div>
    <div class="gas-bar | bg-black | w-full h-2">
      <div class="gas-bar__fill | bg-uncommon | w-3/4"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  mechId: {
    type: String,
    required: true,
  },
  stats: {
    type: Object,
    required: false,
  },
  flip: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.mech {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 96px;
  width: 96px;
  overflow: visible;
  outline: 1px solid transparent;
  box-shadow: 0 0 0 1px transparent, 0 15px 10px -10px rgba(0, 0, 0, 0.5),
    0 -15px 10px -10px rgba(0, 0, 0, 0.25) inset;
  transition: all 0.125s ease;
  background: transparent;
  aspect-ratio: 1;

  &.slide-from-left {
    animation: slide-from-left 0.8s ease-in;
    animation-fill-mode: backwards;
  }
  &.slide-from-right {
    animation: slide-from-right 0.8s ease-in;
    animation-fill-mode: backwards;
  }

  &:hover {
    cursor: pointer;
    // background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.15rem);
    outline: 1px solid rgba(255, 255, 255, 0.5);
    filter: brightness(0.9);
    box-shadow: 0 0 30px 0px rgba(0, 0, 0, 0.5),
      0 0 30px 20px rgba(0, 0, 0, 0.25) inset;

    & .nameplate {
      opacity: 1;
    }
  }
  & .health-bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 0.35rem;
    display: flex;
    z-index: 4;
    border-radius: 0.5rem;
    overflow: hidden;

    &__fill {
      height: 100%;
      left: 0;
      justify-self: start;
    }
  }
  & .gas-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 0.25rem;
    display: flex;
    z-index: 4;
    border-radius: 0.5rem;
    overflow: hidden;

    &__fill {
      height: 100%;
      left: 0;
      justify-self: start;
    }
  }
  & .nameplate {
    position: absolute;
    bottom: 0.75rem;
    opacity: 0;

    &__name {
      height: 100%;
      left: 0;
      justify-self: start;
    }
  }
  & img {
    height: auto;
    // width: auto;
    max-width: 90%;
    max-height: 90%;
    // position: absolute;
    bottom: 0;
  }
}

// animations
@keyframes slide-from-left {
  0% {
    transform: translate(-250%, -100%);
  }
  100% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}
@keyframes slide-from-right {
  0% {
    transform: translate(250%, 100%);
  }
  100% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-2%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
