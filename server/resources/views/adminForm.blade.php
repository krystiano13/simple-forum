@extends('layout')

@section('content')
    <main class="bg row jc-center ai-center width-100 height-100">
        <section class="col-6 col-xxl-12">
            <h1 class="color font-head f-h1 m-1 text-center">Admin Panel</h1>
            <form class="m-1 mt-2 flex flex-col ai-center jc-center" method="POST" action="/adminLogout">
                @csrf
                <button class="m-1 p-1 pr-3 pl-3 font-head bg-accent border-none
                border-bottom-solid border-bottom-primary border-bottom-2
                c-pointer" type="submit">Logout</button>
                <button class="m-1 p-1 pr-3 pl-3 font-head bg-accent border-none
                border-bottom-solid border-bottom-primary border-bottom-2
                c-pointer" id="mode" type="button">mode: add</button>
            </form> 
            <form class="flex flex-col jc-center ai-center" action="">
                @csrf
                <input id="title" class="mt-2 width-25 p-1 f-s font-other outline-none" type="text" name="title" placeholder="Title" />
                <textarea class="mt-2 width-25 p-1 f-s font-other outline-none" placeholder="content" name="content"></textarea>
                <button class="mt-2 p-1 pr-2 pl-2 font-head bg-accent border-none
                border-bottom-solid border-bottom-primary border-bottom-2
                c-pointer" type="submit">Create</button>
            </form>
        </section> 
        <section id="newsSection" class="col-6 col-xxl-12 flex flex-col jc-center ai-center">
            @if(isset($news))
                @foreach($news as $item)
                    <div id="{{ $item['id'] }}" 
                    class="news m-1 p-2 pr-5 pl-5 bg-primary br-1 c-pointer color font-head
                    f-m">
                        {{ $item['created_at'] }}__{{ $item['title'] }}
                    </div>
                @endforeach
            @endif 
        </section>
    </main>
    <style>
        form input, form textarea, form button {
            max-width : 15rem;
        }
        .news {
            max-width : 50%;
        }

        #newsSection {
            overflow-y: auto; 
        }
    </style>
@endsection