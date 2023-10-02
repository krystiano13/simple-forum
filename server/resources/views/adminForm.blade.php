@extends('layout')

@section('content')
    <h1>Admin Panel</h1>
    <form method="POST" action="/adminLogout">
        @csrf
        <button type="submit">Logout</button>
    </form>
@endsection