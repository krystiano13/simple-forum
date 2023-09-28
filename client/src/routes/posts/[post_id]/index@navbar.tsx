import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

interface dataInterface {
    status: boolean,
    post?: {
        id: number,
        created_at: string,
        username: string,
        title: string,
        content: string
    }
}

export const usePost = routeLoader$(async (requestEvent) => {
    const response = await fetch(`http://127.0.0.1:8000/api/getOnePost/${requestEvent.params.post_id}`);
    const data = await response.json();

    return data as dataInterface;
});

export default component$(() => { 
    const post = usePost();

    useVisibleTask$(() => { 
        if (post.value.status === false) {
            window.location.href = '/';
        }
    });

    return (
        <div>

        </div>
    )
});