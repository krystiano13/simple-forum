import { QwikSubmitEvent, component$, useStylesScoped$, useSignal, $ } from "@builder.io/qwik";
import LoginStyles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(LoginStyles);

  const formRef = useSignal<HTMLFormElement>();

  const logIn = $(async (e: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          alert(data.message);
          window.localStorage.setItem("user", data.token.name);
          window.localStorage.setItem("token_id", data.token.id);
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      });
  });

  return (
    <div class="formWrapper flex jc-center ai-center">
      <form
        preventdefault:submit
        ref={formRef}
        onSubmit$={(e) => logIn(e, formRef.value as HTMLFormElement)}
        class="flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary"
      >
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
