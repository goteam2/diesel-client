<template>
  <div class="w-full max-w-xs gap-y-2">
    {{ squadron }}
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
import GameBtn from "@/components/ui/GameBtn.vue";
const { leaveGame } = usePlayerStore();
const playerStore = storeToRefs(usePlayerStore());

const squadron = ref(null);

onMounted(async () => {
  console.log("mounted");
  // axios to get the player's squadron
  try {
    let token = localStorage.getItem("token");
    const config = {
      headers: { "x-access-token": token },
    };
    await axios.get("/api/squadron/all", config).then((response) => {
      console.log(response.data);
      squadron.value = response.data;
    });
  } catch (error) {
    console.log(error);
    playerStore.error.value = error;
  }
});
</script>

<style lang="scss" scoped></style>
