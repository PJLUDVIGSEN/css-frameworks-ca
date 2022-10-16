import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../handlers/storage.mjs";
import { loginFormListener } from "../../handlers/login.mjs";
const action = "/auth/register";
const method = "post";

/**
 * Authenticates user registration and creates an object that can store uservalues
 * @param  {object} profile
 */

export async function register(profile) {
  const userUrl = API_SOCIAL_URL + action;
  const response = await fetch(userUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(profile)
  });
  
  const result = await response.json();
  return result
}
