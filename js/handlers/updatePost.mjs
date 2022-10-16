import { updatePost } from "../api/posts/update.mjs";
import { getPost } from "../api/posts/read.mjs";

export async function updateFormListener() {

  const form = document.querySelector("#createForm");


  const queryString = document.location.search; 
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  console.log(id);

  if (form) { 

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    post.id = id;
    if (!post.media || post.media === "") {
      delete post.media;
    }
    updatePost(post);
  });
}
}

export async function fillForm(id) {
  const form = document.querySelector("#createForm");
      const post = await getPost(id);
      form.media.value = post.media;
      form.title.value = post.title;
      form.body.value = post.body;
      form.tags.value = post.tags;
}
