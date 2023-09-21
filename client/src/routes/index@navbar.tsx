import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Best } from "~/components/best/Best";

export default component$(() => {
  return (
    <div class="container container-xxl row">
      <div class="block col-6 col-xxl-12">
        <Best />
      </div>
      <div class="col-xxl-12"></div>
      <div class="col-12"></div>
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
      content: "Krystian Zieja",
    },
    {
      name: "keywords",
      content: "forum, simple, everything, ask, answers",
    },
  ],
};
