import {
  API_PROFILE,
  API_SOCIAL_POSTS,
  API_SOCIAL_URL,
  API_SOCIAL_URL_POSTS,
  fullDetails,
  postDetails,
  postLength,
} from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { renderPosts } from "../../postfeed.mjs";
const action = "/posts";
const method = "get";

export async function getPosts() {
  const getPostURL = `${API_SOCIAL_URL_POSTS}`;

  const response = await authFetch(getPostURL, {
    method,
  });

  const allPosts = await response.json();
  console.log(allPosts);
  return allPosts;
}

export async function getProfilePosts() {
  const getPostURL = `${API_SOCIAL_URL_POSTS}${postLength}`;

  const response = await authFetch(getPostURL, {
    method,
  });
  console.log(getPostURL);
  const profilePosts = await response.json();
  return profilePosts;
}

export async function getPost(id) {
  const getPostURL = `${API_SOCIAL_URL}${API_SOCIAL_POSTS}/${id}${fullDetails}`;

  const response = await authFetch(getPostURL, {
    method,
  });

  const singlePost = await response.json();

  return singlePost;
}

// async function postTemplate() {
//   const posts = await post.getPosts();
//   const post = posts.pop();
//   const postContainer = "";
//   // displayPost(url);
// }

export function searchPosts(posts) {
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();

    const filteredPosts = posts.filter(function (post) {
      if (
        post.author.name.toLowerCase().startsWith(searchValue) ||
        post.title.toLowerCase().startsWith(searchValue) ||
        post.body.toLowerCase().startsWith(searchValue) ||
        post.id.toString().startsWith(searchValue)
      ) {
        return true;
      }
    });
    renderPosts(filteredPosts);
  });
}
