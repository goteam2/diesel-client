// axios functions to get data from the api, sending token and refreshing if necessary

// Path: src\utils\getData.js
import axios from "axios";

import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/usePlayerStore";
const player = storeToRefs(usePlayerStore());

const ensureToken = async () => {
  return new Promise(async (resolve, reject) => {
    let token = player.token.value;
    let tokenExpiration = player.tokenExpires.value;
    if (token && tokenExpiration) {
      const now = new Date();
      const expirationDate = Date(parseInt(tokenExpiration));
      console.log(now, expirationDate, tokenExpiration);

      tokenExpiration == "undefined" ? reject("No token found") : null;
      if (now >= expirationDate) {
        console.log("Token expired, refreshing");
        const refresh = await axios.post("/api/player/refresh", {
          token: token,
          playerId: player.id.value,
        });
        localStorage.setItem("token", refresh.data.token);
        localStorage.setItem("tokenExpires", refresh.data.expires);
        player.token = refresh.data.token;
        player.tokenExpires = refresh.data.expires;
        token = refresh.data.token;
        return resolve(token);
      } else {
        return resolve(token);
      }
    } else {
      const router = useRouter();

      console.log("No token found");
      reject("No token found");
      router.push("/login");
    }
  });
};

const postData = async (url, payload) => {
  console.log("sending POST request to ", url, "containing", payload);
  return new Promise(async (resolve, reject) => {
    let token = player.token.value;

    try {
      const validToken = await ensureToken();
      if (validToken) {
        const data = await axios.post(url, payload, {
          headers: {
            "x-access-token": validToken,
          },
        });
        resolve(data);
      }
    } catch (err) {
      console.info(err);
      reject({ message: err });
    }
  });
};

// do the same but with a get request
const getData = async (url) => {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem("token");
    try {
      const tokenValid = await ensureToken();
      if (tokenValid) {
        const data = await axios.get(url, {
          headers: {
            "x-access-token": token,
          },
        });
        resolve(data);
      } else {
        reject("Token invalid");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export { postData, getData };
