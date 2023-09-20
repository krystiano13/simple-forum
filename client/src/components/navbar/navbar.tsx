import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import NavbarStyles from "./Navbar.css?inline";

export const Navbar = component$(() => {
  const isLoggedIn = useSignal(false);
  const user = useSignal("Admin");

  useStylesScoped$(NavbarStyles);

  return (
    <nav class="navbar p-1 bg-primary flex ai-center jc-between">
      <section class="title">
        <h1 class="font-head color">Simple Forum</h1>
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
