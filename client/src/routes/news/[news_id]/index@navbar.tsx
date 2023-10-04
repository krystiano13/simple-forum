import { component$, useStylesScoped$, useSignal } from "@builder.io/qwik";
import BestStyles from "../../../components/best/Best.css?inline";
import PostStyles from "../../../components/posts/Posts.css?inline";
import { routeLoader$ } from "@builder.io/qwik-city";

type News = {
  status: boolean;
  item: {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    content: string;
    username: string;
  };
};

export const useNews = routeLoader$(async (req) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/getSingleNews/${req.params.news_id}`
  );
  const data = await response.json();

  return data as News;
});

export default component$(() => {
  const news = useNews();
  useStylesScoped$(BestStyles);
  useStylesScoped$(PostStyles);

  return (
    <>
      <div class="container container-xxl row jc-center ai-center">
        <div class="block col-12">
          <div class="best flex jc-center flex-col pl-6">
            <h2 class="f-xl font-head f-600 color text-left mt-6">
              {news.value.item?.title}
            </h2>
            <div class="posts mt-2 bg-primary p-3">
              <div class="users mt-2">
                <div class="user">
                  <div class="block bg-secondary color p-2 br-1 width-50">
                    <h2 class="m-1 font-head f-600 f-m">
                      {news.value.item?.username}
                    </h2>
                    <p class="m-1 font-other f-400 f-xs">
                      created at: {news.value.item?.created_at}
                    </p>
                  </div>
                  <div class="block bg-secondary color p-2 mt-1 br-1 width-100">
                    <p class="m-1 font-other f-300 f-m">
                      {news.value.item?.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
