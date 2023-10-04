import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
  $,
} from "@builder.io/qwik";
import BestStyles from "../best/Best.css?inline";
import PostsStyles from "./Posts.css?inline";
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

interface PostsProps {
  mode: string;
  phrase: string;
}

export const Posts = component$((props: PostsProps) => {
  useStylesScoped$(BestStyles);
  useStylesScoped$(PostsStyles);

  const latestPostData = useResource$<dataType>(async () => {
    let url: string;

    if (props.mode === "partial") {
      url = await "http://127.0.0.1:8000/api/getLatestPosts";
    } else { 
      url = await `http://127.0.0.1:8000/api/findPosts/${props.phrase}`;
    }

    const response = await fetch(url);
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
    } else {
      window.location.href = "/newPost";
    }
  });

  const viewAllPosts = $(() => {
    window.location.href = "/allPosts";
  });

  return (
    <>
      <div class="best flex jc-center flex-col pl-6">
        <h2 class="f-xl font-head f-600 color text-left mt-6">
          {props.mode === "all" ? "All" : "Latest"} Posts:
        </h2>
        <div class="posts mt-2 flex ai-center">
          <button
            class="p-1 pl-3 pr-3 f-600
          font-head c-pointer bg-accent color-background
          border-none border-bottom-3 border-bottom-solid border-bottom-primary"
            onClick$={createNewPost}
          >
            Create new post
          </button>
          {props.mode === "partial" && (
            <button
              class="ml-1 p-1 pl-3 pr-3 f-600
              font-head c-pointer bg-accent color-background
              border-none border-bottom-3 border-bottom-solid border-bottom-primary"
              onClick$={() => viewAllPosts()}
            >
              View all posts
            </button>
          )}
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
    </>
  );
});
