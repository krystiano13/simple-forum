import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import BestStyles from "./Best.css?inline";

export const Best = component$(() => {
  useStylesScoped$(BestStyles);
  const mode = useSignal(true);

  return (
    <div class="best flex jc-center flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left mt-6">Best Users:</h2>
      <div class="panel mt-2 bg-primary p-3">
        <div class="buttons flex">
          <button
            onClick$={() => {
              mode.value = true;
            }}
            class={
              mode.value
                ? "b1 font-head f-600 p-1 bg-secondary color"
                : "b2 font-head f-600 p-1 bg-accent"
            }
          >
            Comments
          </button>
          <button
            onClick$={() => {
              mode.value = false;
            }}
            class={
              !mode.value
                ? "b1 font-head f-600 p-1 bg-secondary color"
                : "b2 font-head f-600 p-1 bg-accent"
            }
          >
            Posts
          </button>
        </div>
        <div class="users mt-2">
          <div class="user">
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
            <div class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
              Admin (2137)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
