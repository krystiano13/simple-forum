import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, type RequestHandler } from "@builder.io/qwik-city";
import { Best } from "~/components/best/Best";
import { News } from "~/components/news/News";
import { Posts } from "~/components/posts/Posts";

export interface CountItem {
  id: number;
  username: string;
  count: number;
}

interface Count {
  posts: CountItem[];
  comments: CountItem[];
}

export const useCount = routeLoader$(async () => {
  const res = await fetch("http://127.0.0.1:8000/api/getAllCounts");
  const data = await res.json();

  return data as Count;
});

export default component$(() => {
  const apiData = useCount();   

  return (
    <div class="container container-xxl row jc-center ai-center">
      <div class="block col-6 col-xxl-12">
        <Best posts={apiData.value.posts} comments={apiData.value.comments} />
      </div>
      <div class="block col-6 col-xxl-12">
        <News />
      </div>
      <div class="block col-12">
        <Posts />
      </div>
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
