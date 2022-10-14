import { createData } from "../api/posts/create.mjs";

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

