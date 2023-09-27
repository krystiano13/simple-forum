import {
  component$,
  useStylesScoped$,
  $,
  useTask$,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import BestStyles from "../best/Best.css?inline";

type newsType = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  username: string;
};

interface dataType {
  status: boolean;
  news: newsType[];
}

export const News = component$(() => {
  useStylesScoped$(BestStyles);

  const useNews = useResource$<dataType>(async () => {
    const res = await fetch("http://127.0.0.1:8000/api/getNews");
    const data = await res.json();

    return data as dataType;
  });

  return (
    <div class="best flex jc-center flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left mt-6">News:</h2>
      <div class="news mt-2 bg-primary p-3">
        <div class="users mt-2">
          <div class="user">
            <Resource
              value={useNews}
              onPending={() => <div>Loading ...</div>}
              onRejected={() => <div>Couldn't load news</div>}
              onResolved={() => <></>}
            />
            {useNews.value.then((data) =>
              data.news.map((item) => (
                <div
                  key={item.id}
                  class="block bg-secondary color font-other f-400 p-2 m-1 br-1"
                >
                  {item.created_at}: {item.title}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
