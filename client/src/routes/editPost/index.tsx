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

  const titleInput = useSignal<HTMLInputElement>();
  const contentInput = useSignal<HTMLTextAreaElement>();

  const title = useSignal<string>("");
  const content = useSignal<string>("");
  const post_id = useSignal<string>("");

  useStylesScoped$(LoginStyles);

  const edit = $(async () => {
    const formData = new FormData(form.value);
    formData.append("username", localStorage.getItem("user") as string);

    await fetch(`http://127.0.0.1:8000/api/editPost/${post_id.value}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          alert(data.message);
          return;
        }

        window.location.href = `/posts/${post_id.value}`;
      });
  });

  useVisibleTask$(() => {
    if (
      !localStorage.getItem("user") ||
      !localStorage.getItem("token_id") ||
      !localStorage.getItem("title") ||
      !localStorage.getItem("content") ||
      !localStorage.getItem("post_id")
    ) {
      window.location.href = "/";
    }

    title.value = localStorage.getItem("title") as string;
    content.value = localStorage.getItem("content") as string;
    post_id.value = localStorage.getItem("post_id") as string;

    if (titleInput.value) titleInput.value.value = title.value;

    if (contentInput.value) contentInput.value.value = content.value;
  });

  return (
    <div class="formWrapper flex jc-center ai-center">
      {spinner.value && <Spinner />}

      {spinner.value === false && (
        <form
          ref={form}
          preventdefault:submit
          class="postCreateForm flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary"
          onSubmit$={edit}
        >
          <h1 class="m-3 color text-center f-h1 f-600 font-head">
            Create Post
          </h1>
          <input
            class="m-3 p-2 bg-secondary f-s color font-other"
            placeholder="Title"
            type="text"
            name="title"
            ref={titleInput}
          />
          <textarea
            class="m-3 p-2 bg-secondary f-s color font-other"
            placeholder="Post content"
            name="content"
            ref={contentInput}
          ></textarea>
          <button
            class="m-3 p-2 bg-accent color-bg f-600 f-s font-head"
            type="submit"
          >
            Edit
          </button>
          {errors.value.map((item) => (
            <p class="text-center font-head color f-500 f-xs">{item}</p>
          ))}
        </form>
      )}
    </div>
  );
});
