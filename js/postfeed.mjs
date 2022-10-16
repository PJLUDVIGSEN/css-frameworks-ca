import {
  API_SOCIAL_URL_POSTS,
  postLength,
  sortAsc,
  sortDsc,
} from "./api/constants.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { createFormListener } from "./handlers/createPost.mjs";
import {
  getPost,
  getPosts,
  getProfilePosts,
  searchPosts,
} from "./api/posts/read.mjs";

const posts = document.querySelector(".allPosts");
const method = "get";
const mediaDiv = document.querySelector("#mediaDiv");
const avatar = document.querySelector(".avatar");
const searchInput = document.getElementById("searchInput");
const postBtn = document.querySelector("#postBtn");
const select = document.getElementById("selecter");

if (postBtn) {
  postBtn.addEventListener("click", () => {
    createFormListener();
  });
}

export async function displayPosts(url) {
  const response = await authFetch(url, {
    method,
  });

  const result = await response.json();
  const postData = result;

  for (let i = 0; i < postData.length; i++) {
    if (posts)
      posts.innerHTML += `<div class="card mb-3 pt-2 sizer col-auto mb-3 post">
                            <div class="card-body post">
                               <img class="card-img-top mediaDiv" onError="this.style.display=\'none\';this.class=null;" id="mediaDiv" src="${postData[i].media}"  alt="User post image">
                                <img class="mr-3 rounded-circle avatar img-fluid mt-2" src="${postData[i].author.avatar}" onerror="this.src='/images/userimage.png'" alt="Generic placeholder image">
                                <h5 class="card-title">${postData[i].author.name}</h5>
                                <h6 class="mt-0 card-subtitle">${postData[i].title}</h6>
                                <p class="card-text mb-0">${postData[i].body}</p>
                                <p class="card-text"><small class="text-muted">${postData[i].tags}</small></p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                              </div>
                          </div>`;
  }
}

displayPosts(API_SOCIAL_URL_POSTS);

export function renderPosts(posts) {
  const container = document.querySelector(".allPosts");
  container.innerHTML = "";

  posts.forEach(function (post) {
    container.innerHTML += `<div class="card mb-3 pt-2 post sizer">
    
                                  <img class="card-img-top mediaDiv hidden" onError="this.style.display=\'none\';this.class=null;" id="mediaDiv" src="${post.media}"  alt="Card image cap">
                                  <div class="card-body">
                                    <img class="mr-3 rounded-circle avatar" src="${post.author.avatar}" onerror="this.src='/images/userimage.png'" width="40" height="auto" alt="Generic placeholder image">
                                    <h5 class="card-title">${post.author.name}</h5>
                                    <h4 class="mt-0">${post.title}</h4>
                                    <p class="card-text mb-0">${post.body}</p>
                                    <label class="" for="exampleFormControlTextarea1"></label>
                                    <textarea class="form-control " id="exampleFormControlTextarea1" rows="1"></textarea>
                                    <button type="button" class="btn btn-dark mt-2 btn-sm">Comment</button>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    <p class="card-text"><small class="text-muted">Post-id: ${post.id}</small></p>
                                  </div>
                                </div>`;
  });
}

async function goSearch() {
  const url = API_SOCIAL_URL_POSTS + postLength;
  const result = await authFetch(url);
  const response = await result.json();
  searchPosts(response);
}

const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  document.getElementById("searchBtn").addEventListener("submit", goSearch());
}

export function lol() {
  const select = document.getElementById("selecter");

  if (select)
    document.getElementById("selecter").onchange = function (event) {
      console.log(event);
      const selectValue = event.target.value;
      console.log(selectValue);

      if (selectValue === "val1") {
        const api = API_SOCIAL_URL_POSTS + sortDsc;
        posts.innerHTML = "";
        displayPosts(api);
        console.log(select.value);
      }
      if (selectValue === "val2") {
        let api = API_SOCIAL_URL_POSTS;
        posts.innerHTML = "";
        displayPosts(api + sortAsc);
        console.log(select.value);
      }
    };
}

lol();
