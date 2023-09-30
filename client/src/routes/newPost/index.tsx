import {
  component$,
  useStylesScoped$,
  useVisibleTask$,
  $,
  useSignal,
} from "@builder.io/qwik";
import LoginStyles from "../login/login.css?inline";
import { Spinner } from "~/components/spinner/Spinner";

export default component$(() => {
  const spinner = useSignal<boolean>(false);
  const form = useSignal<HTMLFormElement>();
  const errors = useSignal<string[]>([]);

  useStylesScoped$(LoginStyles);

  const createPost = $(async () => {
    const formData: FormData = new FormData(form.value);
    formData.append("username", localStorage.getItem("user") as string);
    spinner.value = true;

    await fetch("http://127.0.0.1:8000/api/addPost", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          window.location.href = "/";
        } else {
          let title: string[] = [];
          let content: string[] = [];

          if (data.status.content) {
            content = [...data.status.content];
          }

          if (data.status.title) {
            title = [...data.status.title];
          }

          const err = [...title, ...content];

          errors.value = err;
        }

        spinner.value = false;
      });
  });

  useVisibleTask$(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem("token_id")) {
      window.location.href = "/";
    }
  });

  return (
    <div class="formWrapper flex jc-center ai-center">
      {spinner.value && <Spinner />}

      {spinner.value === false && (
        <form
          ref={form}
          preventdefault:submit
          class="postCreateForm flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary"
          onSubmit$={createPost}
        >
          <h1 class="m-3 color text-center f-h1 f-600 font-head">
            Create Post
          </h1>
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
          {errors.value.map((item) => (
            <p class="text-center font-head color f-500 f-xs">{item}</p>
          ))}
        </form>
      )}
    </div>
  );
});
