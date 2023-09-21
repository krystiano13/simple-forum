import { component$, useStylesScoped$ } from "@builder.io/qwik";
import BestStyles from "./Best.css?inline";

export const Best = component$(() => {
  useStylesScoped$(BestStyles);

  return (
    <div class="best flex jc-center flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left">Best Users:</h2>
      <div class="panel mt-2 bg-primary p-3">
        <div class="buttons flex">
          <button id="b1" class="font-head f-600 p-1 bg-secondary color">Comments</button>
          <button id="b2" class="font-head f-600 p-1 bg-accent">Posts</button>
        </div>
        <div class="users mt-2">
          <div class="user">
            <p>Admin (2137)</p>
          </div>
        </div>
      </div>
    </div>
  );
});
