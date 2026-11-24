<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Excel Data Hub') }}</title>
    @vite(['resources/js/app.js', 'resources/css/app.css'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
