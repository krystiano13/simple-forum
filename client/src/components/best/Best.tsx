import { component$, useStylesScoped$ } from "@builder.io/qwik";
import BestStyles from "./Best.css?inline";

export const Best = component$(() => {
  useStylesScoped$(BestStyles);

  return (
    <div class="best">
      <h2>Best Users</h2>
      <div class="panel">
        <div class="buttons">
          <button>Comments</button>
          <button>Posts</button>
        </div>
        <div class="users">
          <div class="user">
            <p>Admin (2137)</p>
          </div>
        </div>
      </div>
    </div>
  );
});
