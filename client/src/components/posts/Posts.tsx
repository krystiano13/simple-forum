import { component$, useStylesScoped$ } from "@builder.io/qwik"; 
import BestStyles from '../best/Best.css?inline';

export const Posts = component$(() => {

    useStylesScoped$(BestStyles);

    return (
      <div class="best flex jc-center flex-col pl-6">
        <h2 class="f-xl font-head f-600 color text-left mt-6">Latest Posts:</h2>
        <div class="posts mt-2 bg-primary p-3">
          <div class="users mt-2">
            <div class="user">
              
            </div>
          </div>
        </div>
      </div>
    );
});