import {
  component$,
  useVisibleTask$,
  useStylesScoped$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import BestStyles from "../../../components/best/Best.css?inline";

interface dataInterface {
  status: boolean;
  post?: {
    id: number;
    created_at: string;
    username: string;
    title: string;
    content: string;
  };
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

  useStylesScoped$(BestStyles);

  useVisibleTask$(() => {
    if (post.value.status === false) {
      window.location.href = "/";
    }
  });

  return (
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
          </div>
        </div>
      </div>
    </div>
  );
});
