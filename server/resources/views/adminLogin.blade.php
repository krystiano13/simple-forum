@extends('layout')

@section('content')
  <main class="width-100 height-100 bg flex jc-center ai-center">
    <form class="border-top-solid border-top-3 border-top-accent
      bg-primary flex flex-col ai-center jc-center p-3 pt-12 pb-12" 
      method="POST" action="/attemptAdminLogin">
      @csrf
      <input class="m-1 p-1 font-other outline-none
      bg-secondary border-none color border-bottom-solid
      border-bottom-accent border-bottom-2 f-s" 
      type="password" name="password" 
      placeholder="password" />
      <button class="m-1 mt-3 p-1 pl-4 pr-4 c-pointer font-head
      bg-accent border-none color-text border-bottom-3
      border-bottom-solid border-bottom-secondary
      f-600 f-s" 
      type="submit">Log In</button>
      @if($errors -> any())
        @foreach ($errors as $error)
         <p>{{ $error }}</p>
        @endforeach
      @endif
    </form>
  </main>
@endsection