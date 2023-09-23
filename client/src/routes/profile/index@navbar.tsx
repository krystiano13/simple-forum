import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const name = useSignal<string>("Admin");
  const since = useSignal<string>("00-00-00");
  const comments = useSignal<number>(0);
  const posts = useSignal<number>(0);

  return (
    <div class="width-100 height-100 profileWrapper flex jc-center ai-center">
      <div class="profile bg-primary br-1">
        <img src="" alt="" />
        <h2>Name : {name.value}</h2>
        <p>Joined : {since.value}</p>
        <p>Comments : {comments.value}</p>
        <p>Posts : {posts.value}</p>
        <button>Logout</button>
      </div>
    </div>
  );
});
