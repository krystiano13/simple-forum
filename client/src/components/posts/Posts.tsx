import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
  $,
} from "@builder.io/qwik";
import BestStyles from "../best/Best.css?inline";
import PostsStyles from './Posts.css?inline';
import { Spinner } from "../spinner/Spinner";

type post = {
  id: number;
  created_at: string;
  username: string;
  title: string;
  content: string;
};

interface dataType {
  status: boolean;
  posts: post[];
}

export const Posts = component$(() => {
  useStylesScoped$(BestStyles);
  useStylesScoped$(PostsStyles);

  const latestPostData = useResource$<dataType>(async () => {
    const response = await fetch("http://127.0.0.1:8000/api/getLatestPosts");
    const data = await response.json();

    (data as dataType).posts.forEach((item) => {
      const date: Date = new Date(item.created_at);

      const year: number = date.getFullYear();
      const day: number = date.getUTCDate();
      const month: number = date.getMonth() + 1;

      let textMonth: string;

      if (month < 10) textMonth = `0${month}`;
      else textMonth = month.toString();

      item.created_at = `${day} ${textMonth} ${year}`;
    });

    return data as dataType;
  });

  const redirectToPost = $((postId: number): void => {
    window.location.href = `/posts/${postId}`;
  });

  const createNewPost = $(() => {
    if (
      !window.localStorage.getItem("user") ||
      !window.localStorage.getItem("token_id")
    ) {
      window.location.href = "/login";
    }
  });

  return (
    <div class="best flex jc-center flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left mt-6">Latest Posts:</h2>
      <div class="posts mt-2 flex ai-center">
        <button
          class="p-1 pl-3 pr-3 f-600
          font-head c-pointer bg-accent color-background
          border-none border-bottom-3 border-bottom-solid border-bottom-primary"
          onClick$={createNewPost}
        >
          Create new post
        </button>
        <button
          class="ml-1 p-1 pl-3 pr-3 f-600
        font-head c-pointer bg-accent color-background
        border-none border-bottom-3 border-bottom-solid border-bottom-primary"
        >
          View all posts
        </button>
      </div>
      <div class="posts mt-2 bg-primary p-3">
        <div class="users mt-2">
          <div class="user">
            <Resource
              value={latestPostData}
              onPending={() => <Spinner />}
              onRejected={() => <div>Couldn't load news</div>}
              onResolved={(data) => (
                <>
                  {data.posts.map((item) => (
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
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
