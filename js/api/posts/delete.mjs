import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
const action = "/posts";
const method = "delete";

/**
 * Delete request to API, to delete the postdata with the correct id value if the user has the proper authorization
 * @param  {number} id
 * @param  {string} removePostURL url to the api that targets a specific post with an id parameter
 * @param  {string} method "delete" method sent to api
 */

export async function removePost(id) {
  const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(removePostURL, {
    method
  });
  const remove = await response.json();

  return remove;
}
