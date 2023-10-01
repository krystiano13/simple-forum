import {
  component$,
  useVisibleTask$,
  useStylesScoped$,
  useResource$,
  Resource,
  useSignal,
  $,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import BestStyles from "../../../components/best/Best.css?inline";
import PostsStyles from "./Posts.css?inline";
import { Spinner } from "~/components/spinner/Spinner";

interface dataInterface {
  status: boolean;
  post?: {
    id: number;
    created_at: string;
    username: string;
    title?: string;
    content: string;
  };
  comments?: {
    id: number;
    created_at: string;
    username: string;
    content: string;
  }[];
}

export const usePost = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/getOnePost/${requestEvent.params.post_id}`
  );
  const data = await response.json();

  return data as dataInterface;
});

export default component$(() => {
  const post = usePost();
  const loggedIn = useSignal<boolean>(false);
  const spinner = useSignal<boolean>(true);
  const form = useSignal<HTMLFormElement>();
  const isUserOwner = useSignal<boolean>(false);
  useStylesScoped$(BestStyles);
  useStylesScoped$(PostsStyles);

  const editPost = $(() => {
    localStorage.setItem('post_id', post.value.post?.id.toString() as string);
    localStorage.setItem('title', post.value.post?.title as string);
    localStorage.setItem('content', post.value.post?.content as string);

    window.location.href = '/editPost';
  });

  const deletePost = $(async () => {
    const formData = new FormData();
    formData.append("username", localStorage.getItem("user") as string);
    await fetch(`http://127.0.0.1:8000/api/deletePost/${post.value.post?.id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(localStorage.getItem("user") as string);
        console.log(data);
        if (!data.status) return;
        window.location.href = "/";
      });
  });

  const sendComment = $(async () => {
    if (!localStorage.getItem("user") || !localStorage.getItem("token_id")) {
      return;
    }

    const username: string = localStorage.getItem("user") as string;
    const post_id: string = post.value.post?.id.toString() as string;
    const formData = new FormData(form.value);

    formData.append("username", username);
    formData.append("post_id", post_id);

    console.log(formData.get("content"));

    await fetch("http://127.0.0.1:8000/api/addComment", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          window.location.reload();
        }
      });
  });

  useVisibleTask$(() => {
    if (post.value.status === false) {
      window.location.href = "/";
    }

    if (
      window.localStorage.getItem("user") &&
      localStorage.getItem("token_id")
    ) {
      loggedIn.value = true;

      if (post.value.post?.username === localStorage.getItem("user")) {
        isUserOwner.value = true;
      }
    } else {
      loggedIn.value = false;
      spinner.value = false;
    }
  });

  const resource = useResource$(async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/getPostComments/${post.value.post?.id}`
    );

    const data = await res.json();

    return data as dataInterface;
  });

  return (
    <>
      <div class="container container-xxl row jc-center ai-center">
        <div class="block col-12">
          <div class="best flex jc-center flex-col pl-6">
            <h2 class="f-xl font-head f-600 color text-left mt-6">
              {post.value.post?.title}
            </h2>
            <div class="posts mt-2 bg-primary p-3">
              <div class="users mt-2">
                <div class="user">
                  <div class="block bg-secondary color p-2 br-1 width-50">
                    <h2 class="m-1 font-head f-600 f-m">
                      {post.value.post?.username}
                    </h2>
                    <p class="m-1 font-other f-400 f-xs">
                      created at: {post.value.post?.created_at}
                    </p>
                  </div>
                  <div class="block bg-secondary color p-2 mt-1 br-1 width-100">
                    <p class="m-1 font-other f-300 f-m">
                      {post.value.post?.content}
                    </p>
                  </div>
                </div>
              </div>
              {isUserOwner.value && (
                <>
                  {" "}
                  <button
                    onClick$={editPost}
                    id="sendButton"
                    class="border-bottom-3 border-bottom-solid border-color-primary 
              c-pointer mt-1 font-head border-none color-secondary bg-accent f-600 f-s p-1 pr-6 pl-6"
                  >
                    Edit
                  </button>
                  <button
                    onClick$={deletePost}
                    id="sendButton"
                    class="border-bottom-3 border-bottom-solid border-color-primary 
              c-pointer mt-1 ml-1 font-head border-none color-secondary bg-accent f-600 f-s p-1 pr-6 pl-6"
                  >
                    Delete
                  </button>{" "}
                </>
              )}
            </div>
          </div>
        </div>
        <div class="block col-12">
          <div class="best flex jc-center flex-col pl-6">
            <h2 class="f-xl font-head f-600 color text-left mt-6">Comments</h2>
            {loggedIn.value ? (
              <form onSubmit$={sendComment} preventdefault:submit ref={form}>
                <textarea
                  name="content"
                  placeholder="Write Your comment"
                  class="outline-none font-other p-1 mt-1 color bg-secondary br-1 f-400 f-s"
                ></textarea>
                <br />
                <button
                  id="sendButton"
                  class="border-bottom-3 border-solid border-color-primary 
              c-pointer mt-1 font-head border-none color-secondary bg-accent f-600 f-s p-1 pr-6 pl-6"
                >
                  Send
                </button>
              </form>
            ) : (
              <> {spinner.value && <Spinner />} </>
            )}
            <div class="posts mt-2 bg-primary p-3">
              <div class="users mt-2">
                <div class="user">
                  <Resource
                    value={resource}
                    onPending={() => <Spinner />}
                    onRejected={() => <div>Couldn't load news</div>}
                    onResolved={(data) => (
                      <>
                        {data.comments?.map((item) => (
                          <div class="block bg-secondary color p-2 mt-1 br-1 width-100">
                            <h2 class="m-1 font-head f-600 f-m">
                              {item.username}
                            </h2>
                            <p class="m-1 font-other f-400 f-xs">
                              created at: {post.value.post?.created_at}
                            </p>
                            <p class="m-1 font-other f-300 f-m">
                              {item.content}
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
        </div>
      </div>
    </>
  );
});
