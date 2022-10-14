import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../handlers/storage.mjs"

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const userUrl = API_SOCIAL_URL + action;

  const response = await fetch(userUrl, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body: JSON.stringify(profile)
  })


  const {accessToken, ...user} = await response.json()
  
  storage.save("token", accessToken);
  storage.save("user", user);

}