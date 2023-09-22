import { component$, useSignal, useStore, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import BestStyles from "./Best.css?inline";
import { RequestHandler } from "@builder.io/qwik-city";


export const Best = component$(() => {
  useStylesScoped$(BestStyles);
  const mode = useSignal(true);
  const comments = useSignal<any>([]);
  const posts = useSignal([]);

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
            {comments.value.map((item: { id:number, username:string, count:number }) => (
              <div key={item.id} class="block bg-secondary color font-other f-400 p-2 m-1 br-1">
                { item.username } ({ item.count })
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
