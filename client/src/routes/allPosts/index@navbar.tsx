import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { Posts } from "~/components/posts/Posts";

export default component$(() => {
    const phrase = useSignal<string>('_');
    useVisibleTask$(({ track }) => {
        track(() => localStorage.getItem("phrase"));

        if (localStorage.getItem('phrase')) {
            phrase.value = localStorage.getItem("phrase") as string;
        }
        else {
            phrase.value = '_';
        }

        console.log(localStorage.getItem("phrase"));
    });

    return <div class="container container-xxl row ai-center">
        <Posts phrase={ phrase.value } mode="all" />                                                      
    </div>;
});