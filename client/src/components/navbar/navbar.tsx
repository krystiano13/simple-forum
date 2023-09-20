import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import NavbarStyles from "./Navbar.css?inline";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  const isLoggedIn = useSignal(false);
  const user = useSignal("Admin");

  useStylesScoped$(NavbarStyles);

  return (
    <nav class="navbar p-1 bg-primary flex ai-center jc-between">
      <section class="title">
        <h1 class="font-head f-600 f-l p-1 color">Simple Forum</h1>
      </section>
      <section class="content flex">
        <form class="m-1 flex">
          <input
            class="p-1 pl-4 pr-4 font-other bg-secondary color"
            type="text"
            placeholder="Find something ..."
          />
          <button
            class="p-1 pl-2 pr-2 font-head bg-accent color-bg"
            type="submit"
          >
            Search
          </button>
        </form>
        <div class="user m-1 flex">
          {isLoggedIn.value === false ? (
            <>
              <Link href="/login">
                <button class="ml-1 mr-1 p-1 pl-4 pr-4 font-head bg-accent color-bg">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button class="ml-1 mr-1 p-1 pl-4 pr-4 font-head bg-accent color-bg">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <a href="/">{user.value}</a>
          )}
        </div>
      </section>
    </nav>
  );
});
