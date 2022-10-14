import { load } from "../../handlers/storage.mjs";
import { API_SOCIAL_URL, postDetails } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function createData(postData) {
  const createPostURL = API_SOCIAL_URL + action;
  const response = await authFetch(createPostURL, {
    method: "post",
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  return post;
}
