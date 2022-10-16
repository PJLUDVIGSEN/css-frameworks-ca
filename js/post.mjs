import { removePost } from "./api/posts/delete.mjs";
import { getPost } from "./api/posts/read.mjs";
import { updateFormListener, fillForm } from "./handlers/updatePost.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const postFeed = document.querySelector(".postFeed");
const btn = document.querySelectorAll(".bttn");
const postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelector(".updateBtn");
const cancel = document.querySelector(".cancelBtn");
const form = document.querySelector("#createForm");
const remove = document.querySelector(".deleteBtn");

/** function which creates html based on the parameters of the object targeted by a specific id parameter
 * @param  {element} container determines the container of the content location
 * @param  {object} postData Get request to api to fetch a single post with a specific id parameter
 * @param  {innerHTML} container.innerHTML targets the container and fills it with object data based on chosen object paramaters in html format
 */
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
                          </div>
                        </div>`;
}
postSingle(postFeed)

/** listener that listens for a click event which renders a form that offer the user freedom to delete or change their post object.
 * @param  {element} btn.forEach targets buttons within the form to execute different actions.
 * @param  {event} item.addEventListener click event which triggers the formChanger function to allow for different actions.
 * @param  {function} formChanger function which triggers visibility of the different form elements and actions based on which button is clicked.
 * @param  {function} fillForm fills the form inputs with the target object data that corresponds with the inputs in the form.
 * @param  {function} updateFormListener when called, this function sends the new input data to the api which creates an updated post object.
 * @param  {element} event.target.classList.contains defines if event target element contains the appropriate class which triggers different events based off of its value.
 * @param  {element} event.target.textContent verifies if the event target corresponds with the textcontent of the element to fire correct response.
 * @param  {function} form.reset if click event targets the cancel edit button the form will reset and exit the editor.
 * @param  {function} removePost if target of click event is delete formChanger will call the removePost function which targets the object id and sends a delete request of the object to the api.
 */
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
      alert("Post Deleted");
    }
  });
});
