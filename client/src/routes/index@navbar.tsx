import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1 class="text-center f-h1">Simple forum</h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Simple Forum",
  meta: [
    {
      name: "description",
      content: "Simple internet forum about everything",
    },
    {
      name: "author",
      content: "Krystian Zieja"
    },
    {
      name: "keywords",
      content: "forum, simple, everything, ask, answers"
    }
  ],
};
