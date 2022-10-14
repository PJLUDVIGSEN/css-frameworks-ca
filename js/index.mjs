import { API_SOCIAL_URL_POSTS } from "./api/constants.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { createFormListener } from "./handlers/createPost.mjs";
import { getPost, getPosts, getProfilePosts, searchPosts } from "./api/posts/read.mjs";

const posts = document.querySelector(".allPosts");
const method = "get";
const mediaDiv = document.querySelector("#mediaDiv");
const avatar = document.querySelector(".avatar")
const searchBtn = document.querySelector("#search");


export async function displayPosts(url) {
  const response = await authFetch(url, {
    method,
  });

  const result = await response.json();
  const postData = result;
  for (let i = 0; i < postData.length; i++) {

    posts.innerHTML += `<div class="card mb-3 pt-2 sizer">
                          <img class="card-img-top mediaDiv hidden" id="mediaDiv" src="${postData[i].media}"  alt="Card image cap">
                          <div class="card-body">
                            <img class="mr-3 rounded-circle avatar" src="${postData[i].author.avatar}" onerror="this.src='/images/userimage.png'" width="40" height="auto" alt="Generic placeholder image">
                            <h5 class="card-title">${postData[i].author.name}</h5>
                            <h4 class="mt-0">${postData[i].title}</h4>
                            <p class="card-text mb-0">${postData[i].body}</p>
                            <label class="" for="exampleFormControlTextarea1"></label>
                            <textarea class="form-control " id="exampleFormControlTextarea1" rows="1"></textarea>
                            <button type="button" class="btn btn-dark mt-2 btn-sm">Comment</button>
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
                                  <img class="card-img-top mediaDiv hidden" id="mediaDiv" src="${post.media}"  alt="Card image cap">
                                  <div class="card-body">
                                    <img class="mr-3 rounded-circle avatar" src="${post.author.avatar}" onerror="this.src='/images/userimage.png'" width="40" height="auto" alt="Generic placeholder image">
                                    <h5 class="card-title">${post.author.name}</h5>
                                    <h4 class="mt-0">${post.title}</h4>
                                    <p class="card-text mb-0">${post.body}</p>
                                    <label class="" for="exampleFormControlTextarea1"></label>
                                    <textarea class="form-control " id="exampleFormControlTextarea1" rows="1"></textarea>
                                    <button type="button" class="btn btn-dark mt-2 btn-sm">Comment</button>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                  </div>
                                </div>`;
  });
}


async function goSearch() {
    const result = await authFetch(API_SOCIAL_URL_POSTS);
    const response = await result.json();
  
    searchPosts(response);
    renderPosts(response);
    
}

goSearch();

