import { component$, useStylesScoped$ } from "@builder.io/qwik";
import LoginStyles from '../login/login.css?inline';

export default component$(() => {

    useStylesScoped$(LoginStyles);

    return (
      <div class="formWrapper flex jc-center ai-center">
        <form class="flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary">
          <h1 class="m-3 color text-center f-h1">Register</h1>
          <input
            class="m-3 p-2 bg-secondary f-s color"
            placeholder="username"
            type="text"
            name="name"
          />
          <input
            class="m-3 p-2 bg-secondary f-s color"
            placeholder="email address"
            type="email"
            name="email"
          />
          <input
            class="m-3 p-2 bg-secondary f-s color"
            placeholder="password"
            type="password"
            name="password"
          />
          <input
            class="m-3 p-2 bg-secondary f-s color"
            placeholder="repeat password"
            type="password"
            name="password_confirmation"
          />
          <button class="m-3 p-2 bg-accent color-bg f-600 f-s" type="submit">
            Create Account
          </button>
        </form>
      </div>
    );
});