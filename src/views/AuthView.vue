<template>
  <div class="w-full max-w-xs gap-y-2">
    <form @submit.prevent="submitForm" class="">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="username">
          USERNAME
        </label>
        <input-field id="username" type="text" v-model="username" />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input-field id="password" type="password" v-model="password" />
      </div>
      <div class="w-100 flex flex-col">
        <game-btn type="submit" color="white" :loading="loading">
          {{ pageTitle }}
        </game-btn>

        <game-btn link="/" color="white"> BACK </game-btn>
      </div>
    </form>
    <ErrorMessage :error="playerStore.error" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { usePlayerStore } from "@/stores/usePlayerStore";

import ErrorMessage from "@/components/ErrorMessage.vue";
import GameBtn from "@/components/ui/GameBtn.vue";
import InputField from "@/components/ui/InputField.vue";

const router = useRouter();
const currentRoute = useRoute();

const playerStore = storeToRefs(usePlayerStore());

const username = ref("");
const password = ref("");

const loading = ref(false);

const pageTitle = computed(() => {
  return currentRoute.name == "login" ? "LOG IN" : "REGISTER";
});

const submitForm = (event) => {
  if (currentRoute.name == "login") {
    login(event);
  } else {
    register(event);
  }
};

const login = async (event) => {
  try {
    loading.value = true;
    const response = await axios.post("/api/player/login", {
      name: username.value,
      password: password.value,
    });
    console.log(response.data);

    if (response.data && response.data.player.token) {
      localStorage.setItem("token", response.data.player.token);
      playerStore.error.value = null;
      playerStore.token.value = response.data.player.token;
      playerStore.id.value = response.data.player.id;
      playerStore.name.value = response.data.player.name;
      playerStore.cash.value = response.data.player.cash;
      playerStore.diamonds.value = response.data.player.diamonds;
    }

    loading.value = false;
    router.push("/hangar");
    return response;
  } catch (error) {
    console.error(error);
    loading.value = false;
    playerStore.error.value = error.response.data.error;
    return error;
  }
};

const register = async (event) => {
  event.preventDefault();

  try {
    loading.value = true;
    const response = await axios.post("/api/player/register", {
      name: username.value,
      password: password.value,
    });
    if (response.data && response.data.player.token) {
      console.log(response.data);
      localStorage.setItem("token", response.data.player.token);
      playerStore.token.value = response.data.player.token;
      playerStore.error.value = null;
      playerStore.id.value = response.data.player.id;
      playerStore.name.value = response.data.player.name;
      playerStore.cash.value = response.data.player.cash;
      playerStore.diamonds.value = response.data.player.diamonds;
    }
    loading.value = false;
    router.push("/hangar");
  } catch (error) {
    console.error(error);
    loading.value = false;
    playerStore.error.value = error.response.data.error;
  }
};

onMounted(() => {
  playerStore.error.value = null;
  if (playerStore.token.value) {
    router.push("/hangar");
  }
  console.log(pageTitle);
});
</script>

<style scoped lang="scss">
// Here would go any scoped styles for this component
main {
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 10px;
}
</style>
