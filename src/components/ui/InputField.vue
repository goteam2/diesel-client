!
<template>
  <input :type="type" :class="inputClass" v-model="val" />
</template>

<script setup>
import { computed, ref } from "vue";

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
});

const val = ref();

const model = computed({
  get() {
    return this.value;
  },
  set(value) {
    this.$emit("input", value);
  },
});

const inputClass =
  "w-full | px-3 py-2 | font-black text-black placeholder-secondary | border-4 border-black outline-0 focus:border-legendary focus-visible:outline-transparent | rounded-none";
</script>

<style lang="scss" scoped></style>
