import { component$, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import LoginStyles from '../login/login.css?inline';

export default component$(() => {

  useStylesScoped$(LoginStyles);

  useVisibleTask$(() => { 
    if (!localStorage.getItem("user") || !localStorage.getItem("token_id")) {
      window.location.href = '/';
    }
  });

  return (
    <div class="formWrapper flex jc-center ai-center">
      <form
        preventdefault:submit
        class="postCreateForm flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary"
      >
        <h1 class="m-3 color text-center f-h1 f-600 font-head">Create Post</h1>
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="Title"
          type="text"
          name="title"
        />
        <textarea
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="Post content"
          name="content"
        ></textarea>
        <button
          class="m-3 p-2 bg-accent color-bg f-600 f-s font-head"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
});

// {
//errors.value.map((item) => (
// <p class="text-center font-head color f-500 f-xs">{item}</p>
//));
//}
