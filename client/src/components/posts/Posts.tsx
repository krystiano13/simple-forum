import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import BestStyles from "../best/Best.css?inline";

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

  return (
    <div class="best flex jc-center flex-col pl-6">
      <h2 class="f-xl font-head f-600 color text-left mt-6">Latest Posts:</h2>
      <div class="posts mt-2 bg-primary p-3">
        <div class="users mt-2">
          <div class="user">
            <Resource
              value={latestPostData}
              onPending={() => <div>Loading ...</div>}
              onRejected={() => <div>Couldn't load news</div>}
              onResolved={() => <></>}
            />
            {latestPostData.value.then((data) =>
              data.posts.map((item) => (
                <div
                  key={item.id}
                  class="block bg-secondary color p-2 m-1 br-1"
                >
                  <h2 class="m-1 font-head f-600 f-xl">{item.title}</h2>
                  <p class="m-1 font-other f-400 f-m">
                    <b>{item.username}</b> at {item.created_at}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
