import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const isLoggedIn = useSignal(false);
  const user = useSignal("Admin");

  return (
    <nav class="navbar">
      <section class="title">
        <h1>Simple Forum</h1>
      </section>
      <section class="content">
        <form>
          <input type="text" placeholder="Find something ..." />
          <button type="submit">Search</button>
        </form>
        <div class="user">
          {isLoggedIn.value ? (
            <>
              <button>Log In</button>
              <button>Register</button>
            </>
          ) : (
            <a href="/">{user.value}</a>
          )}
        </div>
      </section>
    </nav>
  );
});
