import { component$ } from "@builder.io/qwik";
import { useStylesScoped$ } from "@builder.io/qwik";

import SpinnerStyles from './Spinner.css?inline';

export const Spinner = component$(() => {

    useStylesScoped$(SpinnerStyles);

    return (
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
});