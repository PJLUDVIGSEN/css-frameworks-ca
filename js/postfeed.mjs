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

/**
 * @param  {element} postBtn button for click event
 * @param  {event} postBtn.addEventListener if postbutton is clicked run createFormListener which creates the post
 */
if (postBtn) {
  postBtn.addEventListener("click", () => {
    createFormListener();
  });
}



/**function which accepts a url that connects to the api to retrive the api response and populate the postfeed with user posts
 * @param  {string} url variable to access api
 * @param  {function} displayPosts calls the authenticated fetch of the api request to populate the post on the page
 * @param  {*}  postData.length loops through postdata from api response and populates the container with postdata attributes in html format for the feed

 */
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


/**function which accepts a url that connects to the api to retrive the api response and populate the postfeed with user posts with the input of the searchfield
 * @param  {object} posts variable to target posts
 * @param  {function} d posts.forEach calls the authenticated fetch of the api request to populate the post on the page
 * @param  {*}  posts.forEach loops through postdata from api response and populates the container with postdata attributes in html format for the feed

 */
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
                                    <p class="card-text"><small class="text-muted">Post-id: ${post.id}</small></p>
                                  </div>
                                </div>`;
  });
}


/**function which uses a url to search for posts with  the specific url parameters
 * @param  {function}  searchPosts uses the response of the api request to filter the postfeed to the search input value on postfeed.html
 */
async function goSearch() {
  const url = API_SOCIAL_URL_POSTS + postLength;
  const result = await authFetch(url);
  const response = await result.json();
  searchPosts(response);
}


/**
 * @param  {element} searchBtn searchbtn used to submit search requests on the postfeed
 * @param  {event} addEventListener listens for the submit of the search input to initiate the goSearch function to filter posts
 */
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  document.getElementById("searchBtn").addEventListener("submit", goSearch());
}


/** function to filter posts on the postfeed by ascending or descending order
 * @param  {element} select contains the options you can filter by
 * @param  {element} document.getElementById adds a onchange event which registeres which option the user has chosen to filter the postfeed by
 * @param  {} document.getElementById
 * @param  {function} displayPosts the parameter entered into this function determines which order the feed is sorted by
 */
export function filterThePosts() {
  const select = document.getElementById("selecter");

  if (select)
    document.getElementById("selecter").onchange = function (event) {
      const selectValue = event.target.value;
      if (selectValue === "val1") {
        const api = API_SOCIAL_URL_POSTS + sortDsc;
        posts.innerHTML = "";
        displayPosts(api);
      }
      if (selectValue === "val2") {
        let api = API_SOCIAL_URL_POSTS;
        posts.innerHTML = "";
        displayPosts(api + sortAsc);
      }
    };
}

filterThePosts();
