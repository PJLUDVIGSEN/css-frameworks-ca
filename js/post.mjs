import { removePost } from "./api/posts/delete.mjs";
import { getPost } from "./api/posts/read.mjs";
import { updateFormListener, fillForm } from "./handlers/updatePost.mjs";
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const postFeed = document.querySelector(".postFeed");

async function postSingle(container) {
  const postData = await getPost(id)
  console.log(postData)
        container.innerHTML = `<div class="card mb-3 pt-2 post sizer">
                                <img class="card-img-top mediaDiv hidden" id="mediaDiv" src="${postData.media}"  alt="Card image cap">
                                <div class="card-body">
                                  <img class="mr-3 rounded-circle avatar" src="${postData.author.avatar}" onerror="this.src='/images/userimage.png'" width="40" height="auto" alt="Generic placeholder image">
                                  <h5 class="card-title">${postData.author.name}</h5>
                                  <h4 class="mt-0">${postData.title}</h4>
                                  <p class="card-text mb-0">${postData.body}</p>
                                  <label class="" for="exampleFormControlTextarea1"></label>
                                  <textarea class="form-control " id="exampleFormControlTextarea1" rows="1"></textarea>
                                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                              </div>`;
}

postSingle(postFeed)


const btn = document.querySelectorAll(".bttn");
const postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelector(".updateBtn");
console.log(btn);
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
      console.log("update complete");
    }
    if (event.target.classList.contains("cancelBtn")) {
      cancel.classList.add("hidden");
      form.classList.add("hidden");
      form.reset();
      console.log("cancel");
      updateBtn.classList.remove("hidden");
    }
    if (event.target.classList.contains("deleteBtn")) {
      removePost(id);
      cancel.classList.add("hidden");
      form.classList.add("hidden");
      form.reset();
      console.log("delete");
      updateBtn.classList.remove("hidden");
      alert("Post Deleted")
    }
  });
});
