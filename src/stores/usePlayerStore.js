import { ref, computed } from "vue";
import { defineStore } from "pinia";

import router from "@/router";

export const usePlayerStore = defineStore(
  "playerStore",
  () => {
    const id = ref(0);
    const name = ref("");
    const error = ref(null);
    const token = ref(null);
    const cash = ref(0);
    const diamonds = ref(0);

    const leaveGame = () => {
      id.value = 0;
      name.value = "";
      error.value = null;
      token.value = null;
      cash.value = 0;
      diamonds.value = 0;
      localStorage.removeItem("token");

      router.push({ name: "home" });
    };

    return { id, name, error, token, cash, diamonds, leaveGame };
  },
  {
    persist: {
      enabled: true,
    },
  }
);
