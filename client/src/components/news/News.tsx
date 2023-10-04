import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
  $,
} from "@builder.io/qwik";
import BestStyles from "../best/Best.css?inline";
import { Spinner } from "../spinner/Spinner";

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

  const redirectToNews = $((id: number) => {
    window.location.href = `/news/${id}`;
  });

  const useNews = useResource$<dataType>(async () => {
    const res = await fetch("http://127.0.0.1:8000/api/getNews");
    const data = await res.json();

    (data as dataType).news.forEach((item) => {
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

  return (
    <div class="best flex jc-start flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left mt-6">News:</h2>
      <div class="news mt-2 bg-primary p-3">
        <div class="users mt-2">
          <div class="user">
            <Resource
              value={useNews}
              onPending={() => <Spinner />}
              onRejected={() => <div>Couldn't load news</div>}
              onResolved={(data) => (
                <>
                  {data.news.map((item) => (
                    <div
                      key={item.id}
                      onClick$={() => redirectToNews(item.id)}
                      class="block c-pointer bg-secondary color font-other f-400 p-2 m-1 br-1"
                    >
                      {item.created_at}: {item.title}
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
