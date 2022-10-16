import { createFormListener } from "./handlers/createPost.mjs";
import { updateFormListener } from "./handlers/updatePost.mjs";
import { getPosts, getProfilePosts } from "./api/posts/read.mjs";
import { authFetch } from "../js/api/authFetch.mjs";
import { load } from "./handlers/storage.mjs";
import { API_SOCIAL_URL_POSTS, postLength } from "./api/constants.mjs";

const userName = load("user").name;

const postFeed = document.querySelector(".postFeed");

export async function myProfile() {
  const postData = await getProfilePosts();

  for (let i = 0; i < postData.length; i++) {
    if (postData[i].author.name === userName)
      postFeed.innerHTML += `<a href="post.html?id=${postData[i].id}" class="link-dark card mb-3 pt-2 sizer col-auto mb-3 post">
                                <div class="card-body post">
                                  <img class="card-img-top mediaDiv" onError="this.style.display=\'none\';this.class=null;" id="mediaDiv" src="${postData[i].media}"  alt="User post image">
                                  <img class="mr-3 rounded-circle avatar img-fluid mt-2" src="${postData[i].author.avatar}" onerror="this.src='/images/userimage.png'" alt="Generic placeholder image">
                                  <h5 class="card-title">${postData[i].author.name}</h5>
                                  <h4 class="mt-0">${postData[i].title}</h4>
                                  <p class="card-text mb-0">${postData[i].body}</p>
                                  <p class="card-text"><small class="text-muted">${postData[i].tags}</small></p>
                                </div>
                            </a>`;
  }
}

myProfile();

const btn = document.querySelectorAll(".bttn");
let postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelectorAll(".updateBtn");

postBtn.addEventListener("click", createFormListener());
