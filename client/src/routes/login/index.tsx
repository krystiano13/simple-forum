import { component$, useStylesScoped$ } from "@builder.io/qwik";
import LoginStyles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(LoginStyles);

  return (
    <div class="formWrapper flex jc-center ai-center">
      <form class="flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary">
        <h1 class="m-3 color text-center f-h1 f-600 font-head">Sign in</h1>
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="username"
          type="text"
          name="name"
        />
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="password"
          type="password"
          name="password"
        />
        <button
          class="m-3 p-2 bg-accent color-bg f-600 f-s font-head"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
});
