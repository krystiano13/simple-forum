import { component$, useStylesScoped$, $, useSignal } from "@builder.io/qwik";
import LoginStyles from "../login/login.css?inline";


export default component$(() => {
  useStylesScoped$(LoginStyles);

  const formRef = useSignal<HTMLFormElement>();
  const errors = useSignal<any[]>([]);

  const register = $(async (form: HTMLFormElement) => {
    await fetch('http://127.0.0.1:8000/api/register',
      { method : "POST", body: new FormData(form) }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          alert('Account created successfully !!!');
          window.location.href = '/';
        }
        
        else {
          let nameErrors = [];
          let emailErrors = [];
          let passwordErrors = [];

          if (data.errors.name) {
            nameErrors = data.errors.name;
          }

          if (data.errors.email) {
            emailErrors = data.errors.email;
          }

          if (data.errors.password) {
            passwordErrors = data.errors.password;
          }

          errors.value = [...nameErrors, ...emailErrors, ...passwordErrors];
        }
    })
  });

  return (
    <div class="formWrapper flex jc-center ai-center">
      <form
        onSubmit$={() => register(formRef.value as HTMLFormElement)}
        preventdefault:submit
        ref={formRef}
        class="flex flex-col jc-center ai-center p-4 pt-8 pb-8 bg-primary"
      >
        <h1 class="m-3 color text-center f-h1 font-head">Register</h1>
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="username"
          type="text"
          name="name"
        />
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="email address"
          type="email"
          name="email"
        />
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="password"
          type="password"
          name="password"
        />
        <input
          class="m-3 p-2 bg-secondary f-s color font-other"
          placeholder="repeat password"
          type="password"
          name="password_confirmation"
        />
        <button
          class="m-3 p-2 bg-accent color-bg f-600 f-s font-head"
          type="submit"
        >
          Create Account
        </button>

        {
          errors.value.map(item => (<p class="text-center font-head color f-500 f-xs">{ item }</p>))
        }
      </form>
    </div>
  );
});
