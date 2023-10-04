import { component$, useStylesScoped$ } from "@builder.io/qwik";
import BestStyles from '../../../components/best/Best.css?inline';
import PostStyles from '../../../components/posts/Posts.css?inline';
import { routeLoader$ } from "@builder.io/qwik-city";

type News = {
    status: boolean,
    item: {
        id: number,
        created_at: string,
        updated_at: string,
        title: string,
        content: string,
        username: string
    }
}

export const useNews = routeLoader$(async (req) => { 
    const response = await fetch(`http://127.0.0.1:8000/api/getSingleNews/${req.params.news_id}`);
    const data = await response.json();

    return data as News;
});

export default component$(() => {
    
    const news = useNews();

    useStylesScoped$(BestStyles);
    useStylesScoped$(PostStyles);

    return (
        <></>
    )
});