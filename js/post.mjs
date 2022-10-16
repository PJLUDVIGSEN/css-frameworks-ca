import { removePost } from "./api/posts/delete.mjs";
import { getPost } from "./api/posts/read.mjs";
import { updateFormListener, fillForm } from "./handlers/updatePost.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const postFeed = document.querySelector(".postFeed");

async function postSingle(container) {
  const postData = await getPost(id)
  container.innerHTML = `<div class="card mb-3 pt-2 sizer col-auto mb-3 post">
                          <div class="card-body post">
                            <img class="card-img-top mediaDiv" onError="this.style.display=\'none\';this.class=null;" id="mediaDiv" src="${postData.media}"  alt="User post image">
                            <img class="mr-3 rounded-circle avatar img-fluid mt-2" src="${postData.author.avatar}" onerror="this.src='/images/userimage.png'" alt="Generic placeholder image">
                            <h5 class="card-title">${postData.author.name}</h5>
                            <h6 class="mt-0 card-subtitle">${postData.title}</h6>
                            <p class="card-text mb-0">${postData.body}</p>
                            <p class="card-text"><small class="text-muted">${postData.tags}</small></p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                          </div>
                        </div>`;
}

postSingle(postFeed)

const btn = document.querySelectorAll(".bttn");
const postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelector(".updateBtn");
const cancel = document.querySelector(".cancelBtn");
const h1 = document.querySelector("h1");
const form = document.querySelector("#createForm");
const remove = document.querySelector(".deleteBtn")

btn.forEach((item) => {
  item.addEventListener("click", function formChanger() {
    if (event.target.classList.contains("updateBtn")) {
      fillForm(id);
      cancel.classList.remove("hidden");
      remove.classList.remove("hidden");
      form.classList.remove("hidden")
      postBtn.textContent = "EDIT";
      updateBtn.classList.add("hidden")
    }
    if (event.target.textContent === "EDIT") {
      updateFormListener();
    }
    if (event.target.classList.contains("cancelBtn")) {
      cancel.classList.add("hidden");
      form.classList.add("hidden");
      form.reset();
      updateBtn.classList.remove("hidden");
    }
    if (event.target.classList.contains("deleteBtn")) {
      removePost(id);
      cancel.classList.add("hidden");
      form.classList.add("hidden");
      form.reset();
      updateBtn.classList.remove("hidden");
      alert("Post Deleted")
    }
  });
});
