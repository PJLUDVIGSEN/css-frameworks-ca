import { load } from "../../handlers/storage.mjs";
import { API_SOCIAL_URL, postDetails } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
const action = "/posts";



/**
 * function that takes postdata in as a value and creates a post object for the api to store
 * @param  {object} postData object with data
 * @param  {string} createPostURL url to connect to the api
 */
export async function createData(postData) {
  const createPostURL = API_SOCIAL_URL + action;
  const response = await authFetch(createPostURL, {
    method: "post",
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  return post;
}
