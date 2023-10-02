@extends('layout')

@section('content')
    <main class="bg row jc-center ai-center width-100 height-100">
        <section class="col-6 col-xxl-12">
            <h1 class="color font-head f-h1 m-1 text-center">Admin Panel</h1>
            <form class="m-1 mt-2 flex jc-center" method="POST" action="/adminLogout">
                @csrf
                <button type="submit">Logout</button>
            </form> 
            <form class="flex flex-col jc-center ai-center" action="">
                @csrf
                <input class="mt-2" type="text" name="title" placeholder="Title" />
                <textarea class="mt-2" placeholder="content" name="content"></textarea>
                <button class="mt-2" type="submit">Create</button>
            </form>
        </section> 
        <section class="col-6 col-xxl-12 flex flex-col jc-center ai-center">
            @if(isset($news))
                @foreach($news as $item)
                    <div id="{{ $item['id'] }}" 
                    class="news p-2 pr-5 pl-5 bg-primary br-1 c-pointer color font-head
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
    </style>
@endsection