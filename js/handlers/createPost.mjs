import { createData } from "../api/posts/create.mjs";

/**
 * function that fetch values from form-inputs to create postdata to send to the API which also deletes the media value if it is left empty
 * @param  {form} form targets the create a post form
 * @param  {event} form.addEventListener listens for submit event of the form 
 * @param  {object} post creates an object from the form inputs to fulfill post request
 * @param  {function} createData takes the post data created in the object and sends a request to the api
 */
export function createFormListener() {
  const form = document.querySelector("#createForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    if (!post.media || post.media === "") {
      delete post.media;
    }
    createData(post);
  })
};

