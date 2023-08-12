import { ref, reactive, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";

const playerStore = storeToRefs(usePlayerStore());

import router from "@/router";

import { postData } from "@/utils/getData.js";

export const useSquadronStore = defineStore(
  "squadronStore",
  () => {
    const squadrons = ref([]);
    const selectedSquadron = ref(0);
    const getSelectedSquadron = computed(() => {
      return squadrons.value[selectedSquadron.value];
    });
    const selectedMech = ref(0);
    const getSelectedMech = computed(() => {
      if (!squadrons.value[selectedSquadron.value]) return null;
      return squadrons.value[selectedSquadron.value].mechs[selectedMech.value];
    });
    const loading = ref(false);
    const fetchSquadrons = async () => {
      try {
        loading.value = true;
        const data = {
          playerId: playerStore.id.value,
        };
        const squads = await postData("/api/squadron/all", data).then(
          (response) => {
            if (response.error) {
              loading.value = false;
              throw new Error(response);
            }
            console.log(response.data);
            squadrons.value = response.data;
            selectedSquadron.value = 0;
            playerStore.error.value = null;

            loading.value = false;

            return squadrons.value;
          }
        );
      } catch (error) {
        console.error(error.message);
        playerStore.error.value = error.message;
        loading.value = false;
      }
    };

    const changeSelectedSquadron = (id) => {
      selectedSquadron.value = id;
    };

    return {
      squadrons,
      fetchSquadrons,
      selectedSquadron,
      getSelectedSquadron,
      selectedMech,
      getSelectedMech,
      changeSelectedSquadron,
      loading,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);
