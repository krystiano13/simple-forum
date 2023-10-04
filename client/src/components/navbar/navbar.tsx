import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import NavbarStyles from "./Navbar.css?inline";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  const isLoggedIn = useSignal(false);
  const user = useSignal("Admin");
  const searchInput = useSignal<HTMLInputElement>();

  const search = $(async () => {
    if (!searchInput.value) return;
    const phrase = await searchInput.value.value;
    await fetch(`http://127.0.0.1:8000/api/findPosts/${phrase}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("phrase", phrase);
          window.location.href = "/allPosts";
        }
      });
  });

  useStylesScoped$(NavbarStyles);

  useVisibleTask$(({ track }) => {
    track(() => window.localStorage.getItem("user"));
    if (
      window.localStorage.getItem("user") &&
      localStorage.getItem("token_id")
    ) {
      isLoggedIn.value = true;
      user.value = window.localStorage.getItem("user") as string;
    } else {
      isLoggedIn.value = false;
    }
  });

  return (
    <nav class="navbar p-1 bg-primary flex ai-center jc-between">
      <section class="title">
        <h1 class="font-head f-600 f-l p-1 color">Simple Forum</h1>
      </section>
      <section class="content flex">
        <form onSubmit$={search} preventdefault:submit class="m-1 flex">
          <input
            ref={searchInput}
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
        <div class="user m-1 flex ai-center">
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
            <Link
              class="anchor text-right pl-2 pr-2 decoration-none c-pointer font-head color f-m"
              href="/profile"
            >
              {user.value}
            </Link>
          )}
        </div>
      </section>
    </nav>
  );
});
