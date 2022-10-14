import { createFormListener } from "./handlers/createPost.mjs";
import { updateFormListener } from "./handlers/updatePost.mjs";
import { getPosts, getProfilePosts } from "./api/posts/read.mjs";
import { authFetch } from "../js/api/authFetch.mjs";
import { load } from "./handlers/storage.mjs";
import { API_SOCIAL_URL_POSTS, postLength } from "./api/constants.mjs";


const userName = load("user").name;

const postFeed = document.querySelector(".postFeed");

export async function myProfile(container) {
  const postData = await getProfilePosts();
  console.log(postData);

  for (let i = 0; i < postData.length; i++) {
    if (postData[i].author.name === userName)
      container.innerHTML += `<a href="post.html?id=${postData[i].id}" class="link-dark sizer"><div class="card mw-100 mb-3 pt-2 post">
                                <img class="card-img-top mediaDiv hidden" id="mediaDiv" src="${postData[i].media}"  alt="Card image cap">
                                <div class="card-body">
                                  <img class="mr-3 rounded-circle avatar" src="${postData[i].author.avatar}" onerror="this.src='/images/userimage.png'" width="40" height="auto" alt="Generic placeholder image">
                                  <h5 class="card-title">${postData[i].author.name}</h5>
                                  <h4 class="mt-0">${postData[i].title}</h4>
                                  <p class="card-text mb-0">${postData[i].body}</p>
                                  <p class="card-text"><small class="text-muted">${postData[i].tags}</small></p>
                                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                              </div></a>`;
  }
}
myProfile(postFeed);


const btn = document.querySelectorAll(".bttn");
const postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelectorAll(".updateBtn");
console.log(btn)
const cancel = document.querySelector(".cancelBtn");
const h1 = document.querySelector("h1");
const form = document.querySelector("#createForm");


postBtn.addEventListener("click", createFormListener());

