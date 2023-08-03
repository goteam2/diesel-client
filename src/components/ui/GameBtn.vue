<template>
  <button
    :type="type"
    :class="btnClass"
    @click="onClick"
    class="flex gap-x-4 justify-center items-center"
  >
    <svg
      class="animate-spin h-5 w-5 text-black inline"
      v-if="loading"
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
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

let props = defineProps({
  type: {
    type: String,
    default: "button",
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const router = useRouter();

const onClick = () => {
  if (props.link) {
    router.push(props.link);
  }
};

const btnClass = computed(() => {
  return [
    "block w-full mb-4 p-2",
    "bg-transparent hover:bg-white/20",
    "focus:outline-none focus:ring focus:ring-offset-2",
    "border-black border-4 focus:-ring-white rounded-0",
    "text-center text-black text-2xl font-black",
    "hover:opacity-90 focus:border-secondary",
    "transition-opacity duration-150 ease-in-out",
  ].join(" ");
});
</script>

<style lang="scss" scoped></style>
