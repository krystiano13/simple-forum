import { component$ } from "@builder.io/qwik";
import { Posts } from "~/components/posts/Posts";

export default component$(() => {
    return <div class="container container-xxl row ai-center">
        <Posts mode="all" />                                                      
    </div>;
});