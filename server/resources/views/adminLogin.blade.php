@extends('layout')

@section('content')
  <main>
    <form method="POST" action="/attemptAdminLogin">
      @csrf
      <input type="password" name="password" />
      <button type="submit">Log In</button>
    </form>
  </main>
@endsection