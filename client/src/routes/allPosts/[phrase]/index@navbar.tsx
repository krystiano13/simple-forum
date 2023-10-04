import { component$, $, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { dataType } from "~/components/posts/Posts";

import BestStyles from "../../../components/best/Best.css?inline";
import PostsStyles from "../../../components/posts/Posts.css?inline";

export const usePosts = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/findPosts/${requestEvent.params.phrase}`
  );
  const data = await res.json();

  if (!data.status) {
    return { status: false, posts: [] } as dataType;
  }

  return data as dataType;
});

export default component$(() => {
  const posts = usePosts();

  useStylesScoped$(BestStyles);
  useStylesScoped$(PostsStyles);

  const redirectToPost = $((postId: number): void => {
    window.location.href = `/posts/${postId}`;
  });

  const createNewPost = $(() => {
    if (
      !window.localStorage.getItem("user") ||
      !window.localStorage.getItem("token_id")
    ) {
      window.location.href = "/login";
    } else {
      window.location.href = "/newPost";
    }
  });

  const viewAllPosts = $(() => {
    window.location.href = "/allPosts/_";
  });

  return (
    <div class="container container-xxl row ai-center">
      <div class="best flex jc-center flex-col pl-6">
        <h2 class="f-xl font-head f-600 color text-left mt-6">All Posts:</h2>
        <div class="posts mt-2 flex ai-center">
          <button
            class="p-1 pl-3 pr-3 f-600
          font-head c-pointer bg-accent color-background
          border-none border-bottom-3 border-bottom-solid border-bottom-primary"
            onClick$={createNewPost}
          >
            Create new post
          </button>
        </div>
        <div class="posts mt-2 bg-primary p-3">
          <div class="users mt-2">
            <div class="user">
              {posts.value.posts.map((item) => (
                <div
                  key={item.id}
                  class="block bg-secondary color p-2 m-1 br-1 c-pointer"
                  onClick$={() => redirectToPost(item.id)}
                >
                  <h2 class="m-1 font-head f-600 f-xl">{item.title}</h2>
                  <p class="m-1 font-other f-400 f-m">
                    <b>{item.username}</b> at {item.created_at}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
