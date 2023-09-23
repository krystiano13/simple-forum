import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import User from "../../../public/user.png?jsx";
import ProfileStyles from "./profile.css?inline";

export default component$(() => {
  const name = useSignal<string>("Admin");
  const since = useSignal<string>("00-00-00");
  const comments = useSignal<number>(0);
  const posts = useSignal<number>(0);

  useStylesScoped$(ProfileStyles);

  return (
    <div class="width-100 height-100 profileWrapper flex jc-center ai-center">
      <div class="p-6 pl-7 pr-7 profile bg-primary flex flex-col ai-center jc-center">
        <User class="avatar m-2" />
        <h2 class="m-2 font-head color f-xxl">Name : {name.value}</h2>
        <p class="m-2 font-other color f-m">Joined : {since.value}</p>
        <p class="m-2 font-other color f-m">Comments : {comments.value}</p>
        <p class="m-2 font-other color f-m">Posts : {posts.value}</p>
        <button class="btn c-pointer m-2 bg-secondary color font-head p-1 pl-6 pr-6">Logout</button>
      </div>
    </div>
  );
});
